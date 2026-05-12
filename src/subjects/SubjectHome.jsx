import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronRight,
  Crosshair,
  LayoutGrid,
  Layers,
  Skull,
  Stethoscope,
  Zap,
} from "lucide-react";
import { useDeck } from "../state/deckContextHook";
import { useProgress, masteryColor } from "../state/progress";
import InfographicGallery from "../components/InfographicGallery";
import { SuitIcon, SUBJECT_ICONS } from "../components/icons";

const MODES = [
  {
    id: "quiz",
    title: "Quick Quiz",
    desc: "10 multiple-choice questions drawn from the whole deck.",
    Icon: Zap,
    scoreKey: "quickQuiz",
  },
  {
    id: "flashcards",
    title: "Flashcards",
    desc: "Spaced-repetition study, self-graded. Builds mastery.",
    Icon: Layers,
    scoreKey: "flashcards",
  },
  {
    id: "match",
    title: "Match",
    desc: "Pair each entry with the right etiology, target, or clue.",
    Icon: Crosshair,
    scoreKey: "match",
  },
  {
    id: "sort",
    title: "Sort",
    desc: "Drop cards into the correct category. Timed.",
    Icon: LayoutGrid,
    scoreKey: "sort",
  },
  {
    id: "boss",
    title: "Boss Battle",
    desc: "60 s rapid-fire survival, 3 lives, correct = +5 s.",
    Icon: Skull,
    scoreKey: "bossBattle",
  },
  {
    id: "diagnose",
    title: "Diagnose / Identify",
    desc: "Read a case. Pick the entry from the whole deck.",
    Icon: Stethoscope,
    scoreKey: "diagnose",
  },
];

