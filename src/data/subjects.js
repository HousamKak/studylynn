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
  {
    slug: "gi",
    title: "GI Pharmacology — Detailed",
    blurb:
      "Deep dive: gastric physiology, acid suppression, emesis control, prokinetics, antidiarrheals/IBD, laxatives. Receptor-by-receptor.",
    color: "#22d3ee",
    gradient: "from-cyan-500/40 to-sky-500/30",
    emoji: "🫃",
    status: "ready",
    modes: 6,
    cards: 66,
  },
  {
    slug: "toxico",
    title: "Veterinary Toxicology",
    blurb:
      "Definitions, dose concepts (LD50/NOAEL/ADI/MRL), toxicokinetics (ADME), DNA adducts, enzyme inhibitors, and Hb/neuro/mutagenic/endocrine mechanisms.",
    color: "#84cc16",
    gradient: "from-lime-500/40 to-emerald-500/30",
    emoji: "⚗️",
    status: "ready",
    modes: 6,
    cards: 45,
  },
  {
    slug: "antimicrobials",
    title: "Veterinary Antimicrobial Pharmacology",
    blurb:
      "Antibiotics by mechanism: β-lactams (penicillins/cephalosporins/carbapenems), glycopeptides, 30S & 50S protein-synthesis inhibitors, fluoroquinolones/rifampin, and sulfonamides.",
    color: "#3b82f6",
    gradient: "from-blue-500/40 to-cyan-500/30",
    emoji: "🧫",
    status: "ready",
    modes: 6,
    cards: 100,
  },
  {
    slug: "necropsy",
    title: "Veterinary Necropsy & Pathology",
    blurb:
      "Postmortem technique, artifacts, sampling science, forensics, report writing, and organ-system pathology (septicemia, cardiovascular, respiratory). The full necropsy workflow.",
    color: "#dc2626",
    gradient: "from-red-500/40 to-rose-500/30",
    emoji: "🔬",
    status: "ready",
    modes: 6,
    cards: 161,
  },
];

export const subjectBySlug = (slug) => subjects.find((s) => s.slug === slug);
