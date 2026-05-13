// Raw icon maps and helpers — kept separate from JSX components so Fast Refresh
// only sees component exports in the .jsx file.
import {
  Activity,
  AlertCircle,
  Atom,
  Beaker,
  Bone,
  Brain,
  CircleDashed,
  Crosshair,
  Dna,
  Droplet,
  FlaskConical,
  Flame,
  Heart,
  Layers,
  LayoutGrid,
  Microscope,
  MoveRight,
  Pill,
  ShieldCheck,
  Skull,
  Stethoscope,
  Scroll,
  Target,
  TestTube,
  Waves,
  Zap,
} from "lucide-react";

export const SUIT_ICONS = {
  // Neuropath
  "neuropath:malformation": Dna,
  "neuropath:vascular": Droplet,
  "neuropath:degenerative": Brain,
  "neuropath:inflammatory": FlaskConical,
  "neuropath:structural": Bone,
  "neuropath:neoplasia": Target,

  // Pharma (broad survey)
  "pharma:acid": ShieldCheck,
  "pharma:emesis": Waves,
  "pharma:motility": MoveRight,
  "pharma:ibd": Flame,
  "pharma:laxative": Beaker,
  "pharma:antifungal": Microscope,

  // Oral
  "oral:congenital": Dna,
  "oral:systemic": Heart,
  "oral:viral": Atom,
  "oral:bacterial": FlaskConical,
  "oral:immune": ShieldCheck,
  "oral:neoplasia": Target,

  // GI Pharmacology
  "gi:physiology": Scroll,
  "gi:acid": ShieldCheck,
  "gi:emesis": Waves,
  "gi:prokinetic": MoveRight,
  "gi:antidiarrheal": AlertCircle,
  "gi:laxative": Beaker,

  // Toxicology
  "toxico:fundamentals": Scroll,
  "toxico:doses": Activity,
  "toxico:kinetics": Waves,
  "toxico:dynamics": Dna,
  "toxico:enzymes": FlaskConical,
  "toxico:systems": Heart,
};

export const MODE_ICONS = {
  quiz: Zap,
  flashcards: Layers,
  match: Crosshair,
  sort: LayoutGrid,
  boss: Skull,
  diagnose: Stethoscope,
};

export const SUBJECT_ICONS = {
  neuropath: Brain,
  pharma: Pill,
  oral: Activity,
  gi: TestTube,
  toxico: FlaskConical,
};

export function lookupSuitIcon(deckSlug, suitKey) {
  return SUIT_ICONS[`${deckSlug}:${suitKey}`] || CircleDashed;
}
