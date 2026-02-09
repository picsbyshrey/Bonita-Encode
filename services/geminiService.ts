import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ChatMessage, Sender, WellnessPlan, CoachResponse, UserCheckIn } from "../types";
import { KNOWLEDGE_BASE } from "../data/knowledgeBase";
import { detectSafetyFlags } from "../data/safety";
import { inferPillars } from "../data/router";
import { logEvent } from "./telemetry";

// Initialize Gemini Client
const apiKey = (typeof process !== 'undefined' && process.env && process.env.API_KEY) || ''; 
const ai = new GoogleGenAI({ apiKey });

// --- SCHEMAS ---

const CHAT_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    primaryPillar: { type: Type.STRING, enum: ["TIME", "SPACE", "SELF"] },
    secondaryPillars: { type: Type.ARRAY, items: { type: Type.STRING, enum: ["TIME", "SPACE", "SELF"] } },
    clarifyingQuestions: { type: Type.ARRAY, items: { type: Type.STRING } },
    todayProtocol: {
      type: Type.OBJECT,
      properties: {
        title: { type: Type.STRING },
        timeCostMin: { type: Type.NUMBER },
        steps: { 
          type: Type.ARRAY, 
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING },
              durationMin: { type: Type.NUMBER }
            },
            required: ["text"]
          } 
        },
        signalsToWatch: { type: Type.ARRAY, items: { type: Type.STRING } },
        stopSignals: { type: Type.ARRAY, items: { type: Type.STRING } }
      },
      required: ["title", "timeCostMin", "steps", "signalsToWatch", "stopSignals"]
    },
    whyItWorks: { type: Type.ARRAY, items: { type: Type.STRING } },
    tomorrowCheckIn: { type: Type.ARRAY, items: { type: Type.STRING } },
    evidenceTier: { type: Type.STRING, enum: ["A", "B", "C"] },
    includeDisclaimer: { type: Type.BOOLEAN },
    safetyNotes: { type: Type.ARRAY, items: { type: Type.STRING } },
    messageText: { type: Type.STRING }
  },
  required: ["primaryPillar", "todayProtocol", "whyItWorks", "tomorrowCheckIn", "evidenceTier", "includeDisclaimer", "messageText"]
};

const PLAN_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING, description: "A encouraging 2-sentence summary of the user's current state." },
    scores: {
      type: Type.OBJECT,
      properties: {
        iq: { type: Type.INTEGER, description: "Estimated Intellectual/Cognitive wellness score (0-100)" },
        eq: { type: Type.INTEGER, description: "Estimated Emotional wellness score (0-100)" },
        kq: { type: Type.INTEGER, description: "Estimated Kinesthetic/Physical wellness score (0-100)" }
      },
      required: ["iq", "eq", "kq"]
    },
    pillars: {
      type: Type.OBJECT,
      properties: {
        time: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING, enum: ["time"] },
              timeEstimate: { type: Type.STRING }
            },
            required: ["id", "title", "description", "type"]
          }
        },
        space: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING, enum: ["space"] },
              timeEstimate: { type: Type.STRING }
            },
            required: ["id", "title", "description", "type"]
          }
        },
        self: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING, enum: ["self"] },
              timeEstimate: { type: Type.STRING }
            },
            required: ["id", "title", "description", "type"]
          }
        }
      },
      required: ["time", "space", "self"]
    }
  },
  required: ["summary", "scores", "pillars"]
};

// --- SYSTEM INSTRUCTIONS ---

const BASE_KNOWLEDGE = `
[BEHAVIOR & TRAITS]
${KNOWLEDGE_BASE.personaTraits}

[COMMUNICATION SKILLS & FRAMEWORK]
${KNOWLEDGE_BASE.skills}

[PROTOCOLS & SCIENCE]
${KNOWLEDGE_BASE.protocols}
`;

const CHAT_SYSTEM_INSTRUCTION = `
You are the Bonita Baddies Wellness Intelligence System.
Your goal is to output STRICT JSON that acts as a structured coaching response.

${BASE_KNOWLEDGE}

RULES FOR JSON OUTPUT:
1. **evidenceTier**: 
   - 'A': Meta-analyses, RCTs, strong clinical consensus (e.g., Sleep Hygiene, Zone 2 Cardio).
   - 'B': Mechanistic data, observational studies (e.g., Fascia, specific breathwork).
   - 'C': Traditional wisdom (TCM, Ayurveda) or anecdotal evidence.
   - If using Tier C, explicitely mention it is a traditional lens, not clinical fact in 'whyItWorks'.

2. **todayProtocol**:
   - Provide exactly ONE immediate, actionable protocol for today.
   - Must be doable within user constraints if known.

3. **clarifyingQuestions**:
   - Maximum 2 questions. 
   - If user provided enough context, leave empty array.

4. **includeDisclaimer**:
   - Set to TRUE only if this is the very first interaction or if medical topics are discussed. 
   - Set to FALSE if user has already acknowledged it in session.

5. **messageText**:
   - A warm, conversational summary of the advice. 
   - Do NOT repeat the protocol steps here (the UI renders them).
   - Use the "Bonita" persona: grounded optimism, scientific humility.

6. **Safety**:
   - If Red Flags are present (suicide, chest pain, stroke), set 'safetyNotes' array with warnings and point to professional care. 
   - Do NOT provide a wellness protocol for medical emergencies.
`;

