# Neuropath.lab

A gamified study app for veterinary neuropathology, built from a single student notebook. 77 disease cards across 6 categories, 6 game modes.

## Modes

- **Quick Quiz** — 10 multiple-choice questions
- **Flashcards** — self-graded SRS, weak cards prioritized
- **Match** — pair diseases with etiology / species / clues
- **Sort** — drop cards into the correct category, timed
- **Boss Battle** — 60s rapid-fire survival, 3 lives
- **Diagnose** — pick the disease from a clinical case

All progress (XP, level, daily streak, per-card mastery, high scores) is saved to `localStorage`. No backend, no account.

## Stack

- Vite + React 19
- Tailwind CSS 3
- Framer Motion (animations)
- canvas-confetti (juice)

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Data

All 77 cards live in [`src/data/cards.js`](src/data/cards.js) with structured fields (`etiology`, `species`, `mechanism`, `lesions`, `keyClue`, `pearls`). Question generators in [`src/utils/questions.js`](src/utils/questions.js) build MCQs by pulling distractors from the same suit for realism.
