"""
CET-SIM Automated Question Verifier
====================================
Internal tool for validating question banks using Google Gemini API.
Parses TypeScript question bank files, batches questions with full context
(passages, figures, instructions), and flags incorrect answers/explanations.

Usage:
    python question_verifier.py <bank_file.ts> [--output flagged.json] [--batch-size 8]

Requirements:
    pip install google-genai
    Set GEMINI_API_KEY environment variable.
"""

import os
import re
import sys
import json
import time
import argparse
import base64
import mimetypes
from pathlib import Path
from typing import Optional

from google import genai
from google.genai import types


# ---------------------------------------------------------------------------
# Configuration
# ---------------------------------------------------------------------------
PRIMARY_MODEL = "gemini-flash-latest"
BACKUP_MODEL = "gemma-4-31b-it"
CURRENT_MODEL = PRIMARY_MODEL
MAX_BATCH_SIZE = 8          # Conservative default for rich context
RETRY_LIMIT = 3
RETRY_BACKOFF = 5           # seconds

# Resolve paths relative to the project root
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent
DATA_DIR = PROJECT_ROOT / "src" / "data"
ASSETS_DIR = PROJECT_ROOT / "public" / "assets" / "figures"


# ---------------------------------------------------------------------------
# TypeScript Parser
# ---------------------------------------------------------------------------

def strip_ts_imports(raw: str) -> str:
    """Remove import statements and export declarations."""
    raw = re.sub(r"import\s+.*?;\s*", "", raw)
    raw = re.sub(r"export\s+const\s+\w+\s*:\s*\w+(\[\])?\s*=\s*", "", raw)
    return raw


def ts_to_json_array(raw: str) -> list[dict]:
    """
    Convert a TypeScript array-of-objects literal into a Python list of dicts.
    Handles:
      - single-quoted strings  -> double-quoted
      - trailing commas
      - template literal newlines (\\n in strings)
      - unquoted keys
    """
    raw = strip_ts_imports(raw)

    # Find the outermost array brackets for the VALUE (after the equals sign if present)
    eq_pos = raw.find("=")
    if eq_pos != -1:
        start = raw.find("[", eq_pos)
    else:
        start = raw.find("[")
        
    end = raw.rfind("]")
    if start == -1 or end == -1 or start >= end:
        raise ValueError("Could not locate valid array boundaries in the TS chunk.")
    body = raw[start:end + 1]

    # ---- normalise into valid JSON ----

    # 1. Replace single-quoted strings with double-quoted (careful with apostrophes inside)
    # We'll use a state-machine approach for reliability
    body = _replace_single_quotes(body)

    # 2. Quote unquoted object keys: e.g.  id:  ->  "id":
    body = re.sub(r'(?<=[{,\n])\s*(\w+)\s*:', r' "\1":', body)

    # 3. Remove trailing commas before } or ]
    body = re.sub(r",\s*([}\]])", r"\1", body)

    # 4. Handle JS template-literal escaped newlines that remain as literal \\n
    # (already in strings, keep them)

    try:
        return json.loads(body)
    except json.JSONDecodeError as e:
        # Dump a debug snippet around the error position
        pos = e.pos or 0
        snippet = body[max(0, pos - 200):pos + 200]
        raise ValueError(
            f"JSON parse failed at char {pos}.\n"
            f"Context:\n...{snippet}..."
        ) from e


