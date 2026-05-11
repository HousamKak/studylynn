import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import ModeShell from "../components/ModeShell";
import { generateMcq } from "../utils/questions";
import { cardById, SUITS } from "../data/cards";
import { useProgress } from "../state/progress";

export default function BossBattle() {
  const navigate = useNavigate();
  const goHome = () => navigate("/neuropath");
  const { recordAnswer, addXp, submitHighScore, updateStreak } = useProgress();
  const [q, setQ] = useState(() => generateMcq());
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [finished, setFinished] = useState(false);
  const [flash, setFlash] = useState(null); // 'good' | 'bad'

  useEffect(() => updateStreak(), [updateStreak]);

  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0 || lives <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- end-of-round terminal transition
      setFinished(true);
      submitHighScore("bossBattle", score);
      if (score >= 100) confetti({ particleCount: 200, spread: 120 });
      return;
    }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, lives, finished, score, submitHighScore]);

  const pick = (idx) => {
    const correct = idx === q.answerIndex;
    recordAnswer(q.cardId, correct);
    if (correct) {
      const newCombo = combo + 1;
      const points = 5 + newCombo;
      setScore((s) => s + points);
      setCombo(newCombo);
      addXp(points);
      setTimeLeft((t) => t + 5);
      setFlash("good");
    } else {
      setLives((l) => l - 1);
      setCombo(0);
      setFlash("bad");
    }
    setTimeout(() => {
      setFlash(null);
      setQ(generateMcq());
    }, 250);
  };

  const card = cardById(q.cardId);
  const suit = SUITS[card.suit];

  if (finished) {
    return (
      <ModeShell title="Boss Battle">
        <div className="text-center py-10">
          <div className="text-6xl mb-4">{score >= 100 ? "👑" : "💀"}</div>
          <div className="font-display text-4xl font-bold text-white">{score}</div>
          <div className="text-white/60 mt-2">
            {score >= 100 ? "Boss defeated." : "Try again."}
          </div>
          <div className="mt-8 flex gap-3 justify-center">
            <button className="btn-primary" onClick={() => window.location.reload()}>
              Rematch
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
      title="Boss Battle"
            hud={
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((n) => (
              <span key={n} className="text-2xl">
                {n < lives ? "❤️" : "🖤"}
              </span>
            ))}
          </div>
          <div className="flex-1 mx-4 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${
                timeLeft <= 10
                  ? "bg-red-500"
                  : "bg-gradient-to-r from-violet-500 to-fuchsia-500"
              }`}
              animate={{ width: `${(timeLeft / 60) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-right">
            <div className="text-xs text-white/50 leading-none">SCORE</div>
            <div className="font-bold text-white tabular-nums">{score}</div>
          </div>
        </div>
      }
    >
      {combo >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-3 text-orange-400 font-bold"
        >
          🔥 COMBO ×{combo}
        </motion.div>
      )}

      <div
        className={`transition-colors duration-200 ${
          flash === "good" ? "ring-2 ring-green-500" : flash === "bad" ? "ring-2 ring-red-500" : ""
        } rounded-2xl`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={q.prompt}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.15 }}
          >
            <div className="pill mb-3" style={{ background: suit.color + "22", color: suit.color }}>
              <span>{suit.emoji}</span>
              <span>{suit.label}</span>
            </div>
            <div className="card p-5 mb-4">
              <p className="text-white text-base leading-relaxed whitespace-pre-wrap">
                {q.prompt}
              </p>
            </div>
            <div className="space-y-2">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => pick(idx)}
                  className="card w-full p-3 text-left text-white hover:border-white/30 transition active:scale-95"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <span className="flex-1 text-sm">{opt}</span>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </ModeShell>
  );
}
