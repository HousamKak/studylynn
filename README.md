# studylynn

A gamified study hub for veterinary medicine students. One SPA, multiple subjects, six game modes per subject, locally-stored progress, and a clinical dark aesthetic inspired by medical reference tools.

Deployed to [study.lynnhamad.com](https://study.lynnhamad.com).

---

## Subjects

| Subject | Cards | Categories | Infographics |
|---|---:|---:|---:|
| Veterinary Neuropathology | 77 | 6 | 9 |
| Veterinary Pharmacology (combined) | 70 | 6 | — |
| Oral Cavity Pathology | 29 | 6 | 6 |
| GI Pharmacology — Detailed | 66 | 6 | 7 |
| Veterinary Toxicology | 45 | 6 | 9 |
| Veterinary Antimicrobial Pharmacology | 100 | 6 | 8 |

Each subject lives in `src/data/decks/<slug>.js` and is a self-contained deck with:

- `cards[]` — `{ id, name, suit, tier, etiology, species, mechanism, lesions, keyClue, pearls }`
- `suits` — the categories cards are grouped by (mapped to color + Lucide icon in `src/components/iconLookup.js`)
- `fieldLabels` — display labels for each field (e.g. neuropath calls it "Lesions"; pharma calls it "Adverse effects")
- `prompts` — phrasing used by question generators (e.g. neuropath asks "Which **disease** matches…"; pharma asks "Which **drug** matches…")
- `infographics[]` — references to the JPG/MD posters under `public/infographics/<slug>/`

---

## Game modes

All six modes work across every deck — they read from the active deck via `useDeck()` context and render with that deck's field labels and icons.

- **Quick Quiz** — 10 MCQs, distractors pulled from the same suit
- **Flashcards** — self-graded SRS (Again / Good / Easy), weakest-first ordering
- **Match** — 6 pairs, randomized: disease ↔ etiology / key clue / species
- **Sort** — drop a card into the correct category bucket, timed
- **Boss Battle** — 60s survival, 3 lives, correct = +5s
- **Diagnose** — read a case file, search-pick the correct entry from the whole deck

Each session writes to per-deck mastery (`<slug>:<card-id>`) and per-mode high scores (`<slug>:<mode>`).

---

## Infographics

Each subject ships a set of high-density reference posters under `public/infographics/<slug>/`:

```
public/infographics/neuropath/01-congenital-malformations.jpg
public/infographics/neuropath/01-congenital-malformations.md  ← the source prompt
…
```

Naming convention: `NN-slug.{jpg,md}` — `NN` matches the deck's `infographics` array ordering. The matching `.md` is the structured infographic prompt used to generate the image.

The `InfographicGallery` component on each subject page renders thumbnails, an aspect-locked lightbox, and a toggle between Image and Prompt view (the MD is fetched on demand).

---

## Stack

- **Vite 8** + **React 19** + **React Router 7**
- **Tailwind CSS 3** for styling (clinical dark theme — palette in `tailwind.config.js`)
- **IBM Plex Sans / Plex Mono / Newsreader** for typography
- **Framer Motion** for transitions (kept 150–300ms; honors `prefers-reduced-motion`)
- **lucide-react** for icons (no emoji)
- **canvas-confetti** for end-of-session juice

State persistence: pure browser localStorage. No backend, no accounts.

---

## Develop

```bash
npm install
npm run dev   # http://localhost:5173
```

Lint + build:

```bash
npm run lint
npm run build
npm run preview   # serve the production bundle locally
```

---

## Project layout

```
src/
  App.jsx                    Router + SubjectRouter (wraps modes in DeckProvider)
  components/
    Hub.jsx                  Subject directory (the / landing)
    TopBar.jsx               Sticky header with breadcrumbs + level/streak
    ModeShell.jsx            Common chrome for all 6 modes
    InfographicGallery.jsx   Thumbnails + lightbox under each subject page
    icons.jsx                <SuitIcon /> component
    iconLookup.js            deck:suit → Lucide component registry
  subjects/
    SubjectHome.jsx          Generic subject page (used by every deck)
  modes/
    QuickQuiz.jsx
    Flashcards.jsx
    Match.jsx
    Sort.jsx
    BossBattle.jsx
    Diagnose.jsx
  state/
    deckContext.jsx          DeckProvider
    deckContextHook.js       useDeck()
    progress.js              XP / level / streak / mastery + high scores
  data/
    subjects.js              Catalog displayed on the hub
    decks/
      neuropath.js
      pharma.js
      oral.js
      gi.js
      toxico.js
      antimicrobials.js
      index.js               Slug → deck registry
  utils/
    questions.js             MCQ generator (suit-aware distractors)
    random.js
public/
  infographics/<slug>/NN-slug.jpg + .md
  CNAME                      study.lynnhamad.com
```

---

## CI/CD

Two GitHub Actions workflows on `main`:

- `.github/workflows/ci.yml` — lint + build on every push and PR (artifact uploaded)
- `.github/workflows/pages.yml` — builds, copies `index.html` → `404.html` (SPA fallback), publishes to GitHub Pages with the configured custom domain

---

## Adding a new subject

1. Create `src/data/decks/<slug>.js` exporting a deck object with `slug`, `title`, `routePrefix`, `suits`, `cards`, `fieldLabels`, `prompts`, optional `infographics`.
2. Register it in `src/data/decks/index.js`.
3. Add a subject entry in `src/data/subjects.js` (slug must match).
4. Add Lucide icon mappings in `src/components/iconLookup.js`:
   - `SUBJECT_ICONS[<slug>]` — the subject's hub icon
   - `SUIT_ICONS["<slug>:<suit-key>"]` — one per suit
5. (Optional) Drop study sheets into `public/infographics/<slug>/NN-slug.{jpg,md}` and reference them in the deck's `infographics` array.

That's it — `<slug>` and `<slug>/<mode>` routes are auto-generated by `SubjectRouter` in `App.jsx`.

---

## Aesthetic

Clinical dark: ink-950 backgrounds, ink-700 hairlines, single teal accent, IBM Plex Sans throughout, generous use of `label-mono` (uppercase tracking-wider) for section headers in the style of EHR / medical reference apps. No glow effects, no gradients on cards, no emoji.

Color tokens are defined in `tailwind.config.js` under `colors.ink.*` and `colors.teal.*`, with semantic aliases (`sig.good`, `sig.warn`, `sig.bad`) for status feedback.
