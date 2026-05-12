import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Heart, HeartCrack } from "lucide-react";
import confetti from "canvas-confetti";
import ModeShell from "../components/ModeShell";
import { generateMcq, cardLookupFn } from "../utils/questions";
import { useDeck } from "../state/deckContextHook";
import { useProgress } from "../state/progress";
import { SuitIcon } from "../components/icons";

export default function BossBattle() {
  const navigate = useNavigate();
  const deck = useDeck();
  const goHome = () => navigate(deck.routePrefix);
  const cardById = cardLookupFn(deck);

  const { recordAnswer, addXp, submitHighScore, updateStreak } = useProgress();
  const [q, setQ] = useState(() => generateMcq(deck));
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [finished, setFinished] = useState(false);
  const [flash, setFlash] = useState(null);

  useEffect(() => updateStreak(), [updateStreak]);

  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0 || lives <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- end-of-round terminal transition
      setFinished(true);
      submitHighScore(`${deck.slug}:bossBattle`, score);
      if (score >= 100) confetti({ particleCount: 150, spread: 90 });
      return;
    }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, lives, finished, score, submitHighScore, deck]);

  const pick = (idx) => {
    const correct = idx === q.answerIndex;
    recordAnswer(`${deck.slug}:${q.cardId}`, correct);
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
      setQ(generateMcq(deck));
    }, 200);
  };

  const card = cardById(q.cardId);
  const suit = deck.suits[card.suit];

  if (finished) {
    return (
      <ModeShell title="Boss Battle · Complete">
        <div className="panel-elev p-8 text-center">
          <div className="label-mono mb-2">Final score</div>
          <div className="stat-num font-display text-5xl font-semibold text-ink-0 mb-1">
            {score}
          </div>
          <div className="text-ink-300 text-sm mb-6">
            {score >= 100 ? "Boss defeated." : "Boss survived. Try again."}
          </div>
          <div className="flex gap-2 justify-center">
            <button className="btn-primary text-sm" onClick={() => window.location.reload()}>
              Rematch
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
      title="Boss Battle"
      hud={
        <div className="flex items-center justify-between gap-3">
          <div className="flex gap-1">
            {[0, 1, 2].map((n) =>
              n < lives ? (
                <Heart key={n} size={16} className="text-red-400 fill-red-400/30" />
              ) : (
                <HeartCrack key={n} size={16} className="text-ink-600" />
              )
            )}
          </div>
          <div className="flex-1 mx-3 h-1.5 bg-ink-800 border border-ink-700 rounded-sm overflow-hidden">
            <motion.div
              className={`h-full ${timeLeft <= 10 ? "bg-red-500" : "bg-teal-500"}`}
              animate={{ width: `${(timeLeft / 60) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-right">
            <div className="label-mono">Score</div>
            <div className="stat-num text-ink-0 leading-none">{score}</div>
          </div>
        </div>
      }
    >
      {combo >= 3 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-3"
        >
          <span className="chip bg-orange-500/15 text-orange-300 border border-orange-500/30">
            Streak ×{combo}
          </span>
        </motion.div>
      )}

      <div
        className={`rounded-md transition-shadow ${
          flash === "good"
            ? "ring-1 ring-green-400"
            : flash === "bad"
            ? "ring-1 ring-red-400"
            : ""
        }`}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={q.prompt}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
          >
            <div className="flex items-center gap-2 mb-3 text-[11px]">
              <span className="label-mono inline-flex items-center gap-1.5" style={{ color: suit.color }}>
                <SuitIcon deck={deck.slug} suit={card.suit} size={11} strokeWidth={2} />
                {suit.label}
              </span>
            </div>
            <div className="panel-elev p-4 mb-3">
              <p className="text-ink-50 text-[14px] leading-relaxed whitespace-pre-wrap">
                {q.prompt}
              </p>
            </div>
            <div className="space-y-1.5">
              {q.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => pick(idx)}
                  className="panel panel-hover w-full p-3 text-left focus-ring active:scale-[0.99] transition"
                >
                  <div className="flex items-center gap-3">
                    <span className="stat-num text-[11px] text-ink-400 w-4 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1 text-[13px] text-ink-100 leading-snug">{opt}</span>
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
