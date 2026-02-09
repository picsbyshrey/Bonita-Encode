// Deterministic safety heuristics to run BEFORE the LLM
export const RED_FLAGS = [
  { pattern: /chest pain/i, message: "Chest pain requires immediate medical attention." },
  { pattern: /shortness of breath/i, message: "Severe shortness of breath is a medical emergency." },
  { pattern: /suicid|kill myself|end my life/i, message: "If you are in crisis, please call 988 or go to the nearest ER immediately." },
  { pattern: /faint|pass out|black out/i, message: "Loss of consciousness requires medical evaluation." },
  { pattern: /slurred speech|drooping face/i, message: "Stroke-like symptoms require immediate 911 assistance." },
  { pattern: /worst headache of my life/i, message: "Sudden, severe headaches ('thunderclap') require immediate ER evaluation." }
];

export interface SafetyCheckResult {
  flags: string[];
  shouldEscalate: boolean;
  escalationMessage?: string;
}

export const detectSafetyFlags = (text: string): SafetyCheckResult => {
  const flags: string[] = [];
  let escalationMessage = "";

  for (const flag of RED_FLAGS) {
    if (flag.pattern.test(text)) {
      flags.push(flag.message);
      if (!escalationMessage) escalationMessage = flag.message; // Keep the first/most critical
    }
  }

  return {
    flags,
    shouldEscalate: flags.length > 0,
    escalationMessage
  };
};