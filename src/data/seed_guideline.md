# Daily Selection Seed Guideline

To ensure all students across the platform see the same "Daily Focus" material, we use a deterministic seeding mechanism.

## How it works
1. **Seed Generation**: A seed is generated from the current date in `YYYYMMDD` format (e.g., April 6, 2026 becomes `20260406`).
2. **Deterministic Randomness**: This seed is passed into a Pseudo-Random Number Generator (PRNG).
3. **Multi-Subject Selection**: 
   - 1 topic is picked for each core subject: **Mathematics**, **Science**, **Reading Comprehension**, and **Language Proficiency**.
   - A selection of **Vocabulary** words is picked.

## Adding Content
When you add a new lesson file, it should be named after its `topicId` and a slug (e.g., `703-force-and-motion.json`). The system will automatically include it in the potential "Daily" pool if it exists in the `src/data/lessons/` directory.

## Importance of Consistency
By using a date-based seed, we can:
- Discuss the same topics in study groups.
- Sync daily progress across different devices without a backend.
- Create a shared "Exam Prep" atmosphere for everyone.
