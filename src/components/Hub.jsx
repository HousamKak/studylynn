import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Flame, Sparkles, Star, Target } from "lucide-react";
import { subjects } from "../data/subjects";
import { useProgress } from "../state/progress";
import { decks } from "../data/decks";

export default function Hub() {
  const navigate = useNavigate();
  const { state, level } = useProgress();

  const coverage = (slug) => {
    const deck = decks[slug];
    if (!deck) return { seen: 0, total: 0, mastered: 0 };
    let seen = 0;
    let mastered = 0;
    deck.cards.forEach((c) => {
      const m = state.mastery[`${slug}:${c.id}`];
      if (m && m.reps > 0) seen++;
      if (m && m.reps >= 2 && m.correct / m.reps >= 0.85) mastered++;
    });
    return { seen, total: deck.cards.length, mastered };
  };

  const accuracy =
    state.totalSeen > 0
      ? Math.round((state.totalCorrect / state.totalSeen) * 100)
      : null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="font-display font-bold leading-[0.95] text-4xl sm:text-6xl tracking-tight">
          <span className="brand-text">studylynn</span>
        </h1>
        <p className="text-ink-200 mt-3 max-w-xl text-[15px] sm:text-base leading-relaxed">
          Pick a subject. Each one is its own little game — quizzes, flashcards,
          boss battles, sort and match. Level up, chase streaks, master decks.
        </p>
      </motion.div>

      {/* Stat strip — 2x2 on mobile, 4-up on sm+ */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        <StatPill icon={<Star size={14} />} label="Level" value={level} tint="#a78bfa" />
        <StatPill icon={<Sparkles size={14} />} label="XP" value={state.xp} tint="#d946ef" />
        <StatPill
          icon={<Target size={14} />}
          label="Accuracy"
          value={accuracy !== null ? `${accuracy}%` : "—"}
          tint="#22d3ee"
        />
        <StatPill
          icon={<Flame size={14} />}
          label="Streak"
          value={state.streak}
          tint="#fbbf24"
        />
      </div>

      {/* Subjects */}
      <div className="flex items-baseline justify-between mb-3 px-1">
        <h2 className="font-display text-xl sm:text-2xl font-semibold text-white">
          Subjects
        </h2>
        <span className="text-[12px] text-ink-300 stat-num">{subjects.length}</span>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
        {subjects.map((s, i) => {
          const cov = coverage(s.slug);
          const pct = cov.total > 0 ? Math.round((cov.mastered / cov.total) * 100) : 0;
          const isReady = s.status === "ready";
          return (
            <motion.button
              key={s.slug}
              onClick={() => isReady && navigate(`/${s.slug}`)}
              disabled={!isReady}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06 + i * 0.04, duration: 0.25 }}
              className={`trading-card text-left p-4 sm:p-5 focus-ring ${
                isReady ? "cursor-pointer" : "opacity-50 cursor-not-allowed"
              }`}
              style={{
                background: `linear-gradient(135deg, ${s.color}22 0%, ${s.color}06 50%, transparent 100%), rgba(255,255,255,0.025)`,
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-[28px] shrink-0 border border-white/10"
                  style={{
                    background: `linear-gradient(135deg, ${s.color}38 0%, ${s.color}12 100%)`,
                  }}
                >
                  <span>{s.emoji}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-[17px] sm:text-lg font-bold text-white tracking-tight leading-snug line-clamp-2">
                    {s.title}
                  </h3>
                  <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-ink-300 stat-num">
                    <span>{cov.total} cards</span>
                    <span className="text-ink-500">·</span>
                    <span>{s.modes} modes</span>
                    {!isReady && (
                      <>
                        <span className="text-ink-500">·</span>
                        <span style={{ color: s.color }}>Soon</span>
                      </>
                    )}
                  </div>
                </div>
                <ChevronRight
                  size={18}
                  className="text-white/30 shrink-0"
                  style={isReady ? { color: s.color } : undefined}
                />
              </div>

              <p className="text-ink-200 text-[13px] leading-relaxed line-clamp-2 mb-3">
                {s.blurb}
              </p>

              {/* Mastery — only show when there's progress */}
              {isReady && cov.mastered > 0 && (
                <div>
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="label-mono">Mastery</span>
                    <span className="stat-num text-white">
                      {cov.mastered}/{cov.total} · {pct}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.2 + i * 0.04, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: s.color, boxShadow: `0 0 6px ${s.color}88` }}
                    />
                  </div>
                </div>
              )}
              {isReady && cov.mastered === 0 && (
                <div className="text-[11px] text-ink-400 stat-num">
                  Untouched · tap to start
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      <footer className="mt-12 text-center text-[11px] text-ink-400">
        Local-only · progress lives in your browser · made with love for Lynn
      </footer>
    </div>
  );
}

function StatPill({ icon, label, value, tint }) {
  return (
    <div
      className="rounded-xl border border-white/10 px-3 py-2.5 flex items-center gap-2.5"
      style={{
        background: `linear-gradient(135deg, ${tint}1a 0%, transparent 60%), rgba(255,255,255,0.03)`,
      }}
    >
      <span
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${tint}22`, color: tint }}
      >
        {icon}
      </span>
      <div className="min-w-0">
        <div className="label-mono !text-[10px] leading-none">{label}</div>
        <div className="stat-num font-display text-white text-lg leading-none mt-1">
          {value}
        </div>
      </div>
    </div>
  );
}
