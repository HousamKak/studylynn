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
  Trophy,
} from "lucide-react";
import { useDeck } from "../state/deckContextHook";
import { useProgress, masteryColor } from "../state/progress";
import InfographicGallery from "../components/InfographicGallery";
import { SuitIcon } from "../components/icons";
import { subjects } from "../data/subjects";

const MODES = [
  {
    id: "quiz",
    title: "Quick Quiz",
    desc: "10 multiple-choice questions drawn from the whole deck.",
    Icon: Zap,
    scoreKey: "quickQuiz",
    accent: "#22d3ee",
  },
  {
    id: "flashcards",
    title: "Flashcards",
    desc: "Spaced-repetition study, self-graded. Builds mastery.",
    Icon: Layers,
    scoreKey: "flashcards",
    accent: "#a78bfa",
  },
  {
    id: "match",
    title: "Match",
    desc: "Pair each entry with the right etiology, target, or clue.",
    Icon: Crosshair,
    scoreKey: "match",
    accent: "#f472b6",
  },
  {
    id: "sort",
    title: "Sort",
    desc: "Drop cards into the correct category. Timed.",
    Icon: LayoutGrid,
    scoreKey: "sort",
    accent: "#34d399",
  },
  {
    id: "boss",
    title: "Boss Battle",
    desc: "60s rapid-fire survival, 3 lives, correct = +5s.",
    Icon: Skull,
    scoreKey: "bossBattle",
    accent: "#f87171",
  },
  {
    id: "diagnose",
    title: "Diagnose / Identify",
    desc: "Read a case. Pick the entry from the whole deck.",
    Icon: Stethoscope,
    scoreKey: "diagnose",
    accent: "#fbbf24",
  },
];

