import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { subjects } from "../data/subjects";
import { useProgress } from "../state/progress";

export default function Hub() {
  const navigate = useNavigate();
  const { state, level } = useProgress();

  return (
    <div className="max-w-5xl mx-auto px-5 py-12">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-baseline gap-3">
          <h1 className="font-display text-5xl sm:text-6xl font-bold text-white tracking-tight">
            study<span className="text-violet-400">lynn</span>
          </h1>
        </div>
        <p className="text-white/60 mt-4 text-lg max-w-2xl">
          Lynn's gamified study hub. Pick a subject below — each one is a self-contained game with
          its own deck, modes, and progress tracking.
        </p>
      </motion.div>

      <div className="mt-8 flex gap-3 text-sm text-white/50">
        <span>
          Level <span className="text-white font-semibold">{level}</span>
        </span>
        <span>·</span>
        <span>
          {state.xp} XP
        </span>
        <span>·</span>
        <span>
          {state.streak} day streak 🔥
        </span>
      </div>

      <h2 className="font-display text-2xl text-white mt-12 mb-6">Subjects</h2>

      <div className="grid sm:grid-cols-2 gap-4">
        {subjects.map((s, i) => (
          <motion.button
            key={s.slug}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={s.status === "ready" ? { y: -4 } : {}}
            whileTap={s.status === "ready" ? { scale: 0.98 } : {}}
            onClick={() => s.status === "ready" && navigate(`/${s.slug}`)}
            disabled={s.status !== "ready"}
            className={`text-left p-6 rounded-2xl bg-gradient-to-br ${s.gradient} border border-white/10 hover:border-white/30 transition-all ${
              s.status !== "ready" ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0"
                style={{ background: s.color + "33" }}
              >
                {s.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-display text-2xl font-bold text-white">{s.title}</h3>
                  {s.status === "coming-soon" && (
                    <span className="pill bg-white/10 text-white/60 text-[10px]">soon</span>
                  )}
                </div>
                <p className="text-white/60 mt-1.5 text-sm leading-relaxed">{s.blurb}</p>
                {s.status === "ready" && (
                  <div className="mt-3 flex items-center gap-3 text-xs text-white/50">
                    <span>{s.cards} cards</span>
                    <span>·</span>
                    <span>{s.modes} game modes</span>
                  </div>
                )}
              </div>
            </div>
          </motion.button>
        ))}

        {/* Placeholder "add subject" card to communicate the hub grows */}
        <div className="p-6 rounded-2xl border border-dashed border-white/10 text-white/30 text-center text-sm flex items-center justify-center min-h-[140px]">
          More subjects coming.
        </div>
      </div>

      <footer className="mt-16 text-white/30 text-xs text-center">
        Built solo. localStorage only — no accounts, no servers.
      </footer>
    </div>
  );
}
