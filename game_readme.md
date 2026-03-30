# CET Simulator

## Overview
"CET Simulator" is a high-stakes, test-taking simulation game built with React. Players must navigate a grueling exam by answering questions, managing their time, and utilizing strategic "Tactic" cards to survive. The game features a distinct "test paper" aesthetic, utilizing SVG noise textures, serif typography, and ink-like blending to simulate a physical examination document.

---

## For Users: Gameplay Guide

### Objective
Reach **100 points** before accumulating **3 Strikes**. If you reach 3 strikes, you fail the exam. If you run out of questions before reaching 100 points, you also fail.

### Game Flow
Each turn consists of the following phases:
1. **Draw Phase**: A new question is presented. You must declare how you want to tackle it.
2. **Declare Phase**: Choose your action (Standard, Blind, or Drop).
3. **Answering Phase**: Provide your answer based on the chosen action.
4. **Resolved Phase**: The result is revealed, points/strikes are awarded, and you proceed to the next question.

### Actions
When a question is drawn, you must declare one of three actions:
* **Standard Review**: You are given 60 seconds and multiple-choice options. 
  * *Correct*: Gain points based on the question's level.
  * *Incorrect*: Lose 5 points.
* **Blind Confidence**: You are given NO options and must type the exact answer.
  * *Correct*: Gain standard points + 20 bonus points.
  * *Incorrect*: Gain 1 Strike.
* **Drop Subject**: Skip the question entirely.
  * *Penalty*: Lose 5 points.

### Tactic Cards
You hold a hand of up to 5 Tactic cards. You draw a new Tactic card every 3 turns. If you exceed 5 cards, you must discard one.
* **Cram Session** *(Playable during Draw phase)*: Draw 3 questions from the deck, choose 1 to answer, and discard the other 2.
* **Process of Elimination** *(Playable during Answering phase, Standard Review only)*: Instantly removes 2 incorrect options from a multiple-choice question.
* **Second Guess** *(Playable during Resolved phase, after an incorrect Standard Review)*: Allows you to try answering the question again. If you get it wrong a second time, you must discard an additional Tactic card as a penalty.

---

## For Developers: Technical Overview

### Tech Stack
* **Framework**: React 18 (Vite)
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Animations**: Framer Motion (`motion/react`)
* **Icons**: Lucide React

### File Structure
* `/src/App.tsx`: The core application file. Contains all game state, logic, question data, and UI rendering. It is structured as a single-file component for rapid prototyping, utilizing complex conditional rendering based on the `gameState` and `phase`.
* `/src/index.css`: Global stylesheet containing Tailwind directives and custom font imports (Inter, JetBrains Mono, and serif fallbacks).
* `/src/main.tsx`: Standard React DOM rendering entry point.
* `/package.json`: Project dependencies and scripts.

### Core State Management (`App.tsx`)
The game relies heavily on React `useState` and `useEffect` hooks to manage the complex flow of the exam:
* `gameState`: `'start' | 'playing' | 'game_over'`
* `score`, `strikes`: Core win/loss metrics.
* `deck`: Array of remaining question objects.
* `hand`: Array of string identifiers for the player's current Tactic cards.
* `currentCard`: The question currently being tackled.
* `phase`: `'draw' | 'declare' | 'answering' | 'resolved'` - Dictates the current UI state of a turn.
* `action`: `'standard' | 'blind' | 'drop' | null` - The player's chosen approach for the current question.

### UI & Styling Approach (The "Test Paper" Theme)
The application uses a highly specific design language to simulate an exam paper:
* **Textures**: An inline SVG fractal noise filter is used as a `backgroundImage` with low opacity (`0.05`) on the main container, tactic cards, and headers to create a paper grain effect.
* **Typography**: Heavy use of `font-serif` for prompts, headers, and buttons to mimic academic documents.
* **Colors**: A muted palette (`bg-[#fdfbf7]` for paper, `text-neutral-900` for ink).
* **Blending**: `mix-blend-multiply` is applied to text and borders sitting on top of the paper texture to simulate ink soaking into the page.
* **Layout**: The UI is divided into a fixed Header HUD (stats), a scrollable Main Content area (the question paper), and a fixed Footer (the Tactic hand).

### Mobile Usability
The game is fully responsive and optimized for mobile devices. It features:
* **CSS Scroll Snapping**: A native swipe carousel allows users to easily switch between the Question Paper and the Answer Sheet on touch devices.
* **Responsive Layout**: The interface automatically switches between a side-by-side view on desktop and a single-pane swipeable view on mobile.
* **Touch-Optimized Answer Sheet**: Larger touch targets for answer bubbles on mobile.
* **Scrollable Tactics Bar**: The Cognitive Tactics bar is horizontally scrollable on mobile to prevent layout issues.
* **Swipe Indicator**: A visual hint is displayed on mobile to guide users to swipe between panes.

---

### Adding Questions
Questions are currently hardcoded in the `INITIAL_DECK` array within `App.tsx`. To add more, simply append objects matching the `Card` interface:
```typescript
{
  id: string;
  subject: string;
  level: number; // 1-3
  prompt: string;
  type: 'mc' | 'id'; // Multiple Choice or Identification
  options?: string[]; // Required if type is 'mc'
  answer: string; // The correct option letter (e.g., 'A') or the exact string for 'id'
}
```