export default function SubjectHome() {
  const deck = useDeck();
  const navigate = useNavigate();
  const { state } = useProgress();
  const subjectMeta = subjects.find((s) => s.slug === deck.slug);
  const themeColor = subjectMeta?.color || "#a78bfa";
  const emoji = subjectMeta?.emoji || "📚";

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
  const overallPct = deck.cards.length > 0 ? (mastered / deck.cards.length) * 100 : 0;

  return (
    <div className="max-w-6xl mx-auto px-5 py-8">
      {/* Subject hero card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-ink-300 hover:text-white transition mb-4 focus-ring rounded-md"
        >
          <ArrowLeft size={14} />
          All subjects
        </Link>

        <div
          className="relative trading-card p-6 sm:p-8 mb-10 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${themeColor}30 0%, ${themeColor}10 50%, transparent 100%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
          }}
        >
          <div
            className="absolute -top-20 -right-10 w-72 h-72 rounded-full opacity-30 blur-3xl pointer-events-none"
            style={{ background: themeColor }}
          />
          <div
            className="absolute -bottom-24 -left-10 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
            style={{ background: themeColor }}
          />

          <div className="relative flex flex-col sm:flex-row items-start gap-5">
            <div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl flex items-center justify-center text-6xl shrink-0 border border-white/10 animate-float"
              style={{
                background: `radial-gradient(circle at 30% 25%, ${themeColor}60 0%, ${themeColor}15 60%, transparent 100%)`,
                boxShadow: `0 18px 40px -12px ${themeColor}, inset 0 1px 0 rgba(255,255,255,0.15)`,
              }}
            >
              <span className="drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                {emoji}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                {deck.title}
              </h1>
              <div className="mt-3 flex items-center gap-2 flex-wrap text-xs">
                <span className="chip bg-white/5 border border-white/10 text-ink-100">
                  <span className="stat-num">{deck.cards.length}</span> cards
                </span>
                <span className="chip bg-white/5 border border-white/10 text-ink-100">
                  <span className="stat-num">{Object.keys(deck.suits).length}</span> categories
                </span>
                <span className="chip bg-white/5 border border-white/10 text-ink-100">
                  <span className="stat-num">6</span> modes
                </span>
                {totalSeen > 0 && (
                  <span
                    className="chip border"
                    style={{
                      background: `${themeColor}15`,
                      borderColor: `${themeColor}55`,
                      color: themeColor,
                    }}
                  >
                    <Trophy size={11} />
                    <span className="stat-num">
                      {Math.round((totalCorrect / totalSeen) * 100)}%
                    </span>{" "}
                    accuracy
                  </span>
                )}
              </div>

              {/* Overall mastery */}
              <div className="mt-5">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="label-mono text-ink-300">Overall mastery</span>
                  <span className="stat-num text-white text-sm">
                    {mastered}/{deck.cards.length}{" "}
                    <span className="text-ink-400 font-normal">·</span>{" "}
                    {Math.round(overallPct)}%
                  </span>
                </div>
                <div className="h-2.5 rounded-full bg-white/5 border border-white/5 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${overallPct}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${themeColor}, ${themeColor}aa, ${themeColor})`,
                      boxShadow: `0 0 16px ${themeColor}88`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mastery breakdown */}
      <section className="mb-10">
        <h2 className="label-mono mb-3 text-fuchsia-300">Mastery breakdown</h2>
        <div className="panel-elev p-5 sm:p-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            <BucketStat label="Mastered" value={mastered} color="#34d399" />
            <BucketStat label="Learning" value={learning} color="#fbbf24" />
            <BucketStat label="Weak" value={weak} color="#f87171" />
            <BucketStat
              label="Untouched"
              value={deck.cards.length - mastered - learning - weak}
              color="#5d6975"
            />
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(16px,1fr))] gap-1.5">
            {deck.cards.map((c) => {
              const m = state.mastery[`${deck.slug}:${c.id}`];
              return (
                <div
                  key={c.id}
                  title={`${c.name} — ${m ? `${m.correct}/${m.reps}` : "untouched"}`}
                  className="aspect-square rounded-[3px] transition-transform hover:scale-[2.2] hover:z-10 relative cursor-pointer"
                  style={{
                    background: masteryColor(m),
                    boxShadow:
                      m && m.reps >= 2 && m.correct / m.reps >= 0.85
                        ? "0 0 8px rgba(52, 211, 153, 0.5)"
                        : undefined,
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Modes — quest cards */}
      <section className="mb-12">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="label-mono text-fuchsia-300 mb-1">Pick your quest</div>
            <h2 className="font-display text-2xl font-semibold text-white tracking-clinical">
              Study modes
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODES.map((m, i) => {
            const Icon = m.Icon;
            const high = state.highScores?.[`${deck.slug}:${m.scoreKey}`] ?? 0;
            return (
              <motion.button
                key={m.id}
                onClick={() => navigate(`${deck.routePrefix}/${m.id}`)}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="group relative trading-card text-left p-5 focus-ring overflow-hidden"
                style={{
                  background: `linear-gradient(140deg, ${m.accent}1a 0%, ${m.accent}05 60%, transparent 100%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
                }}
              >
                <div
                  className="absolute -top-12 -right-12 w-40 h-40 rounded-full opacity-25 blur-3xl pointer-events-none transition-opacity group-hover:opacity-50"
                  style={{ background: m.accent }}
                />

                <div className="relative flex items-start gap-3 mb-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border border-white/10 transition-transform group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: `radial-gradient(circle at 30% 30%, ${m.accent}55 0%, ${m.accent}15 70%, transparent 100%)`,
                      color: m.accent,
                      boxShadow: `0 8px 22px -6px ${m.accent}99, inset 0 1px 0 rgba(255,255,255,0.12)`,
                    }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-display text-lg font-bold text-white tracking-tight leading-tight">
                      {m.title}
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className="text-white/30 transition-all group-hover:translate-x-1"
                    style={{ color: m.accent }}
                  />
                </div>
                <p className="text-[13px] text-ink-200 leading-snug mb-3">
                  {m.desc}
                </p>

                <div className="flex items-center justify-between text-[11px] pt-3 border-t border-white/5">
                  <span className="label-mono text-ink-300">High score</span>
                  <span className="stat-num text-white flex items-center gap-1">
                    {high > 0 && <Trophy size={11} className="text-amber-400" />}
                    {high}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-10">
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="label-mono text-fuchsia-300 mb-1">Coverage</div>
            <h2 className="font-display text-2xl font-semibold text-white tracking-clinical">
              Categories · {Object.keys(deck.suits).length}
            </h2>
          </div>
        </div>
        <div className="panel-elev divide-y divide-white/5 overflow-hidden">
          {Object.entries(deck.suits).map(([key, s]) => {
            const inSuit = deck.cards.filter((c) => c.suit === key);
            const masteredInSuit = inSuit.filter((c) => {
              const m = state.mastery[`${deck.slug}:${c.id}`];
              return m && m.reps >= 2 && m.correct / m.reps >= 0.85;
            }).length;
            const pct = inSuit.length > 0 ? (masteredInSuit / inSuit.length) * 100 : 0;
            return (
              <div
                key={key}
                className="px-5 py-4 flex items-center gap-4 transition-colors hover:bg-white/[0.03]"
              >
                <div
                  className="w-10 h-10 rounded-xl border flex items-center justify-center shrink-0"
                  style={{
                    borderColor: s.color + "55",
                    background: `radial-gradient(circle at 30% 25%, ${s.color}40 0%, ${s.color}10 70%, transparent 100%)`,
                    color: s.color,
                    boxShadow: `0 4px 14px -4px ${s.color}99`,
                  }}
                >
                  <SuitIcon deck={deck.slug} suit={key} size={18} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-white font-semibold tracking-clinical">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-ink-300 stat-num mt-0.5">
                    {inSuit.length} cards
                  </div>
                </div>
                <div className="hidden sm:flex flex-col items-end gap-1 w-36 shrink-0">
                  <div className="stat-num text-white text-xs">
                    {masteredInSuit}/{inSuit.length}{" "}
                    <span className="text-ink-400 font-normal">· {Math.round(pct)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: `linear-gradient(90deg, ${s.color}, ${s.color}cc)`,
                        boxShadow: `0 0 8px ${s.color}88`,
                      }}
                    />
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
    <div
      className="rounded-xl border border-white/10 p-3 relative overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${color}1a 0%, transparent 100%)`,
      }}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <span
          className="inline-block w-2 h-2 rounded-full"
          style={{
            background: color,
            boxShadow: `0 0 8px ${color}cc`,
          }}
        />
        <span className="label-mono">{label}</span>
      </div>
      <div className="stat-num font-display text-white text-2xl leading-none">
        {value}
      </div>
    </div>
  );
}
