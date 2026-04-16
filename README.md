# CET Simulator (Beta v1.0.0)

A high-fidelity, deterministic exam simulation platform designed for **UPCAT**, **ACET**, **DCAT**, and **USTET** readiness. This application delivers a rigorous, proctored testing environment coupled with a sophisticated modular study system.

## 🌟 Core Features

- **Deterministic Daily Rotation:** Question sets shuffle using a date-seeded algorithm, ensuring a synchronized "Daily Challenge" experience for all users.
- **Strict Proctor Mechanics:** Rigorous environment monitoring. Any "visibility loss" (e.g., switching tabs) incurs automated time penalties to simulate real-world testing stakes.
- **Biometric Fatigue Simulation:** The UI dynamically adjusts (blur, letter pacing, line height) based on a deterministic "fatigue" curve to simulate the mental strain of long-duration testing.
- **Spaced Repetition (SR):** A built-in vocabulary mastery system that tracks performance on high-frequency exam terms, optimizing recall for maximum efficiency.
- **Binder-Paper Design System:** A custom, premium UI aesthetic featuring fractal noise textures, "binder" ruled layouts, and meticulously curated typography for a professional, focused experience.
- **AI-Powered Review:** At the conclusion of each exam, a rich `.txt` payload is generated, designed for ingestion by a custom "veteran professor" AI to dissect knowledge gaps.
- **Interactive Lesson Modules:** Comprehensive, academically rigorous teaching modules (e.g., Cell Biology, Poetry Analysis) using the same high-fidelity design language.

## 🛠️ Architecture & Tech Stack

- **Framework:** [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) with custom design tokens.
- **Typography:** Inter, Lora, and custom serif fonts for that "academic paper" feel.
- **Math & Science:** [KaTeX](https://katex.org/) for high-quality mathematical typesetting.
- **Animations:** [Motion](https://motion.dev/) for fluid transitions and Apple-style slide-up study overlays.
- **Icons:** [Lucide React](https://lucide.dev/) for consistent, minimalist iconography.

---

## 📂 Data & Content Management

The application utilizes a **Group-Aware Flattened Schema**, allowing for complex context-based questions (like reading passages or multi-question figures) while maintaining a clean developer experience.

### Question Banks (`src/data/`)
- `language_bank.ts`: Grammar, syntax, and vocabulary (English & Filipino).
- `science_bank.ts`: Biology, Chemistry, Physics, and Earth Science.
- `math_bank.ts`: Algebra, Geometry, and Advanced Math.
- `reading_bank.ts`: Managed via a shared passage/question hydration system.
- `topics.json`: The master curriculum map for all categorization and analytics.

### Group-Aware Rendering
The rendering engine (`PaperView.tsx`) automatically detects `groupId` tags. It intelligently:
1. Injects subject-specific instructions (e.g., "Identify the error" or "Choose the antonym") only once per group.
2. Renders shared context (passages, figures) at the head of the group.
3. Removes redundant stylistic containers to maintain a clean "exam sheet" look.

---

## 🎨 Interactive Syntax & Extensions

We support several custom extensions to standard Markdown/HTML for exam-specific needs:

- **Mathematical Expressions:** Use `$ ... $` for inline and `$$ ... $$` for block-level equations.
- **Error Identification:** Use `{word}[label]` syntax (e.g., `{they}[A] {is}[B] ...`) which the engine automatically renders with underlined text and centered labels.
- **Underline Rendering:** Native `<u>` support that integrates cleanly with our serif typography without adding weight artifacts.

## ➕ Adding More Questions

To expand the simulator's question bank, follow the specialized guide in [src/data/README.md](file:///c:/Users/deiny/OneDrive/Documents/cet-test/src/data/README.md).

### Quick Workflow:
1.  **Choose Subject**: Open `language_bank.ts`, `science_bank.ts`, `math_bank.ts`, or `reading_bank.ts`.
2.  **Match Topic**: Ensure the `subtopic` field matches a term in `topics.json`.
3.  **Use ID**: Use the format `[CODE]-[TOPIC_ID]-[INDEX]` (e.g., `SC-501-12`).
4.  **Format**: Use `$ ... $` for math and `{text}[label]` for error identification.

---

## 🚀 Getting Started

1. **Clone & Install:**
   ```bash
   git clone <repository-url>
   npm install
   ```

2. **Run Development Server:**
   ```bash
   npm run dev
   ```

3. **Production Build:**
   ```bash
   npm run build
   ```

## 📝 Contribution Guidelines

- **IDs:** Follow the convention `[SUBJECT]-[SUBTOPIC_CODE]-[INDEX]` (e.g., `SC-703-1`).
- **Data Integrity:** Always cross-reference `topics.json` when adding new questions to ensure correct categorization.
- **Asset Placement:** Store figures in `/public/assets/figures/` and reference them via absolute paths.

---

*Good luck, examinees. Aim for the top.*
