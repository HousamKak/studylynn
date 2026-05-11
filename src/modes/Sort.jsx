import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import ModeShell from "../components/ModeShell";
import { cards, SUITS } from "../data/cards";
import { useProgress } from "../state/progress";
import { shuffle } from "../utils/random";

export default function Sort() {
  const navigate = useNavigate();
  const goHome = () => navigate("/neuropath");
  const { recordAnswer, addXp, submitHighScore, updateStreak } = useProgress();
  const queue = useMemo(() => shuffle([...cards]), []);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState(null); // {ok, suit}
  const [finished, setFinished] = useState(false);

  useEffect(() => updateStreak(), [updateStreak]);

  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- end-of-round terminal transition
      setFinished(true);
      submitHighScore("sort", score);
      return;
    }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, finished, score, submitHighScore]);

  const card = queue[i];

  const place = (suit) => {
    const correct = card.suit === suit;
    recordAnswer(card.id, correct);
    setFeedback({ ok: correct, suit });
    if (correct) {
      setScore((s) => s + 5);
      addXp(3);
      setTimeLeft((t) => t + 1);
    } else {
      setScore((s) => Math.max(0, s - 2));
      setTimeLeft((t) => Math.max(0, t - 2));
    }
    setTimeout(() => {
      setFeedback(null);
      setI((x) => (x + 1) % queue.length);
    }, 350);
  };

  if (finished) {
    submitHighScore("sort", score);
    if (score > 50) confetti({ particleCount: 100, spread: 80 });
    return (
      <ModeShell title="Sort">
        <div className="text-center py-10">
          <div className="text-6xl mb-4">📦</div>
          <div className="font-display text-4xl font-bold text-white">{score}</div>
          <div className="text-white/60 mt-2">Final score</div>
          <div className="mt-8 flex gap-3 justify-center">
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Play again
            </button>
            <button className="btn-ghost" onClick={goHome}>
              Home
            </button>
          </div>
        </div>
      </ModeShell>
    );
  }

  return (
    <ModeShell
      title="Sort"
      subtitle="Drop each card into its category. +1s correct / −2s wrong."
            hud={
        <div className="flex items-center justify-between text-sm">
          <div className="text-white">
            Score: <span className="font-bold tabular-nums">{score}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-white/50">Time</span>
            <span
              className={`font-bold tabular-nums ${
                timeLeft <= 10 ? "text-red-400" : "text-white"
              }`}
            >
              {timeLeft}s
            </span>
          </div>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={
            feedback
              ? feedback.ok
                ? { scale: [1, 1.1, 0.9], opacity: [1, 1, 0] }
                : { x: [0, -10, 10, -8, 8, 0] }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: feedback ? 0.35 : 0.2 }}
          className="card p-6 mb-6 min-h-[160px] flex flex-col items-center justify-center text-center"
        >
          <div className="font-display text-3xl font-bold text-white mb-2">
            {card.name}
          </div>
          <div className="text-white/60 text-sm">{card.species}</div>
        </motion.div>
      </AnimatePresence>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {Object.entries(SUITS).map(([key, s]) => (
          <button
            key={key}
            onClick={() => place(key)}
            className="card p-4 hover:border-white/30 transition-all hover:scale-105"
            style={{ borderColor: s.color + "55" }}
          >
            <div className="text-3xl mb-1">{s.emoji}</div>
            <div className="text-white text-sm font-medium">{s.label}</div>
          </button>
        ))}
      </div>
    </ModeShell>
  );
}
