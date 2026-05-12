import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Timer } from "lucide-react";
import confetti from "canvas-confetti";
import ModeShell from "../components/ModeShell";
import { useDeck } from "../state/deckContextHook";
import { useProgress } from "../state/progress";
import { shuffle } from "../utils/random";
import { SuitIcon } from "../components/icons";

export default function Sort() {
  const navigate = useNavigate();
  const deck = useDeck();
  const goHome = () => navigate(deck.routePrefix);

  const { recordAnswer, addXp, submitHighScore, updateStreak } = useProgress();
  const queue = useMemo(() => shuffle([...deck.cards]), [deck]);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [feedback, setFeedback] = useState(null);
  const [finished, setFinished] = useState(false);

  useEffect(() => updateStreak(), [updateStreak]);

  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- end-of-round terminal transition
      setFinished(true);
      submitHighScore(`${deck.slug}:sort`, score);
      return;
    }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, finished, score, submitHighScore, deck]);

  const card = queue[i];

  const place = (suit) => {
    const correct = card.suit === suit;
    recordAnswer(`${deck.slug}:${card.id}`, correct);
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
    }, 300);
  };

  if (finished) {
    if (score > 50) confetti({ particleCount: 60, spread: 70 });
    return (
      <ModeShell title="Sort · Complete">
        <div className="panel-elev p-8 text-center">
          <div className="label-mono mb-2">Final score</div>
          <div className="stat-num font-display text-5xl font-semibold text-ink-0 mb-6">
            {score}
          </div>
          <div className="flex gap-2 justify-center">
            <button className="btn-primary text-sm" onClick={() => window.location.reload()}>
              Play again
            </button>
            <button className="btn-ghost text-sm" onClick={goHome}>
              Back to subject
            </button>
          </div>
        </div>
      </ModeShell>
    );
  }

  return (
    <ModeShell
      title="Sort"
      subtitle="Drop each card into its category · +1s correct / −2s wrong"
      hud={
        <div className="flex items-center justify-between text-[12px]">
          <div className="flex items-center gap-2">
            <span className="label-mono">Score</span>
            <span className="stat-num text-ink-0">{score}</span>
          </div>
          <div className="flex items-center gap-2">
            <Timer size={12} className={timeLeft <= 10 ? "text-red-400" : "text-ink-400"} />
            <span className={`stat-num ${timeLeft <= 10 ? "text-red-400" : "text-ink-0"}`}>
              {timeLeft}s
            </span>
          </div>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={card.id}
          initial={{ opacity: 0, y: 6, scale: 0.98 }}
          animate={
            feedback
              ? feedback.ok
                ? { scale: [1, 1.04, 0.95], opacity: [1, 1, 0] }
                : { x: [0, -8, 8, -6, 6, 0] }
              : { opacity: 1, y: 0, scale: 1 }
          }
          transition={{ duration: feedback ? 0.3 : 0.18 }}
          className="panel-elev p-6 mb-5 min-h-[140px] flex flex-col items-center justify-center text-center"
        >
          <div className="label-mono mb-2">Specimen</div>
          <div className="font-display text-2xl sm:text-3xl font-semibold text-ink-0 tracking-tightest leading-tight mb-1.5">
            {card.name}
          </div>
          <div className="text-ink-400 text-[12px]">{card.species}</div>
        </motion.div>
      </AnimatePresence>

      <div className="label-mono mb-2">Place into category</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {Object.entries(deck.suits).map(([key, s]) => (
          <button
            key={key}
            onClick={() => place(key)}
            className="panel panel-hover p-3 text-left transition focus-ring"
            style={{ borderColor: s.color + "40" }}
          >
            <div className="flex items-center gap-2 mb-1">
              <SuitIcon deck={deck.slug} suit={key} size={14} strokeWidth={2} style={{ color: s.color }} />
              <span className="text-[12px] text-ink-50 font-medium leading-tight">
                {s.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </ModeShell>
  );
}
