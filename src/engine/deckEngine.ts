import { useState, useCallback, useEffect } from 'react';

export type Tactic = 'Process of Elimination' | 'Time Borrow' | 'Skip Bank' | 'Second Guess' | 'Pattern Insight';

const ALL_TACTICS: Tactic[] = ['Process of Elimination', 'Time Borrow', 'Skip Bank', 'Second Guess', 'Pattern Insight'];

export function useDeckEngine() {
  const [tactics, setTactics] = useState<Tactic[]>(() => {
    const saved = localStorage.getItem('curve_tactics');
    return saved ? JSON.parse(saved) : ['Process of Elimination', 'Time Borrow'];
  });
  
  const [eliminatedOptions, setEliminatedOptions] = useState<Record<string, string[]>>(() => {
    const saved = localStorage.getItem('curve_eliminated');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem('curve_tactics', JSON.stringify(tactics));
  }, [tactics]);

  useEffect(() => {
    localStorage.setItem('curve_eliminated', JSON.stringify(eliminatedOptions));
  }, [eliminatedOptions]);

  const drawTactic = useCallback(() => {
    const randomTactic = ALL_TACTICS[Math.floor(Math.random() * ALL_TACTICS.length)];
    setTactics(prev => {
      // Limit hand size to 5
      if (prev.length >= 5) return prev;
      return [...prev, randomTactic];
    });
  }, []);

  const useTactic = useCallback((tactic: Tactic, payload?: any) => {
    // Remove only one instance of the tactic
    setTactics(prev => {
      const index = prev.indexOf(tactic);
      if (index > -1) {
        const newTactics = [...prev];
        newTactics.splice(index, 1);
        return newTactics;
      }
      return prev;
    });
    
    // Handle tactic effects natively where possible
    if (tactic === 'Process of Elimination' && payload?.questionId && payload?.incorrectOptions) {
      setEliminatedOptions(prev => ({
        ...prev,
        [payload.questionId]: payload.incorrectOptions
      }));
    }
  }, []);

  const resetDeck = useCallback(() => {
    setTactics(['Process of Elimination', 'Time Borrow']);
    setEliminatedOptions({});
  }, []);

  return {
    tactics,
    useTactic,
    drawTactic,
    eliminatedOptions,
    resetDeck
  };
}
