import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
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
    desc: "20 multiple-choice questions from the whole deck.",
    Icon: Zap,
    scoreKey: "quickQuiz",
    accent: "#22d3ee",
  },
  {
    id: "flashcards",
    title: "Flashcards",
    desc: "Spaced repetition, self-graded. Builds mastery.",
    Icon: Layers,
    scoreKey: "flashcards",
    accent: "#a78bfa",
  },
  {
    id: "match",
    title: "Match",
    desc: "Pair each entry with the right etiology or clue.",
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
    desc: "60s rapid-fire survival, 3 lives.",
    Icon: Skull,
    scoreKey: "bossBattle",
    accent: "#f87171",
  },
  {
    id: "diagnose",
    title: "Diagnose",
    desc: "Read a case. Pick the entry.",
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-xs text-ink-300 hover:text-white transition mb-4 focus-ring rounded-md"
      >
        <ArrowLeft size={14} />
        All subjects
      </Link>

      {/* Subject header — single, compact */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-white/10 p-4 sm:p-6 mb-6"
        style={{
          background: `linear-gradient(135deg, ${themeColor}22 0%, ${themeColor}08 50%, transparent 100%), rgba(255,255,255,0.02)`,
        }}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl shrink-0 border border-white/10"
            style={{
              background: `linear-gradient(135deg, ${themeColor}45 0%, ${themeColor}15 100%)`,
            }}
          >
            <span>{emoji}</span>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
              {deck.title}
            </h1>
            <div className="mt-1.5 text-[12px] text-ink-300 stat-num flex items-center gap-1.5 flex-wrap">
              <span>{deck.cards.length} cards</span>
              <span className="text-ink-500">·</span>
              <span>{Object.keys(deck.suits).length} categories</span>
              <span className="text-ink-500">·</span>
              <span>6 modes</span>
              {totalSeen > 0 && (
                <>
                  <span className="text-ink-500">·</span>
                  <span style={{ color: themeColor }}>
                    {Math.round((totalCorrect / totalSeen) * 100)}% accuracy
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Overall mastery bar — only when there's progress */}
        {mastered > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="label-mono">Mastery</span>
              <span className="stat-num text-white">
                {mastered}/{deck.cards.length} · {Math.round(overallPct)}%
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="h-full rounded-full"
                style={{
                  background: themeColor,
                  boxShadow: `0 0 8px ${themeColor}88`,
                }}
              />
            </div>
          </div>
        )}
      </motion.div>

      {/* Modes — primary action, comes first */}
      <section className="mb-8">
        <h2 className="font-display text-lg sm:text-xl font-semibold text-white mb-3 px-1">
          Study modes
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-3">
          {MODES.map((m, i) => {
            const Icon = m.Icon;
            const high = state.highScores?.[`${deck.slug}:${m.scoreKey}`] ?? 0;
            return (
              <motion.button
                key={m.id}
                onClick={() => navigate(`${deck.routePrefix}/${m.id}`)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.22 }}
                className="trading-card text-left p-3.5 sm:p-4 focus-ring"
                style={{
                  background: `linear-gradient(135deg, ${m.accent}1c 0%, transparent 70%), rgba(255,255,255,0.025)`,
                }}
              >
                <div className="flex items-start gap-2.5 mb-1.5">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border border-white/10"
                    style={{
                      background: `${m.accent}26`,
                      color: m.accent,
                    }}
                  >
                    <Icon size={17} strokeWidth={2} />
                  </div>
                  <div className="flex-1 min-w-0 pt-0.5">
                    <div className="font-display text-[15px] sm:text-base font-bold text-white tracking-tight leading-snug">
                      {m.title}
                    </div>
                  </div>
                </div>
                <p className="text-[12px] text-ink-200 leading-snug mb-2">
                  {m.desc}
                </p>
                {high > 0 && (
                  <div className="flex items-center gap-1 text-[11px] text-ink-300">
                    <Trophy size={10} className="text-amber-400" />
                    <span className="stat-num text-white">{high}</span>
                    <span className="text-ink-400">high</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Categories */}
      <section className="mb-8">
        <h2 className="font-display text-lg sm:text-xl font-semibold text-white mb-3 px-1">
          Categories
          <span className="text-ink-400 text-sm font-normal stat-num ml-2">
            {Object.keys(deck.suits).length}
          </span>
        </h2>
        <div className="rounded-2xl border border-white/10 overflow-hidden">
          {Object.entries(deck.suits).map(([key, s], idx) => {
            const inSuit = deck.cards.filter((c) => c.suit === key);
            const masteredInSuit = inSuit.filter((c) => {
              const m = state.mastery[`${deck.slug}:${c.id}`];
              return m && m.reps >= 2 && m.correct / m.reps >= 0.85;
            }).length;
            const pct = inSuit.length > 0 ? (masteredInSuit / inSuit.length) * 100 : 0;
            return (
              <div
                key={key}
                className={`px-3.5 py-3 flex items-center gap-3 transition-colors hover:bg-white/[0.03] ${
                  idx > 0 ? "border-t border-white/5" : ""
                }`}
              >
                <div
                  className="w-9 h-9 rounded-lg border flex items-center justify-center shrink-0"
                  style={{
                    borderColor: s.color + "44",
                    background: s.color + "1a",
                    color: s.color,
                  }}
                >
                  <SuitIcon deck={deck.slug} suit={key} size={16} strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[14px] text-white font-medium tracking-tight truncate">
                    {s.label}
                  </div>
                  <div className="text-[11px] text-ink-300 stat-num mt-0.5">
                    {masteredInSuit}/{inSuit.length} mastered
                  </div>
                </div>
                <div className="w-16 sm:w-24 shrink-0">
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${pct}%`,
                        background: s.color,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Mastery breakdown — compact */}
      <section className="mb-8">
        <h2 className="font-display text-lg sm:text-xl font-semibold text-white mb-3 px-1">
          Mastery
        </h2>
        <div className="rounded-2xl border border-white/10 p-4">
          <div className="grid grid-cols-4 gap-2 mb-4">
            <BucketStat label="Mastered" value={mastered} color="#34d399" />
            <BucketStat label="Learning" value={learning} color="#fbbf24" />
            <BucketStat label="Weak" value={weak} color="#f87171" />
            <BucketStat
              label="New"
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
                  className="aspect-square rounded-[3px] transition-transform hover:scale-[2] hover:z-10 relative"
                  style={{ background: masteryColor(m) }}
                />
              );
            })}
          </div>
        </div>
      </section>

      <InfographicGallery deck={deck} />
    </div>
  );
}

function BucketStat({ label, value, color }) {
  return (
    <div className="rounded-lg border border-white/10 px-2.5 py-2 bg-white/[0.02]">
      <div className="flex items-center gap-1 mb-1">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: color }}
        />
        <span className="label-mono !text-[9px] truncate">{label}</span>
      </div>
      <div className="stat-num font-display text-white text-lg leading-none">
        {value}
      </div>
    </div>
  );
}
