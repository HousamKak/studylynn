import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Flame, Sparkles, Star, Target, Trophy } from "lucide-react";
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
      : 0;

  return (
    <div className="max-w-6xl mx-auto px-5 py-10 sm:py-14">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-10 sm:mb-14 text-center sm:text-left"
      >
        <div className="inline-flex items-center gap-2 chip border border-white/10 bg-white/5 text-ink-100 mb-5">
          <Sparkles size={14} className="text-amber-400" />
          <span className="label-mono !tracking-[0.18em]">Lynn's Study Hub</span>
        </div>

        <h1 className="font-display font-bold tracking-tightest leading-[0.95] text-5xl sm:text-7xl">
          <span className="brand-text">study</span>
          <span className="brand-text text-glow">lynn</span>
        </h1>

        <p className="text-ink-200 mt-5 max-w-2xl text-base sm:text-lg leading-relaxed mx-auto sm:mx-0">
          Pick a subject. Each one is a self-contained game — flashcards,
          quizzes, boss battles, sorting drills, and case files. Level up,
          chase streaks, master decks.
        </p>
      </motion.div>

      {/* Stat HUD */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1 }}
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
      >
        <StatTile
          icon={<Star size={16} strokeWidth={2.2} />}
          label="Level"
          value={level}
          tint="from-violet-500/30 via-fuchsia-500/20 to-transparent"
          glow="rgba(139,92,246,0.45)"
        />
        <StatTile
          icon={<Sparkles size={16} strokeWidth={2.2} />}
          label="Total XP"
          value={state.xp}
          tint="from-fuchsia-500/30 via-pink-500/20 to-transparent"
          glow="rgba(217,70,239,0.45)"
        />
        <StatTile
          icon={<Target size={16} strokeWidth={2.2} />}
          label="Accuracy"
          value={state.totalSeen > 0 ? `${accuracy}%` : "—"}
          tint="from-cyan-500/30 via-sky-500/20 to-transparent"
          glow="rgba(34,211,238,0.4)"
        />
        <StatTile
          icon={<Flame size={16} strokeWidth={2.2} />}
          label="Day streak"
          value={state.streak}
          tint="from-amber-500/30 via-orange-500/20 to-transparent"
          glow="rgba(251,191,36,0.45)"
        />
      </motion.div>

      {/* Section header */}
      <div className="flex items-end justify-between mb-5">
        <div>
          <div className="label-mono text-fuchsia-300 mb-1">Choose your deck</div>
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-ink-0 tracking-clinical">
            Subjects · {subjects.length}
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-ink-300">
          <Trophy size={14} className="text-amber-400" />
          <span>Hover a card · click to enter</span>
        </div>
      </div>

      {/* Subject grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {subjects.map((s, i) => {
          const cov = coverage(s.slug);
          const pct = cov.total > 0 ? Math.round((cov.mastered / cov.total) * 100) : 0;
          const isReady = s.status === "ready";
          return (
            <motion.button
              key={s.slug}
              onClick={() => isReady && navigate(`/${s.slug}`)}
              disabled={!isReady}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.06, duration: 0.35 }}
              className={`trading-card text-left p-6 sm:p-7 focus-ring ${
                !isReady ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
              }`}
              style={{
                background: `linear-gradient(135deg, ${s.color}26 0%, ${s.color}0a 60%, transparent 100%), linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))`,
              }}
            >
              {/* Decorative glow blob */}
              <div
                className="absolute -top-16 -right-16 w-56 h-56 rounded-full opacity-40 blur-3xl pointer-events-none"
                style={{ background: s.color }}
              />

              <div className="relative flex items-start gap-5">
                {/* Emoji crest */}
                <div
                  className="relative w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shrink-0 border border-white/10 animate-float"
                  style={{
                    background: `radial-gradient(circle at 30% 25%, ${s.color}55 0%, ${s.color}1a 60%, transparent 100%)`,
                    boxShadow: `0 12px 30px -10px ${s.color}99, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  }}
                >
                  <span className="drop-shadow-[0_3px_8px_rgba(0,0,0,0.4)]">
                    {s.emoji}
                  </span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight">
                      {s.title}
                    </h3>
                    {!isReady && (
                      <span
                        className="pill text-[10px]"
                        style={{
                          background: `${s.color}1a`,
                          borderColor: `${s.color}55`,
                          color: s.color,
                        }}
                      >
                        Soon
                      </span>
                    )}
                  </div>
                  <p className="text-ink-200 text-sm leading-relaxed line-clamp-3 mb-4">
                    {s.blurb}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center gap-3 text-xs mb-3">
                    <span className="chip bg-white/5 border border-white/10 text-ink-100">
                      <Sparkles size={12} className="text-amber-400" />
                      <span className="stat-num">{cov.total}</span> cards
                    </span>
                    <span className="chip bg-white/5 border border-white/10 text-ink-100">
                      <Target size={12} className="text-cyan-300" />
                      <span className="stat-num">{s.modes}</span> modes
                    </span>
                  </div>

                  {/* Mastery bar */}
                  {isReady && (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="label-mono text-ink-300">Mastery</span>
                        <span className="stat-num text-white">
                          {cov.mastered}/{cov.total}{" "}
                          <span className="text-ink-400 font-normal">·</span>{" "}
                          {pct}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-white/5 border border-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${pct}%` }}
                          transition={{ duration: 0.9, delay: 0.4 + i * 0.06, ease: "easeOut" }}
                          className="h-full rounded-full relative"
                          style={{
                            background: `linear-gradient(90deg, ${s.color}, ${s.color}cc)`,
                            boxShadow: `0 0 12px ${s.color}66`,
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                <ArrowRight
                  size={20}
                  className="text-white/40 shrink-0 mt-2 transition-transform group-hover:translate-x-1"
                  style={isReady ? { color: s.color } : undefined}
                />
              </div>
            </motion.button>
          );
        })}

        {/* More-coming placeholder card */}
        <div className="rounded-3xl border border-dashed border-white/10 p-6 sm:p-7 flex flex-col items-center justify-center text-center min-h-[200px] text-ink-300">
          <Sparkles size={22} className="text-amber-400/70 mb-3 animate-pulse" />
          <div className="font-display text-lg text-white/80">More subjects coming</div>
          <div className="text-xs text-ink-400 mt-1">
            Housam keeps adding decks as Lynn requests them.
          </div>
        </div>
      </div>

      <footer className="mt-16 text-center text-[11px] text-ink-400">
        Local-only · progress lives in your browser · made with love for Lynn
      </footer>
    </div>
  );
}

function StatTile({ icon, label, value, tint, glow }) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 px-4 py-3 overflow-hidden bg-gradient-to-br ${tint}`}
      style={{ boxShadow: `0 12px 30px -18px ${glow}` }}
    >
      <div className="flex items-center gap-1.5 mb-1.5 text-white/70">
        <span style={{ color: glow.replace("0.4", "1").replace("0.45", "1") }}>
          {icon}
        </span>
        <span className="label-mono !text-[10px]">{label}</span>
      </div>
      <div className="stat-num font-display text-2xl sm:text-3xl text-white leading-none">
        {value}
      </div>
    </div>
  );
}
