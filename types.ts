export type ViewState = 'welcome' | 'assessment' | 'dashboard' | 'resources' | 'pillar-detail' | 'how-to-use';

export type PillarType = 'time' | 'space' | 'self';

export enum Sender {
  USER = 'user',
  BOT = 'model'
}

export interface CoachResponse {
  primaryPillar: "TIME" | "SPACE" | "SELF";
  secondaryPillars: ("TIME" | "SPACE" | "SELF")[];
  clarifyingQuestions: string[]; // Max 2
  todayProtocol: {
    title: string;
    timeCostMin: number;
    steps: {
      text: string;
      durationMin?: number;
    }[];
    signalsToWatch: string[];
    stopSignals: string[];
  };
  whyItWorks: string[]; // 1-3 items
  tomorrowCheckIn: string[]; // 1-3 items
  evidenceTier: "A" | "B" | "C"; // A=Meta-analysis/RCT, B=Observational/Mech, C=Traditional/Anecdotal
  includeDisclaimer: boolean;
  safetyNotes?: string[];
  messageText?: string; // Conversational wrapper
}

export interface ChatMessage {
  id: string;
  sender: Sender;
  text: string;
  timestamp: Date;
  structuredData?: CoachResponse;
}

export interface PillarScore {
  name: string;
  score: number; // 0-100
  fullMark: number;
}

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'time' | 'space' | 'self';
  timeEstimate?: string;
}

export interface WellnessPlan {
  summary: string;
  scores: {
    iq: number;
    eq: number;
    kq: number;
  };
  pillars: {
    time: Recommendation[];
    space: Recommendation[];
    self: Recommendation[];
  };
}

export interface UserCheckIn {
  sleepHours: number;
  energy: number; // 1-5
  mood: number; // 1-5
  pain: number; // 0-10
  note: string;
  timestamp: number;
}