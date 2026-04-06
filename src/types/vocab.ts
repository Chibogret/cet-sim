export interface VocabWord {
  word: string;
  definition: string;
  synonyms: string[];
  root_or_helper?: string;
  sample_sentence?: string;
}

export interface SRMetadata {
  nextReview: number;
  interval: number;
  repetition: number;
  easeFactor: number;
}
