import { useState, useCallback, useRef, useEffect } from 'react';

export interface TelemetryEvent {
  timestamp: number;
  type: string;
  data?: any;
}

export function useTelemetry() {
  const [events, setEvents] = useState<TelemetryEvent[]>(() => {
    try {
      const saved = localStorage.getItem('curve_telemetry');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

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