def _replace_single_quotes(text: str) -> str:
    """
    Swap JS single/double-quoted strings to double-quoted JSON strings.
    Ensures backslashes are properly escaped for JSON compliance.
    """
    result = []
    i = 0
    n = len(text)
    while i < n:
        ch = text[i]
        if ch in ["'", '"']:
            quote_char = ch
            result.append('"') # Output will always be double-quoted
            i += 1
            while i < n:
                curr = text[i]
                if curr == '\\' and i + 1 < n:
                    nxt = text[i+1]
                    if quote_char == "'" and nxt == "'":
                        # Escaped single quote in single-quoted string -> just '
                        result.append("'")
                        i += 2
                    elif quote_char == '"' and nxt == '"':
                        # Escaped double quote in double-quoted string -> \"
                        result.append('\\"')
                        i += 2
                    elif nxt in ['"', '\\', '/', 'b', 'f', 'n', 'r', 't']:
                        # Valid JSON escape sequence -> preserve it
                        result.append('\\')
                        result.append(nxt)
                        i += 2
                    elif nxt == 'u':
                        # Unicode escape start -> preserve it
                        result.append('\\')
                        result.append('u')
                        i += 2
                    else:
                        # Invalid JSON escape (e.g., \{ or \space)
                        # Escape the backslash so it becomes a literal backslash in JSON
                        result.append('\\\\')
                        result.append(nxt)
                        i += 2
                elif curr == '"' and quote_char == "'":
                    # Unescaped double quote in single-quoted string -> escape for JSON
                    result.append('\\"')
                    i += 1
                elif curr == quote_char:
                    # End of string
                    result.append('"')
                    i += 1
                    break
                elif curr == '\n':
                    # Literal newline in JS string -> \n escape for JSON
                    result.append('\\n')
                    i += 1
                elif curr == '\r':
                    result.append('\\r')
                    i += 1
                elif curr == '\t':
                    result.append('\\t')
                    i += 1
                else:
                    result.append(curr)
                    i += 1
        else:
            result.append(ch)
            i += 1
    return "".join(result)


def load_question_bank(filepath: Path) -> list[dict]:
    """Load and parse a TypeScript question bank file."""
    raw = filepath.read_text(encoding="utf-8")
    
    # Split by 'export const' to separate multiple arrays (common in reading_bank.ts)
    chunks = re.split(r"export\s+const\s+", raw)
    for chunk in chunks:
        # We want the chunk that defines the Questions array
        # Pattern: look for a variable name ending in 'Questions' followed by ':' or '='
        if re.search(r"\w+Questions\s*[:=]", chunk):
            return ts_to_json_array(chunk)
            
    # Fallback if no specific Questions array named
    return ts_to_json_array(raw)


def load_reading_passages(filepath: Path) -> list[dict]:
    """
    Load passages from reading_bank.ts.
    The file exports two arrays; we only want readingPassages.
    """
    raw = filepath.read_text(encoding="utf-8")

    # Split by 'export const' to separate passages from questions
    chunks = re.split(r"export\s+const\s+", raw)
    for chunk in chunks:
        if re.search(r"\w+Passages\s*[:=]", chunk):
            return ts_to_json_array(chunk)
            
    return []


def load_topics_map() -> set[str]:
    """Load all valid subtopics from topics.json."""
    path = DATA_DIR / "topics.json"
    if not path.exists():
        print(f"  ⚠ topics.json not found at {path}")
        return set()
    
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
        subtopics = set()
        for coverage in data.get("upcat_coverage", []):
            for topic in coverage.get("topics", []):
                # Add the topic itself if it has no subtopics
                if "subtopics" not in topic:
                    subtopics.add(topic["name"])
                else:
                    for sub in topic.get("subtopics", []):
                        subtopics.add(sub)
        return subtopics
    except Exception as e:
        print(f"  ⚠ Failed to load topics.json: {e}")
        return set()


# ---------------------------------------------------------------------------
# Context Assembly
# ---------------------------------------------------------------------------

def hydrate_questions(questions: list[dict], passages: list[dict]) -> list[dict]:
    """Attach passage data to questions that reference a groupId."""
    passage_map = {p["groupId"]: p for p in passages}
    for q in questions:
        gid = q.get("groupId")
        if gid and gid in passage_map:
            p = passage_map[gid]
            q.setdefault("contextTitle", p.get("contextTitle"))
            q.setdefault("passage", p.get("passage"))
    return questions


