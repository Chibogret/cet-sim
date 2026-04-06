# Lesson Guideline

New lesson materials should follow the categorization in `topics.json`.

## Directory Structure
Lessons are stored in: `src/data/lessons/`.
File names should be in the format: `[topicId]-[slug].json`.
Example: `703-force-and-motion.json` (Science -> Physics -> Force and Motion).

## Data Schema
Each lesson file should follow this structure:
```json
{
  "id": "703-force-and-motion",
  "topicId": 703,
  "title": "Force and Motion",
  "subject": "Science",
  "category": "Physics",
  "content": "### Newton's Laws of Motion...",
  "highlights": ["Inertia", "F=ma", "Action-Reaction"],
  "quiz": [
    {
      "question": "Which law states that for every action, there is an equal and opposite reaction?",
      "options": ["First Law", "Second Law", "Third Law", "Law of Universal Gravitation"],
      "answer": "Third Law",
      "explanation": "Newton's Third Law states..."
    }
  ]
}
```

## Adding a New Lesson
1. **Find the Topic ID**: Look up the topic in `src/data/topics.json`.
2. **Create the JSON file**: Place it in `src/data/lessons/`.
3. **Write Clear Content**: Focus on "Cheatsheet" style content—quick summaries, formulas, and key concepts.
4. **Link to Category**: Ensure the `subject` and `category` match those in `topics.json` for proper selection and display.
