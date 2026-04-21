import { useState, useCallback, useRef, useEffect } from 'react';

export interface TelemetryEvent {
  timestamp: number;
  type: string;
  data?: any;
}

function isTelemetryEvent(value: unknown): value is TelemetryEvent {
  if (!value || typeof value !== 'object') return false;

  const event = value as Partial<TelemetryEvent>;
  return typeof event.timestamp === 'number' && Number.isFinite(event.timestamp) && typeof event.type === 'string';
}

function loadStoredTelemetry(): TelemetryEvent[] {
  try {
    const saved = localStorage.getItem('curve_telemetry');
    if (!saved) return [];

    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed.filter(isTelemetryEvent) : [];
  } catch {
    return [];
  }
}

export function useTelemetry() {
  const [events, setEvents] = useState<TelemetryEvent[]>(loadStoredTelemetry);

  const eventsRef = useRef(events);
  const skipNextPersistRef = useRef(false);

  useEffect(() => {
    if (skipNextPersistRef.current) {
      skipNextPersistRef.current = false;
      localStorage.removeItem('curve_telemetry');
      eventsRef.current = events;
      return;
    }

    localStorage.setItem('curve_telemetry', JSON.stringify(events));
    eventsRef.current = events;
  }, [events]);

  const logEvent = useCallback((type: string, data?: any) => {
    setEvents(prev => {
      const newEvents = [...prev, { timestamp: Date.now(), type, data }];
      eventsRef.current = newEvents;
      // Optional high-frequency manual save just in case
      localStorage.setItem('curve_telemetry', JSON.stringify(newEvents));
      return newEvents;
    });
  }, []);

  const clearTelemetry = useCallback((persist = true) => {
    if (!persist) skipNextPersistRef.current = true;
    setEvents([]);
    localStorage.removeItem('curve_telemetry');
  }, []);

  return {
    events,
    logEvent,
    clearTelemetry
  };
}