def group_questions(questions: list[dict]) -> list[list[dict]]:
    """
    Group questions by groupId (keeping order).
    Standalone questions become single-item groups.
    """
    groups: list[list[dict]] = []
    seen_groups: dict[str, int] = {}
    for q in questions:
        gid = q.get("groupId")
        if gid:
            if gid in seen_groups:
                groups[seen_groups[gid]].append(q)
            else:
                seen_groups[gid] = len(groups)
                groups.append([q])
        else:
            groups.append([q])
    return groups


def estimate_token_count(text: str) -> int:
    """Rough token estimate (~4 chars per token for English/mixed)."""
    return len(text) // 4


# ---------------------------------------------------------------------------
# Batch Assembly
# ---------------------------------------------------------------------------

def build_batches(
    groups: list[list[dict]],
    max_batch_size: int,
    max_tokens_per_batch: int = 24_000,
) -> list[list[dict]]:
    """
    Build batches of questions, respecting:
      - max_batch_size questions per batch
      - grouped questions are never split across batches
      - estimated token budget per batch
    """
    batches: list[list[dict]] = []
    current_batch: list[dict] = []
    current_tokens = 0

    for group in groups:
        group_text = json.dumps(group, ensure_ascii=False)
        group_tokens = estimate_token_count(group_text)

        would_exceed_size = len(current_batch) + len(group) > max_batch_size
        would_exceed_tokens = current_tokens + group_tokens > max_tokens_per_batch

        if current_batch and (would_exceed_size or would_exceed_tokens):
            batches.append(current_batch)
            current_batch = []
            current_tokens = 0

        current_batch.extend(group)
        current_tokens += group_tokens

    if current_batch:
        batches.append(current_batch)

    return batches


# ---------------------------------------------------------------------------
# Figure Handling
# ---------------------------------------------------------------------------

def load_figure_as_part(figure_path: str) -> Optional[types.Part]:
    """
    Load a figure image and return it as a Gemini Part.
    Looks in public/assets/figures/ relative to project root.
    """
    if not figure_path:
        return None

    # Normalise path
    rel = figure_path.lstrip("/")
    abs_path = PROJECT_ROOT / "public" / rel

    if not abs_path.exists():
        print(f"  ⚠ Figure not found: {abs_path}")
        return None

    mime_type, _ = mimetypes.guess_type(str(abs_path))
    mime_type = mime_type or "image/png"

    data = abs_path.read_bytes()
    return types.Part.from_bytes(data=data, mime_type=mime_type)


# ---------------------------------------------------------------------------
# Prompt Construction
# ---------------------------------------------------------------------------

SYSTEM_PROMPT = """\
You are an expert academic question verifier for a College Entrance Test (CET) simulator.

Your job is to rigorously verify multiple-choice questions across Science, Mathematics, Language Proficiency, and Reading Comprehension.

For each question you receive, you MUST:
1. Carefully read the question text, all options, the marked correct answer, and the provided explanation.
2. Use Google Search when needed to verify factual claims, definitions, dates, scientific data, or any claim you are uncertain about.
3. Independently solve mathematical and scientific problems to verify the correct answer.
4. For Reading Comprehension questions, carefully analyze the provided passage/poem and verify the answer against the text.
5. For Language/Grammar questions, apply standard grammar rules.
6. Check that the explanation is accurate and does not contain errors.

IMPORTANT SYNTAX NOTES — these are rendering instructions, NOT errors:
- `$ ... $` and `$$ ... $$` are LaTeX math delimiters (for KaTeX rendering).
- `{word}[label]` syntax is for error-identification questions where text is underlined with a label below. This is NOT a formatting error.
- `<u>text</u>` is used for underlining text in the app. This is NOT an error.
- Double backslashes `\\\\` in LaTeX are escape sequences for the TypeScript string. Treat them as single backslashes in the math.

RESPONSE FORMAT:
Return ONLY a valid JSON array. Each element must be an object with these fields:
- "id": the question ID (string)
- "status": "CORRECT" or "FLAGGED" (string)
- "issue": description of what is wrong (string, empty if CORRECT)
- "corrected_answer": the correct answer if different (string, null if CORRECT)
- "corrected_explanation": a corrected explanation if the original is wrong (string, null if CORRECT)

Example:
```json
[
  {"id": "SC-602-1", "status": "CORRECT", "issue": "", "corrected_answer": null, "corrected_explanation": null},
  {"id": "MA-801-1", "status": "FLAGGED", "issue": "The correct answer should be 21 not 25. Calculation: 5*5-5+5/5 = 25-5+1 = 21", "corrected_answer": "21", "corrected_explanation": "Following PEMDAS..."}
]
```

Be thorough. If you are uncertain, use Google Search to verify. Flag anything suspicious.
Do NOT add markdown formatting around the JSON. Return the raw JSON array only.
"""