export default function SubjectHome() {
  const deck = useDeck();
  const navigate = useNavigate();
  const { state } = useProgress();
  const SubjectIcon = SUBJECT_ICONS[deck.slug];

  let mastered = 0;
  let learning = 0;
  let weak = 0;
  deck.cards.forEach((c) => {
    const m = state.mastery[`${deck.slug}:${c.id}`];
    if (!m || m.reps < 2) return;
    const ratio = m.correct / m.reps;
    if (ratio >= 0.85) mastered++;
    else if (ratio >= 0.6) learning++;
    else weak++;
  });
  const totalSeen = deck.cards.reduce((acc, c) => {
    const m = state.mastery[`${deck.slug}:${c.id}`];
    return acc + (m?.reps || 0);
  }, 0);
  const totalCorrect = deck.cards.reduce((acc, c) => {
    const m = state.mastery[`${deck.slug}:${c.id}`];
    return acc + (m?.correct || 0);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      {/* Subject header */}
      <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-ink-300 hover:text-ink-50 transition mb-3 focus-ring rounded-sm"
        >
          <ArrowLeft size={12} />
          All subjects
        </Link>

        <div className="flex items-start gap-4 mb-6">
          <div className="w-12 h-12 rounded-md bg-ink-800 border border-ink-700 flex items-center justify-center text-teal-300 shrink-0">
            {SubjectIcon ? <SubjectIcon size={24} strokeWidth={1.75} /> : null}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-ink-0 tracking-tightest leading-tight">
              {deck.title}
            </h1>
            <div className="mt-1 text-[12px] text-ink-300 flex items-center gap-2 flex-wrap">
              <span className="stat-num">{deck.cards.length} cards</span>
              <span className="text-ink-600">·</span>
              <span>{Object.keys(deck.suits).length} categories</span>
              <span className="text-ink-600">·</span>
              <span>6 modes</span>
              <span className="text-ink-600">·</span>
              <span className="stat-num">
                {totalSeen > 0
                  ? `${Math.round((totalCorrect / totalSeen) * 100)}% accuracy`
                  : "No attempts yet"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mastery summary panel */}
      <section className="panel-elev px-5 py-4 mb-8">
        <div className="flex items-center justify-between mb-3">
          <h2 className="label-mono">Mastery summary</h2>
          <span className="text-[11px] text-ink-400 stat-num">
            {mastered}/{deck.cards.length} mastered
          </span>
        </div>

        <div className="grid grid-cols-4 gap-3 mb-4">
          <BucketStat label="Mastered" value={mastered} color="#22c55e" />
          <BucketStat label="Learning" value={learning} color="#f59e0b" />
          <BucketStat label="Weak" value={weak} color="#ef4444" />
          <BucketStat
            label="Untouched"
            value={deck.cards.length - mastered - learning - weak}
            color="#5d6975"
          />
        </div>

        <div className="grid grid-cols-[repeat(auto-fill,minmax(14px,1fr))] gap-1">
          {deck.cards.map((c) => {
            const m = state.mastery[`${deck.slug}:${c.id}`];
            return (
              <div
                key={c.id}
                title={`${c.name} — ${m ? `${m.correct}/${m.reps}` : "untouched"}`}
                className="aspect-square rounded-[2px] transition-transform hover:scale-[2] hover:z-10 relative"
                style={{ background: masteryColor(m) }}
              />
            );
          })}
        </div>
      </section>

      {/* Modes */}
      <section className="mb-10">
        <h2 className="label-mono mb-3">Study modes</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {MODES.map((m, i) => {
            const Icon = m.Icon;
            const high = state.highScores?.[`${deck.slug}:${m.scoreKey}`] ?? 0;
            return (
              <motion.button
                key={m.id}
                onClick={() => navigate(`${deck.routePrefix}/${m.id}`)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                className="group panel panel-hover text-left p-4 focus-ring"
              >
                <div className="flex items-start gap-3 mb-1">
                  <Icon size={18} strokeWidth={1.75} className="text-teal-300 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-[15px] font-semibold text-ink-0 tracking-clinical">
                      {m.title}
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-ink-600 group-hover:text-teal-300 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-[12px] text-ink-300 leading-snug pl-7">{m.desc}</p>
                <div className="mt-3 pl-7 flex items-center gap-2 text-[10px]">
                  <span className="label-mono text-ink-500">High</span>
                  <span className="stat-num text-ink-100">{high}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Categories breakdown */}
      <section className="mb-10">
        <h2 className="label-mono mb-3">Categories · {Object.keys(deck.suits).length}</h2>
        <div className="panel-elev divide-y divide-ink-700">
          {Object.entries(deck.suits).map(([key, s]) => {
            const inSuit = deck.cards.filter((c) => c.suit === key);
            const masteredInSuit = inSuit.filter((c) => {
              const m = state.mastery[`${deck.slug}:${c.id}`];
              return m && m.reps >= 2 && m.correct / m.reps >= 0.85;
            }).length;
            const pct = inSuit.length > 0 ? (masteredInSuit / inSuit.length) * 100 : 0;
            return (
              <div key={key} className="px-4 py-3 flex items-center gap-4">
                <div
                  className="w-8 h-8 rounded-sm border flex items-center justify-center shrink-0"
                  style={{
                    borderColor: s.color + "50",
                    background: s.color + "12",
                    color: s.color,
                  }}
                >
                  <SuitIcon deck={deck.slug} suit={key} size={16} strokeWidth={1.75} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-ink-50 font-medium tracking-clinical">{s.label}</div>
                  <div className="text-[11px] text-ink-400 stat-num">{inSuit.length} cards</div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1 w-28 shrink-0">
                  <div className="stat-num text-ink-200 text-xs">
                    {masteredInSuit}/{inSuit.length}
                  </div>
                  <div className="w-full h-1 bg-ink-800 border border-ink-700 rounded-sm overflow-hidden">
                    <div className="h-full" style={{ width: `${pct}%`, background: s.color }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <InfographicGallery deck={deck} />
    </div>
  );
}

function BucketStat({ label, value, color }) {
  return (
    <div className="px-3 py-2 border border-ink-700 rounded-sm bg-ink-800/40">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="inline-block w-1.5 h-1.5 rounded-sm" style={{ background: color }} />
        <span className="label-mono">{label}</span>
      </div>
      <div className="stat-num text-ink-0 text-lg leading-none">{value}</div>
    </div>
  );
}
