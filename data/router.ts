// Heuristic router to help guide the context window
import { PillarType } from "../types";

const KEYWORDS = {
  time: ["sleep", "wake", "tired", "schedule", "morning", "night", "insomnia", "nap", "circadian", "clock", "late", "early", "routine"],
  space: ["pain", "hurt", "ache", "sore", "tight", "gym", "workout", "run", "walk", "knee", "back", "shoulder", "fascia", "skin", "diet", "food", "eat"],
  self: ["anxious", "sad", "mad", "angry", "focus", "distracted", "scattered", "brain", "mind", "mood", "stress", "feeling", "depressed", "lazy"]
};

export const inferPillars = (text: string): { primary: PillarType; secondary: PillarType[] } => {
  const scores = { time: 0, space: 0, self: 0 };
  const lowerText = text.toLowerCase();

  // Keyword counting
  (Object.keys(KEYWORDS) as PillarType[]).forEach(pillar => {
    KEYWORDS[pillar].forEach(word => {
      if (lowerText.includes(word)) scores[pillar]++;
    });
  });

  // Sort scores
  const sorted = (Object.keys(scores) as PillarType[]).sort((a, b) => scores[b] - scores[a]);
  
  // Logic: If top score is 0, default to SELF (usually most conversational)
  const primary = scores[sorted[0]] > 0 ? sorted[0] : "self";
  
  // Secondary are any others with > 0 score
  const secondary = sorted.slice(1).filter(p => scores[p] > 0);

  return { primary, secondary };
};