def build_prompt_parts(batch: list[dict]) -> list[types.Part]:
    """
    Build the content parts for a batch of questions.
    Includes text + any referenced figures as inline images.
    """
    parts: list[types.Part] = []

    # Determine unique instructions needed
    has_error_id = any(q.get("variant") == "error-identification" for q in batch)
    has_antonym_eng = any(q.get("groupId") == "lp-antonym-eng" for q in batch)
    has_antonym_fil = any(q.get("groupId") == "lp-antonym-fil" for q in batch)

    instruction_block = "BATCH INSTRUCTIONS:\n"
    if has_error_id:
        instruction_block += (
            "- Some questions use {word}[label] syntax for error-identification. "
            "The student must find which labeled part contains the grammatical error.\n"
        )
    if has_antonym_eng:
        instruction_block += (
            "- Questions in group 'lp-antonym-eng' ask for the OPPOSITE (antonym) "
            "of the italicized/underlined word, not a synonym.\n"
        )
    if has_antonym_fil:
        instruction_block += (
            "- Questions in group 'lp-antonym-fil' ask for the KASALUNGAT (antonym) "
            "of the italicized/underlined Filipino word.\n"
        )

    # Build per-question blocks
    question_blocks: list[str] = []
    seen_passages: set[str] = set()

    for q in batch:
        block = ""

        # Shared passage (only include once per group)
        gid = q.get("groupId", "")
        passage = q.get("passage")
        if passage and gid not in seen_passages:
            seen_passages.add(gid)
            ctx_title = q.get("contextTitle", "Context")
            block += f"\n--- SHARED CONTEXT: {ctx_title} (groupId: {gid}) ---\n"
            block += passage + "\n"
            block += "--- END CONTEXT ---\n"

        block += f"\n[Question ID: {q['id']}]\n"
        block += f"Subject: {q['subject']}\n"
        block += f"Subtopic: {q['subtopic']}\n"
        if q.get("variant"):
            block += f"Variant: {q['variant']}\n"
        if q.get("groupId"):
            block += f"GroupID: {q['groupId']}\n"

        block += f"Question: {q['question']}\n"
        block += "Options:\n"
        for i, opt in enumerate(q["options"]):
            block += f"  {opt}\n"
        block += f"Marked Correct Answer: {q['correctAnswer']}\n"
        block += f"Explanation: {q['explanation']}\n"

        question_blocks.append(block)

        # Attach figure if present
        fig = q.get("figure")
        if fig:
            fig_part = load_figure_as_part(fig)
            if fig_part:
                parts.append(types.Part.from_text(
                    text=f"\n[Figure for {q['id']}]: (see attached image)\n"
                ))
                parts.append(fig_part)

    # Assemble final text
    full_text = instruction_block + "\n" + "\n".join(question_blocks)
    full_text += (
        "\n\nPlease verify ALL of the above questions. "
        "Return a JSON array with one result object per question.\n"
    )

    # Prepend text part
    parts.insert(0, types.Part.from_text(text=full_text))
    return parts


# ---------------------------------------------------------------------------
# Gemini API Interaction
# ---------------------------------------------------------------------------