const PLAN_SYSTEM_INSTRUCTION = `
You are the Bonita Baddies Wellness Intelligence System.
Generate a comprehensive 7-day wellness plan in JSON format.

${BASE_KNOWLEDGE}
`;

// --- METHODS ---

export const chatWithBonita = async (
  history: ChatMessage[], 
  newMessage: string,
  checkInContext?: UserCheckIn,
  hasSeenDisclaimer: boolean = false
): Promise<CoachResponse> => {
  if (!apiKey) throw new Error("API Key missing");

  // 1. Telemetry & Routing
  const inferred = inferPillars(newMessage);
  logEvent('chat_request', { length: newMessage.length, inferred });

  // 2. Deterministic Safety Check
  const safetyCheck = detectSafetyFlags(newMessage);
  if (safetyCheck.shouldEscalate) {
    logEvent('safety_escalation', { flags: safetyCheck.flags });
    return {
      primaryPillar: "SELF", // Default to self/safety
      secondaryPillars: [],
      clarifyingQuestions: [],
      todayProtocol: {
        title: "Medical Safety First",
        timeCostMin: 0,
        steps: [{ text: "Please seek professional medical care immediately." }],
        signalsToWatch: [],
        stopSignals: []
      },
      whyItWorks: ["We prioritize your immediate physical safety above all else."],
      tomorrowCheckIn: [],
      evidenceTier: "A",
      includeDisclaimer: true,
      safetyNotes: safetyCheck.flags,
      messageText: safetyCheck.escalationMessage || "I detected a potential medical concern. Please see the safety notes."
    };
  }

  // 3. Construct Context
  const model = "gemini-3-flash-preview";
  
  const contents = history.map(m => ({
    role: m.sender === Sender.USER ? 'user' : 'model',
    parts: [{ text: m.text }] // sending text representation of history
  }));

  let contextString = newMessage;
  if (checkInContext) {
    contextString += `\n[USER CHECK-IN DATA: Sleep=${checkInContext.sleepHours}h, Energy=${checkInContext.energy}/5, Mood=${checkInContext.mood}/5, Pain=${checkInContext.pain}/10, Note="${checkInContext.note}"]`;
  }
  if (hasSeenDisclaimer) {
    contextString += `\n[SYSTEM: User has already seen the disclaimer. Set includeDisclaimer: false unless new medical context arises.]`;
  }

  contents.push({
    role: 'user',
    parts: [{ text: contextString }]
  });

  try {
    const response = await ai.models.generateContent({
      model,
      contents,
      config: {
        systemInstruction: CHAT_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: CHAT_SCHEMA,
        temperature: 0.7,
      }
    });

    const jsonText = response.text || "{}";
    const structuredResponse = JSON.parse(jsonText) as CoachResponse;
    
    logEvent('chat_success', { 
      pillar: structuredResponse.primaryPillar, 
      protocol: structuredResponse.todayProtocol.title 
    });

    return structuredResponse;

  } catch (error) {
    console.error("Gemini Chat Error:", error);
    logEvent('chat_error', { error: String(error) });
    
    // Fallback response if JSON fails
    return {
      primaryPillar: "SELF",
      secondaryPillars: [],
      clarifyingQuestions: ["Could you rephrase that?"],
      todayProtocol: {
        title: "System Reset",
        timeCostMin: 5,
        steps: [{ text: "Take 5 deep breaths while I recalibrate my circuits." }],
        signalsToWatch: ["Calmness"],
        stopSignals: ["Frustration"]
      },
      whyItWorks: ["Sometimes technology needs a moment, just like us."],
      tomorrowCheckIn: ["Try again?"],
      evidenceTier: "B",
      includeDisclaimer: false,
      messageText: "I'm having trouble organizing my thoughts into the protocol format. Please try again or rephrase your request."
    };
  }
};

export const generateWellnessPlan = async (chatHistory: ChatMessage[]): Promise<WellnessPlan> => {
  if (!apiKey) throw new Error("API Key missing");

  const model = "gemini-3-flash-preview";

  const conversationText = chatHistory
    .map(m => {
        const content = m.structuredData ? JSON.stringify(m.structuredData) : m.text;
        return `${m.sender.toUpperCase()}: ${content}`;
    })
    .join('\n');

  const prompt = `
    Based on the following conversation and the system's internal knowledge base, generate a personalized Wellness Protocol JSON.
    Analyze the user's IQ (Mind), EQ (Emotion), and KQ (Body) status.
    
    CONVERSATION LOG:
    ${conversationText}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: PLAN_SYSTEM_INSTRUCTION, // Use the Plan-specific instruction
        responseMimeType: "application/json",
        responseSchema: PLAN_SCHEMA
      }
    });

    const jsonText = response.text || "{}";
    return JSON.parse(jsonText) as WellnessPlan;

  } catch (error) {
    console.error("Plan Generation Error:", error);
    throw error;
  }
};