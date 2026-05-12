// Catalog of subjects shown on the hub. The slug must match a deck slug in src/data/decks/.

export const subjects = [
  {
    slug: "neuropath",
    title: "Veterinary Neuropathology",
    blurb:
      "77 disease cards across malformations, vascular, degenerative, inflammatory, structural, and neoplastic lesions.",
    color: "#a855f7",
    gradient: "from-violet-500/40 to-fuchsia-500/30",
    emoji: "🧠",
    status: "ready",
    modes: 6,
    cards: 77,
  },
  {
    slug: "pharma",
    title: "Veterinary Pharmacology",
    blurb:
      "GI drugs (acid suppressants, antiemetics, prokinetics, antidiarrheals, IBD, laxatives) and antifungals.",
    color: "#10b981",
    gradient: "from-emerald-500/40 to-teal-500/30",
    emoji: "💊",
    status: "ready",
    modes: 6,
    cards: 70,
  },
  {
    slug: "oral",
    title: "Oral Cavity Pathology",
    blurb:
      "Congenital anomalies, systemic markers, viral/bacterial/fungal stomatitis, immune lesions, and oral neoplasia with staging.",
    color: "#ec4899",
    gradient: "from-pink-500/40 to-rose-500/30",
    emoji: "🦷",
    status: "ready",
    modes: 6,
    cards: 29,
  },
];

export const subjectBySlug = (slug) => subjects.find((s) => s.slug === slug);