def verify_batch(
    client: genai.Client,
    batch: list[dict],
    batch_index: int,
    total_batches: int,
    is_retry_pass: bool = False,
) -> Optional[list[dict]]:
    """Send a batch to Gemini and parse the verification results."""
    global CURRENT_MODEL
    parts = build_prompt_parts(batch)

    contents = [
        types.Content(role="user", parts=parts),
    ]

    config = types.GenerateContentConfig(
        system_instruction=SYSTEM_PROMPT,
        thinking_config=types.ThinkingConfig(thinking_level="HIGH"),
        temperature=0.1,
    )

    ids_in_batch = [q["id"] for q in batch]
    print(f"\n{'='*60}")
    print(f"  Batch {batch_index + 1}/{total_batches}  ({len(batch)} questions)  [{CURRENT_MODEL}]")
    print(f"  IDs: {', '.join(ids_in_batch)}")
    print(f"{'='*60}")

    for attempt in range(RETRY_LIMIT):
        try:
            response_text = ""
            for chunk in client.models.generate_content_stream(
                model=CURRENT_MODEL,
                contents=contents,
                config=config,
            ):
                if chunk.text:
                    response_text += chunk.text

            # Parse JSON from response
            results = _extract_json_array(response_text)
            if results is not None:
                print(f"  ✓ Received {len(results)} results")
                return results
            else:
                print(f"  ✗ Could not parse JSON from response (attempt {attempt + 1})")
                if attempt < RETRY_LIMIT - 1:
                    time.sleep(RETRY_BACKOFF)

        except Exception as e:
            error_str = str(e).lower()
            # Case 1: Quota/Limit Reached -> Switch to backup if using primary
            if ("429" in error_str or "resource_exhausted" in error_str or "quota" in error_str):
                if CURRENT_MODEL == PRIMARY_MODEL:
                    print(f"\n  ⚠ API limit reached for {PRIMARY_MODEL}. Switching to backup: {BACKUP_MODEL}")
                    CURRENT_MODEL = BACKUP_MODEL
                    # Recursive call to try again immediately with the backup model
                    return verify_batch(client, batch, batch_index, total_batches, is_retry_pass)
                else:
                    print(f"  ✗ API limit reached even for backup model {CURRENT_MODEL}.")

            # Case 2: High Demand (503) -> Retry with same model
            elif ("503" in error_str or "overloaded" in error_str or "demand" in error_str):
                print(f"  ⚠ {CURRENT_MODEL} experiencing high demand (503). Retrying...")
                # We'll fall through to the retry loop logic

            print(f"  ✗ API error with {CURRENT_MODEL} (attempt {attempt + 1}): {e}")
            if attempt < RETRY_LIMIT - 1:
                # Wait before retrying (exponential backoff)
                wait_time = RETRY_BACKOFF * (attempt + 1)
                print(f"    Waiting {wait_time}s before retry...")
                time.sleep(wait_time)

    # If all retries fail, return None to signal a total failure for this pass
    print(f"  ✗ All retries exhausted for batch {batch_index + 1}")
    return None


def _extract_json_array(text: str) -> Optional[list]:
    """Extract a JSON array from potentially messy model output."""
    # Try direct parse
    text = text.strip()
    if text.startswith("```"):
        # Strip markdown code fences
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)
        text = text.strip()

    try:
        parsed = json.loads(text)
        if isinstance(parsed, list):
            return parsed
    except json.JSONDecodeError:
        pass

    # Try to find array in text
    match = re.search(r"\[.*\]", text, re.DOTALL)
    if match:
        try:
            parsed = json.loads(match.group())
            if isinstance(parsed, list):
                return parsed
        except json.JSONDecodeError:
            pass

    return None


# ---------------------------------------------------------------------------
# Report Generation
# ---------------------------------------------------------------------------

