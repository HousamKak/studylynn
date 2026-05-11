// Catalog of subjects. To add a new subject, append an entry here and create the corresponding
// route in src/App.jsx + subject page component.

export const subjects = [
  {
    slug: "neuropath",
    title: "Veterinary Neuropathology",
    blurb: "77 disease cards across malformations, vascular, degenerative, inflammatory, structural, and neoplastic lesions.",
    color: "#a855f7",
    gradient: "from-violet-500/40 to-fuchsia-500/30",
    emoji: "🧠",
    status: "ready",
    modes: 6,
    cards: 77,
  },
  // future subjects go here — placeholder examples to demonstrate the catalog UI:
  // {
  //   slug: "pharmacology",
  //   title: "Veterinary Pharmacology",
  //   blurb: "Drugs by class, mechanism, target species, and contraindications.",
  //   color: "#10b981",
  //   gradient: "from-emerald-500/40 to-teal-500/30",
  //   emoji: "💊",
  //   status: "coming-soon",
  // },
];

export const subjectBySlug = (slug) => subjects.find((s) => s.slug === slug);
