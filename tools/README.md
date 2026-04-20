# CET-SIM Internal Tools

## Question Verifier

Automated question bank verifier powered by Google Gemini API.

### Setup

```bash
pip install google-genai
```

Set your API key:
```bash
# Windows PowerShell
$env:GEMINI_API_KEY = "your-api-key-here"

# Linux/Mac
export GEMINI_API_KEY="your-api-key-here"
```

### Usage

```bash
# Verify a specific bank (from project root)
python tools/question_verifier.py src/data/science_bank.ts

# Custom output path
python tools/question_verifier.py src/data/math_bank.ts -o tools/math_review.json

# Adjust batch size (default: 8)
python tools/question_verifier.py src/data/language_bank.ts -b 5

# Dry run — parse and show batches without calling API
python tools/question_verifier.py src/data/science_bank.ts --dry-run
```

### What It Does

1. **Parses** TypeScript question bank files (`science_bank.ts`, `math_bank.ts`, etc.)
2. **Groups** questions that share context (same `groupId`)
3. **Batches** questions into API-friendly chunks (~8 questions per batch, respecting context boundaries)
4. **Sends** each batch to Gemini with:
   - Full question text, options, marked answer, explanation
   - Shared passages/poems (for Reading Comprehension)
   - Referenced figure images (for Science/Math diagrams)
   - App-specific syntax notes (LaTeX, error-identification, etc.)
5. **Verifies** using Gemini's thinking mode + Google Search grounding
6. **Flags** questions where the answer or explanation is incorrect
7. **Outputs** a JSON report with:
   - Summary statistics
   - Flagged question details
   - Corrected question objects (drop-in replacements)

### Output Format

```json
{
  "summary": {
    "total": 60,
    "correct": 57,
    "flagged": 3,
    "errors": 0
  },
  "flagged_questions": [
    {
      "id": "SC-605-11",
      "issue": "Mole fraction should be 0.333, not 33.3...",
      "original_answer": "C. 33.3",
      "corrected_answer": "C. 33.3",
      "original_explanation": "...",
      "corrected_explanation": "..."
    }
  ],
  "corrected_questions": [
    { /* full corrected question object */ }
  ]
}
```

### Configuration

| Flag | Default | Description |
|---|---|---|
| `--batch-size` / `-b` | `8` | Questions per API batch |
| `--output` / `-o` | `<bank>_flagged.json` | Output file path |
| `--dry-run` | off | Parse only, no API calls |

### Notes

- **Figures**: The verifier automatically loads images from `public/assets/figures/` and sends them inline to Gemini for visual questions.
- **Reading bank**: When processing `reading_bank.ts`, passages are automatically loaded and attached to their grouped questions.
- **Rate limiting**: 5-second cooldown between batches to respect API quotas.
- **Retries**: Each batch is retried up to 3 times on failure.