def generate_report(
    all_results: list[dict],
    questions_map: dict[str, dict],
    output_path: Path,
):
    """Generate the final report with flagged questions and corrected JSON."""
    flagged = [r for r in all_results if r.get("status") == "FLAGGED"]
    errors = [r for r in all_results if r.get("status") == "ERROR"]
    correct = [r for r in all_results if r.get("status") == "CORRECT"]

    print(f"\n{'='*60}")
    print(f"  VERIFICATION REPORT")
    print(f"{'='*60}")
    print(f"  Total questions : {len(all_results)}")
    print(f"  ✓ Correct       : {len(correct)}")
    print(f"  ⚠ Flagged       : {len(flagged)}")
    print(f"  ✗ Errors        : {len(errors)}")
    print(f"{'='*60}")

    if flagged:
        print(f"\n  FLAGGED QUESTIONS:")
        print(f"  {'-'*56}")
        for f in flagged:
            qid = f["id"]
            original = questions_map.get(qid, {})
            print(f"\n  [{qid}] {original.get('subtopic', '?')}")
            print(f"    Question : {original.get('question', '?')[:100]}...")
            print(f"    Original : {original.get('correctAnswer', '?')}")
            print(f"    Issue    : {f.get('issue', '?')}")
            if f.get("corrected_answer"):
                print(f"    Fix      : {f['corrected_answer']}")

    # Build corrected JSON output
    output_data = {
        "summary": {
            "total": len(all_results),
            "correct": len(correct),
            "flagged": len(flagged),
            "errors": len(errors),
        },
        "flagged_questions": [],
        "corrected_questions": [],
    }

    for f in flagged:
        qid = f["id"]
        original = questions_map.get(qid, {})
        flag_entry = {
            "id": qid,
            "issue": f.get("issue"),
            "original_answer": original.get("correctAnswer"),
            "corrected_answer": f.get("corrected_answer"),
            "original_explanation": original.get("explanation"),
            "corrected_explanation": f.get("corrected_explanation"),
        }
        output_data["flagged_questions"].append(flag_entry)

        # Build corrected question object
        corrected = dict(original)
        if f.get("corrected_answer"):
            corrected["correctAnswer"] = f["corrected_answer"]
        if f.get("corrected_explanation"):
            corrected["explanation"] = f["corrected_explanation"]
        output_data["corrected_questions"].append(corrected)

    output_path.write_text(
        json.dumps(output_data, indent=2, ensure_ascii=False),
        encoding="utf-8",
    )
    print(f"\n  Output saved to: {output_path}")


# ---------------------------------------------------------------------------
# Main Entry Point
# ---------------------------------------------------------------------------

