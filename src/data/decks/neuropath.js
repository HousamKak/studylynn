// Re-exports the neuropathology deck data through the new deck schema.
// The actual card array still lives in src/data/cards.js for now to keep diffs small.
import { cards, SUITS } from "../cards";

export const neuropathDeck = {
  slug: "neuropath",
  title: "Veterinary Neuropathology",
  routePrefix: "/neuropath",
  suits: SUITS,
  cards,
  // Field labels shown in mode UIs — neuropath uses lesion/disease vocab.
  fieldLabels: {
    etiology: "Etiology",
    species: "Species",
    mechanism: "Mechanism",
    lesions: "Lesions",
    keyClue: "Key clue",
    pearls: "Pearl",
  },
  // Phrasing for prompts (used by question generators).
  prompts: {
    identifyNoun: "disease",
    keyClueNoun: "KEY CLUE / pathognomonic feature",
    affectsVerb: "affects which species",
    caseFileTitle: "📋 Case file",
    diagnoseVerb: "Diagnose",
  },
};
