import { useState } from 'react';
import { SRMetadata } from '../types/vocab';

const SR_KEY = 'vocab_sr_metrics';

const loadSRData = (): Record<string, SRMetadata> => {
    try {
        const data = localStorage.getItem(SR_KEY);
        return data ? JSON.parse(data) : {};
    } catch {
        return {};
    }
};

const saveSRData = (data: Record<string, SRMetadata>) => {
    localStorage.setItem(SR_KEY, JSON.stringify(data));
};

export const useVocabSR = () => {
  const [srTimestamp, setSrTimestamp] = useState(Date.now());

  const updateSR = (wordStr: string, known: boolean) => {
    const data = loadSRData();
    const current = data[wordStr] || {
        nextReview: 0,
        interval: 0,
        repetition: 0,
        easeFactor: 2.5
    };

    if (known) {
        // Known (SM-2 like logic)
        let { interval, repetition, easeFactor } = current;
        if (repetition === 0) interval = 1;
        else if (repetition === 1) interval = 6;
        else interval = Math.ceil(interval * easeFactor);
        
        repetition += 1;
        easeFactor = Math.max(1.3, easeFactor + 0.1);
        
        data[wordStr] = {
            nextReview: Date.now() + (interval * 24 * 60 * 60 * 1000),
            interval,
            repetition,
            easeFactor
        };
    } else {
        // Forgot / Show again
        data[wordStr] = {
            nextReview: Date.now(), // Due immediately in next session
            interval: 0,
            repetition: 0,
            easeFactor: Math.max(1.3, current.easeFactor - 0.2)
        };
    }
    saveSRData(data);
    setSrTimestamp(Date.now());
  };

  return { srTimestamp, updateSR, loadSRData };
};
