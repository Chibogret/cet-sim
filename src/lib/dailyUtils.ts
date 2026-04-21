import { Topic, TopicsData, SubjectCategory } from '../types/lesson';
import { SRMetadata, VocabWord } from '../types/vocab';

/**
 * Generates a consistent seed for a given date (YYYY-MM-DD format or Date object).
 */
export function getDailySeed(date: Date = new Date()): number {
  return date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
}

/**
 * Deterministic PRNG based on a seed.
 */
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

/**
 * Selects one random topic for each core subject area.
 * If availableTopicIds is provided, it will prioritize selecting one of those.
 */
export function selectDailyTopics(seed: number, topicsData: TopicsData, availableTopicIds?: number[]) {
  const subjects = ['Mathematics', 'Science', 'Reading Comprehension', 'Language Proficiency'];
  const selection: { subject: string; topic: Topic }[] = [];

  subjects.forEach((subjectName, index) => {
    // Filter categories that belong to this subject
    const subjectCategories = topicsData.upcat_coverage.filter(c => c.subject === subjectName);
    
    if (subjectCategories.length === 0) return;

    // First, try to pick a deterministic topic from ALL topics
    const catIndex = Math.floor(seededRandom(seed + index) * subjectCategories.length);
    const category = subjectCategories[catIndex];
    
    let chosenTopic: Topic | null = null;

    if (category.topics && category.topics.length > 0) {
      const topicIndex = Math.floor(seededRandom(seed + index + 100) * category.topics.length);
      chosenTopic = category.topics[topicIndex];
    }

    // If we have a registry of available lessons, and our choice isn't in it,
    // try to find ANY topic in this subject that IS in the registry.
    if (availableTopicIds && availableTopicIds.length > 0) {
      const isAvailable = chosenTopic && availableTopicIds.includes(chosenTopic.id);
      
      if (!isAvailable) {
        // Find all topics in this subject that ARE available
        const allAvailableInSubject: Topic[] = [];
        subjectCategories.forEach(c => {
          c.topics.forEach(t => {
            if (availableTopicIds.includes(t.id)) {
              allAvailableInSubject.push(t);
            }
          });
        });

        if (allAvailableInSubject.length > 0) {
          // Pick one deterministically from the available ones
          const fallbackIndex = Math.floor(seededRandom(seed + index + 500) * allAvailableInSubject.length);
          chosenTopic = allAvailableInSubject[fallbackIndex];
        }
      }
    }

    if (chosenTopic) {
      selection.push({
        subject: subjectName,
        topic: chosenTopic
      });
    }
  });

  return selection;
}

/**
 * Helper to get X daily vocab words using a seed.
 */
export function selectDailyVocab(
  seed: number,
  vocabList: VocabWord[],
  count: number = 8,
  srData: Record<string, SRMetadata> = {},
  now: number = Date.now()
) {
  const dueWords = vocabList
    .filter(word => {
      const metadata = srData[word.word];
      return metadata && metadata.nextReview <= now;
    })
    .sort((a, b) => {
      const aDue = srData[a.word]?.nextReview ?? 0;
      const bDue = srData[b.word]?.nextReview ?? 0;
      if (aDue !== bDue) return aDue - bDue;
      return a.word.localeCompare(b.word);
    });

  const dueSet = new Set(dueWords.map(word => word.word));
  const shuffled = vocabList.filter(word => !dueSet.has(word.word));
  let m = shuffled.length;
  let currSeed = seed;
  
  while (m > 0) {
    const i = Math.floor(seededRandom(currSeed++) * m--);
    [shuffled[m], shuffled[i]] = [shuffled[i], shuffled[m]];
  }
  
  return [...dueWords, ...shuffled].slice(0, count);
}