def main():
    parser = argparse.ArgumentParser(
        description="CET-SIM Automated Question Verifier"
    )
    parser.add_argument(
        "bank_file",
        help="Path to a TypeScript question bank file (e.g., science_bank.ts)",
    )
    parser.add_argument(
        "--output", "-o",
        default=None,
        help="Output JSON file path (default: <bank_name>_flagged.json)",
    )
    parser.add_argument(
        "--batch-size", "-b",
        type=int,
        default=MAX_BATCH_SIZE,
        help=f"Max questions per batch (default: {MAX_BATCH_SIZE})",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Parse and batch questions without calling the API",
    )
    args = parser.parse_args()

    # Resolve input file
    bank_path = Path(args.bank_file).resolve()
    if not bank_path.exists():
        # Try relative to DATA_DIR
        bank_path = DATA_DIR / args.bank_file
    if not bank_path.exists():
        print(f"✗ File not found: {args.bank_file}")
        sys.exit(1)

    # Resolve output file
    if args.output:
        output_path = Path(args.output).resolve()
    else:
        stem = bank_path.stem
        output_path = SCRIPT_DIR / f"{stem}_flagged.json"

    print(f"\n  CET-SIM Question Verifier")
    print(f"  {'='*40}")
    print(f"  Input  : {bank_path.name}")
    print(f"  Output : {output_path.name}")
    print(f"  Batch  : {args.batch_size} questions/batch")

    # --- Parse questions ---
    print(f"\n  Parsing {bank_path.name}...")
    questions = load_question_bank(bank_path)
    print(f"  Loaded {len(questions)} questions")

    # --- Load reading passages if this is the reading bank ---
    passages = []
    if "reading" in bank_path.stem.lower():
        print(f"  Detected reading bank — loading passages...")
        passages = load_reading_passages(bank_path)
        print(f"  Loaded {len(passages)} passages")
        questions = hydrate_questions(questions, passages)
    elif bank_path.stem == "questions_bank":
        # Load all sub-banks? For now, handle individual banks
        pass

    # --- Validate and build question map ---
    valid_topics = load_topics_map()
    valid_questions = []
    seen_ids = set()
    
    for i, q in enumerate(questions):
        if not isinstance(q, dict):
            print(f"  ⚠ Skipping non-object question at index {i}")
            continue
            
        qid = q.get("id")
        if not qid:
            print(f"  ⚠ Question at index {i} is missing 'id' field. Skipping.")
            continue
            
        if qid in seen_ids:
            print(f"  ⚠ Duplicate ID detected: {qid}. Skipping duplicate.")
            continue
            
        # Validate subtopic
        subtopic = q.get("subtopic")
        if valid_topics and subtopic not in valid_topics:
            print(f"  ⚠ Question {qid} has invalid subtopic: '{subtopic}'")
            # We don't skip it, but we warn the user
            
        seen_ids.add(qid)
        valid_questions.append(q)

    questions = valid_questions
    questions_map = {q["id"]: q for q in questions}

    # --- Group and batch ---
    groups = group_questions(questions)
    batches = build_batches(groups, args.batch_size)
    print(f"  Created {len(batches)} batches from {len(groups)} groups")

    if args.dry_run:
        print(f"\n  [DRY RUN] Skipping API calls.")
        for i, batch in enumerate(batches):
            ids = [q["id"] for q in batch]
            text = json.dumps(batch, ensure_ascii=False)
            tokens = estimate_token_count(text)
            print(f"    Batch {i+1}: {len(batch)} questions, ~{tokens} tokens")
            print(f"      IDs: {', '.join(ids)}")
        sys.exit(0)

    # --- Initialise Gemini client ---
    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        print("✗ GEMINI_API_KEY environment variable not set.")
        sys.exit(1)

    client = genai.Client(api_key=api_key)

    # --- Verify batches ---
    all_results: list[dict] = []
    failed_batches = []

    for i, batch in enumerate(batches):
        results = verify_batch(client, batch, i, len(batches))
        if results is None:
            print(f"  ➜ Batch {i+1} queued for final retry pass.")
            failed_batches.append(batch)
        else:
            all_results.extend(results)

        # Rate-limit between batches
        if i < len(batches) - 1:
            print(f"  Cooling down for {RETRY_BACKOFF}s...")
            time.sleep(RETRY_BACKOFF)

    # --- Retry failed batches ---
    if failed_batches:
        print(f"\n{'!'*60}")
        print(f"  FINAL RETRY PASS: Processing {len(failed_batches)} missed batches")
        print(f"{'!'*60}")
        
        # Pause before starting retries
        time.sleep(RETRY_BACKOFF * 2)

        for i, batch in enumerate(failed_batches):
            results = verify_batch(client, batch, i, len(failed_batches))
            if results is None:
                # Still failed, add dummy error results so they show in report
                print(f"  ✗ Batch {i+1} failed again in retry pass.")
                all_results.extend([
                    {
                        "id": q["id"],
                        "status": "ERROR",
                        "issue": "Verification failed after initial run and final retry pass.",
                        "corrected_answer": None,
                        "corrected_explanation": None,
                    }
                    for q in batch
                ])
            else:
                all_results.extend(results)

            if i < len(failed_batches) - 1:
                time.sleep(RETRY_BACKOFF)

    # --- Generate report ---
    generate_report(all_results, questions_map, output_path)
    print(f"\n  Done! ✓\n")


if __name__ == "__main__":
    main()
