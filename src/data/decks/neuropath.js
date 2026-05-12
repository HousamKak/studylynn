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
  infographics: [
    {
      id: 1,
      title: "Congenital Malformations of the CNS",
      file: "01-congenital-malformations",
      suits: ["malformation"],
    },
    {
      id: 2,
      title: "BVDV and Fetal Nervous System Lesions",
      file: "02-bvd-fetal-cns",
      suits: ["malformation"],
    },
    {
      id: 3,
      title: "Vascular Lesions and Cerebral Edema",
      file: "03-cerebral-edema-vascular",
      suits: ["vascular"],
    },
    {
      id: 4,
      title: "CNS Ischemia and Hemorrhagic Trauma",
      file: "04-ischemia-hemorrhage-trauma",
      suits: ["vascular"],
    },
    {
      id: 5,
      title: "Degenerative CNS Lesions — Malacia Syndromes",
      file: "05-degenerative-malacia",
      suits: ["degenerative"],
    },
    {
      id: 6,
      title: "Degenerative and Progressive CNS Disorders (Prions)",
      file: "06-degenerative-progressive-prions",
      suits: ["degenerative"],
    },
    {
      id: 7,
      title: "Bacterial Inflammatory Lesions of the CNS",
      file: "07-bacterial-inflammatory",
      suits: ["inflammatory"],
    },
    {
      id: 8,
      title: "Viral, Fungal, and Parasitic CNS Lesions",
      file: "08-viral-fungal-parasitic",
      suits: ["inflammatory"],
    },
    {
      id: 9,
      title: "Other CNS Lesions and Neoplasia",
      file: "09-nontumorous-neoplasia",
      suits: ["structural", "neoplasia"],
    },
  ],
};
