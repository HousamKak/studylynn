import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { SUITS, cards } from "../data/cards";
import { useProgress, masteryColor } from "../state/progress";

const MODES = [
  {
    id: "quiz",
    title: "Quick Quiz",
    desc: "10 multiple-choice questions, all 77 cards in play.",
    icon: "⚡",
    accent: "from-yellow-500/30 to-orange-500/20",
    border: "border-yellow-500/30",
    scoreKey: "quickQuiz",
  },
  {
    id: "flashcards",
    title: "Flashcards",
    desc: "Spaced-repetition study, self-graded. Builds mastery.",
    icon: "🗂",
    accent: "from-blue-500/30 to-indigo-500/20",
    border: "border-blue-500/30",
    scoreKey: "flashcards",
  },
  {
    id: "match",
    title: "Match",
    desc: "Pair diseases with their etiology, species, or clue.",
    icon: "🔗",
    accent: "from-pink-500/30 to-rose-500/20",
    border: "border-pink-500/30",
    scoreKey: "match",
  },
  {
    id: "sort",
    title: "Sort",
    desc: "Drop cards into the correct category before time runs out.",
    icon: "📦",
    accent: "from-emerald-500/30 to-teal-500/20",
    border: "border-emerald-500/30",
    scoreKey: "sort",
  },
  {
    id: "boss",
    title: "Boss Battle",
    desc: "60s rapid-fire survival. 3 lives. Right = +5s.",
    icon: "👹",
    accent: "from-red-500/30 to-rose-600/20",
    border: "border-red-500/30",
    scoreKey: "bossBattle",
  },
  {
    id: "diagnose",
    title: "Diagnose",
    desc: "Read a clinical case. Pick the disease from all 77.",
    icon: "🩺",
    accent: "from-violet-500/30 to-fuchsia-500/20",
    border: "border-violet-500/30",
    scoreKey: "diagnose",
  },
];

export default function NeuropathHome() {
  const { state } = useProgress();
  const navigate = useNavigate();

  const masteryStats = (() => {
    let mastered = 0;
    let learning = 0;
    let weak = 0;
    cards.forEach((c) => {
      const m = state.mastery[c.id];
      if (!m || m.reps < 2) return;
      const ratio = m.correct / m.reps;
      if (ratio >= 0.85) mastered++;
      else if (ratio >= 0.6) learning++;
      else weak++;
    });
    return { mastered, learning, weak, untouched: cards.length - mastered - learning - weak };
  })();

  return (
    <div className="max-w-5xl mx-auto px-5 py-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-white/50 hover:text-white text-sm mb-3 transition"
        >
          ← All subjects
        </Link>
        <h1 className="font-display text-5xl sm:text-6xl font-bold text-white tracking-tight">
          Veterinary Neuropathology
        </h1>
        <p className="text-white/60 mt-3 text-lg">
          77 cards. Six modes. One mission — make the BVD timeline stick.
        </p>
      </motion.div>

      {/* Stats bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
        <StatCard label="Total XP" value={state.xp} accent="text-violet-400" />
        <StatCard
          label="Accuracy"
          value={
            state.totalSeen > 0
              ? `${Math.round((state.totalCorrect / state.totalSeen) * 100)}%`
              : "—"
          }
          accent="text-emerald-400"
        />
        <StatCard label="Mastered" value={`${masteryStats.mastered}/77`} accent="text-green-400" />
        <StatCard label="Weak cards" value={masteryStats.weak} accent="text-red-400" />
      </div>

      {/* Mode grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {MODES.map((m, i) => (
          <motion.button
            key={m.id}
            onClick={() => navigate(`/neuropath/${m.id}`)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className={`text-left p-6 rounded-2xl bg-gradient-to-br ${m.accent} border ${m.border} hover:border-white/30 transition-all`}
          >
            <div className="text-4xl mb-3">{m.icon}</div>
            <div className="font-display text-2xl font-bold text-white">{m.title}</div>
            <div className="text-white/60 mt-1 text-sm">{m.desc}</div>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="text-white/50">High score</span>
              <span className="text-white font-semibold tabular-nums">
                {state.highScores?.[m.scoreKey] ?? 0}
              </span>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Mastery wall */}
      <div className="mt-12">
        <h2 className="font-display text-2xl font-bold text-white mb-4">Mastery wall</h2>
        <p className="text-white/50 text-sm mb-4">
          Each dot = one card. Green = mastered (≥85%), yellow = learning, red = needs work, gray = untouched.
        </p>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(20px,1fr))] gap-1.5">
          {cards.map((c) => {
            const m = state.mastery[c.id];
            return (
              <div
                key={c.id}
                title={`${c.name} — ${
                  m ? `${m.correct}/${m.reps}` : "untouched"
                }`}
                className="aspect-square rounded-sm transition-transform hover:scale-150 hover:z-10"
                style={{ background: masteryColor(m) }}
              />
            );
          })}
        </div>
      </div>

      {/* Suit legend */}
      <div className="mt-12 mb-6">
        <h2 className="font-display text-2xl font-bold text-white mb-4">The 6 suits</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Object.entries(SUITS).map(([key, s]) => {
            const count = cards.filter((c) => c.suit === key).length;
            return (
              <div
                key={key}
                className="flex items-center gap-3 p-4 rounded-xl border border-white/10 bg-white/[0.02]"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                  style={{ background: s.color + "33", color: s.color }}
                >
                  {s.emoji}
                </div>
                <div>
                  <div className="text-white font-semibold">{s.label}</div>
                  <div className="text-white/50 text-xs">{count} cards</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/[0.02]">
      <div className="text-xs text-white/50 uppercase tracking-wider">{label}</div>
      <div className={`mt-1 text-2xl font-bold tabular-nums ${accent}`}>{value}</div>
    </div>
  );
}
