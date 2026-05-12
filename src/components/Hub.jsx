import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Library } from "lucide-react";
import { subjects } from "../data/subjects";
import { useProgress } from "../state/progress";
import { SUBJECT_ICONS } from "./icons";
import { decks } from "../data/decks";

export default function Hub() {
  const navigate = useNavigate();
  const { state, level } = useProgress();

  // Compute per-subject coverage from progress
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

  return (
    <div className="max-w-6xl mx-auto px-5 py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-10"
      >
        <div className="flex items-center gap-2 label-mono text-teal-300 mb-3">
          <Library size={12} />
          Reference Library
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink-0 tracking-tightest leading-tight max-w-3xl">
          A gamified study hub for veterinary students.
        </h1>
        <p className="text-ink-300 mt-3 max-w-2xl text-[15px] leading-relaxed">
          Each subject is a structured deck of cards, six game modes, and
          high-density reference posters. Progress is tracked per subject and
          saved locally on this device.
        </p>
      </motion.div>

      {/* Account summary strip */}
      <div className="panel-elev px-5 py-3 mb-8 flex items-center gap-6 flex-wrap text-sm">
        <div>
          <div className="label-mono">Level</div>
          <div className="stat-num text-ink-0 text-lg leading-none mt-1">{level}</div>
        </div>
        <div className="hairline-v h-8" />
        <div>
          <div className="label-mono">Total XP</div>
          <div className="stat-num text-ink-0 text-lg leading-none mt-1">{state.xp}</div>
        </div>
        <div className="hairline-v h-8" />
        <div>
          <div className="label-mono">Accuracy</div>
          <div className="stat-num text-ink-0 text-lg leading-none mt-1">
            {state.totalSeen > 0
              ? `${Math.round((state.totalCorrect / state.totalSeen) * 100)}%`
              : "—"}
          </div>
        </div>
        <div className="hairline-v h-8" />
        <div>
          <div className="label-mono">Day streak</div>
          <div className="stat-num text-ink-0 text-lg leading-none mt-1">{state.streak}</div>
        </div>
      </div>

      {/* Subjects */}
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="label-mono text-ink-200">Subjects · {subjects.length}</h2>
        <div className="text-[11px] text-ink-400 flex items-center gap-1">
          <BookOpen size={11} />
          Click a subject to enter
        </div>
      </div>

      <div className="panel-elev divide-y divide-ink-700">
        {subjects.map((s, i) => {
          const Icon = SUBJECT_ICONS[s.slug];
          const cov = coverage(s.slug);
          const pct = cov.total > 0 ? Math.round((cov.mastered / cov.total) * 100) : 0;
          return (
            <motion.button
              key={s.slug}
              onClick={() => s.status === "ready" && navigate(`/${s.slug}`)}
              disabled={s.status !== "ready"}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04, duration: 0.2 }}
              className={`group w-full text-left px-5 py-4 flex items-center gap-5 transition-colors ${
                s.status === "ready"
                  ? "hover:bg-ink-700/40 cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
              } focus-ring`}
            >
              <div className="w-10 h-10 rounded-md bg-ink-700/60 border border-ink-600 flex items-center justify-center text-teal-300 shrink-0">
                {Icon ? <Icon size={20} strokeWidth={1.75} /> : null}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display text-base sm:text-lg font-semibold text-ink-0 tracking-clinical">
                    {s.title}
                  </h3>
                  {s.status === "coming-soon" && (
                    <span className="pill border-ink-600 text-ink-300">Coming soon</span>
                  )}
                </div>
                <p className="text-ink-300 text-sm leading-snug line-clamp-2">
                  {s.blurb}
                </p>
                <div className="mt-2 flex items-center gap-3 text-[11px] text-ink-400">
                  <span className="stat-num">{cov.total} cards</span>
                  <span className="text-ink-600">·</span>
                  <span>{s.modes} modes</span>
                  <span className="text-ink-600">·</span>
                  <span className="stat-num text-ink-200">
                    {cov.mastered}/{cov.total} mastered
                  </span>
                </div>
              </div>

              {/* Inline mastery bar */}
              <div className="hidden sm:flex flex-col items-end gap-1 w-32 shrink-0">
                <div className="stat-num text-ink-0 text-sm leading-none">{pct}%</div>
                <div className="w-full h-1 bg-ink-800 border border-ink-700 rounded-sm overflow-hidden">
                  <div
                    className="h-full bg-teal-500/80"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <div className="label-mono text-ink-500">Mastery</div>
              </div>

              <ArrowRight
                size={18}
                className={`text-ink-500 shrink-0 transition-transform ${
                  s.status === "ready" ? "group-hover:translate-x-1 group-hover:text-teal-300" : ""
                }`}
              />
            </motion.button>
          );
        })}

        <div className="px-5 py-3 text-[11px] text-ink-500 italic flex items-center justify-center">
          More subjects coming as Housam adds them.
        </div>
      </div>

      <p className="mt-8 text-[11px] text-ink-500 text-center">
        Local-only. No accounts. Progress lives in your browser.
      </p>
    </div>
  );
}
