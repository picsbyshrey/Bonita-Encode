// Simple local telemetry for observability
// In a production app, this would pipe to Opik or similar

const STORAGE_KEY = 'bonita_telemetry_logs';

export interface TelemetryEvent {
  id: string;
  type: string;
  payload: any;
  timestamp: number;
}

export const logEvent = (type: string, payload: any) => {
  try {
    const event: TelemetryEvent = {
      id: crypto.randomUUID(),
      type,
      payload,
      timestamp: Date.now()
    };

    const existing = localStorage.getItem(STORAGE_KEY);
    const logs = existing ? JSON.parse(existing) : [];
    logs.push(event);
    
    // Keep only last 100 logs to prevent storage overflow
    if (logs.length > 100) logs.shift();
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Telemetry] ${type}`, payload);
    }
  } catch (e) {
    console.warn("Telemetry logging failed", e);
  }
};

export const getLogs = (): TelemetryEvent[] => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  } catch {
    return [];
  }
};