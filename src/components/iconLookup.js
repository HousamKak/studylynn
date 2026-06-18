// Raw icon maps and helpers — kept separate from JSX components so Fast Refresh
// only sees component exports in the .jsx file.
import {
  Activity,
  AlertCircle,
  Atom,
  Beaker,
  Bone,
  Brain,
  CheckCheck,
  CircleDashed,
  ClipboardCheck,
  Crosshair,
  Dna,
  Droplet,
  FileText,
  FlaskConical,
  Flame,
  Heart,
  HeartPulse,
  Hexagon,
  Hourglass,
  Layers,
  LayoutGrid,
  Microscope,
  MoveRight,
  Pill,
  Scale,
  Scissors,
  ShieldCheck,
  Skull,
  SprayCan,
  Stethoscope,
  Scroll,
  Syringe,
  Thermometer,
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

  // Antimicrobials
  "antimicrobials:betalactam": Hexagon,
  "antimicrobials:cellwall": ShieldCheck,
  "antimicrobials:ribo30s": Atom,
  "antimicrobials:ribo50s": Microscope,
  "antimicrobials:nucleic": Dna,
  "antimicrobials:folate": Beaker,

  // Necropsy & Pathology
  "necropsy:foundations": ClipboardCheck,
  "necropsy:postmortem": Hourglass,
  "necropsy:dissection": Scissors,
  "necropsy:sampling": FlaskConical,
  "necropsy:forensic": Scale,
  "necropsy:reporting": FileText,
  "necropsy:systemic": HeartPulse,

  // Surgical Pathology
  "surgpath:sepsis": HeartPulse,
  "surgpath:septclin": Thermometer,
  "surgpath:abscesspath": Droplet,
  "surgpath:abscessclin": Syringe,
  "surgpath:asepsis": ShieldCheck,
  "surgpath:sterile": SprayCan,
};

export const MODE_ICONS = {
  quiz: Zap,
  flashcards: Layers,
  match: Crosshair,
  sort: LayoutGrid,
  boss: Skull,
  diagnose: Stethoscope,
  truefalse: CheckCheck,
};

export const SUBJECT_ICONS = {
  neuropath: Brain,
  pharma: Pill,
  oral: Activity,
  gi: TestTube,
  toxico: FlaskConical,
  antimicrobials: Syringe,
  necropsy: Skull,
  surgpath: Scissors,
};

export function lookupSuitIcon(deckSlug, suitKey) {
  return SUIT_ICONS[`${deckSlug}:${suitKey}`] || CircleDashed;
}
