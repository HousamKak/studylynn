import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
import ModeShell from "../components/ModeShell";
import { generateQuestionSet, cardLookupFn } from "../utils/questions";
import { useDeck } from "../state/deckContextHook";
import { useProgress } from "../state/progress";

const TOTAL = 10;

export default function QuickQuiz() {
  const navigate = useNavigate();
  const deck = useDeck();
  const goHome = () => navigate(deck.routePrefix);
  const cardById = cardLookupFn(deck);

  const { recordAnswer, addXp, submitHighScore, updateStreak } = useProgress();
  const questions = useMemo(() => generateQuestionSet(deck, TOTAL), [deck]);
  const [i, setI] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[i];
  const card = q ? cardById(q.cardId) : null;
  const suit = card ? deck.suits[card.suit] : null;

  useEffect(() => updateStreak(), [updateStreak]);

  const pick = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === q.answerIndex;
    recordAnswer(`${deck.slug}:${q.cardId}`, correct);
    if (correct) {
      const newStreak = streak + 1;
      const points = 10 + newStreak * 2;
      setScore((s) => s + points);
      setStreak(newStreak);
      addXp(points);
      if (newStreak >= 3) confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (i + 1 >= TOTAL) {
      submitHighScore(`${deck.slug}:quickQuiz`, score);
      setFinished(true);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    } else {
      setI((x) => x + 1);
      setSelected(null);
    }
  };

  if (finished) {
    return (
      <ModeShell title="Quick Quiz">
        <div className="text-center py-10">
          <div className="text-6xl mb-4">🎉</div>
          <div className="font-display text-4xl font-bold text-white">{score} XP</div>
          <div className="text-white/60 mt-2">
            You got {score > 0 ? Math.min(TOTAL, Math.ceil(score / 10)) : 0} of {TOTAL}
          </div>
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
      title="Quick Quiz"
      subtitle={`Question ${i + 1} of ${TOTAL}`}
      hud={
        <div className="flex items-center gap-4">
          <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
              animate={{ width: `${((i + (selected !== null ? 1 : 0)) / TOTAL) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="text-white font-semibold tabular-nums">{score} XP</span>
            {streak >= 2 && <span className="text-orange-400 font-semibold">🔥 ×{streak}</span>}
          </div>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          {suit && (
            <div className="pill mb-4" style={{ background: suit.color + "22", color: suit.color }}>
              <span>{suit.emoji}</span>
              <span>{suit.label}</span>
            </div>
          )}
          <div className="card p-6 mb-6">
            <p className="text-white text-lg leading-relaxed whitespace-pre-wrap">{q.prompt}</p>
          </div>

          <div className="space-y-3">
            {q.options.map((opt, idx) => {
              const isCorrect = idx === q.answerIndex;
              const isSelected = idx === selected;
              const showResult = selected !== null;
              let cls =
                "card p-4 cursor-pointer text-left text-white hover:border-white/30 transition";
              if (showResult) {
                if (isCorrect) cls += " !border-green-500 !bg-green-500/10";
                else if (isSelected) cls += " !border-red-500 !bg-red-500/10";
                else cls += " opacity-50";
                cls = cls.replace("cursor-pointer", "cursor-default");
              }
              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: showResult ? 1 : 0.98 }}
                  onClick={() => pick(idx)}
                  disabled={showResult}
                  className={`w-full ${cls}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-sm font-semibold shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </div>
                    <div className="flex-1">{opt}</div>
                    {showResult && isCorrect && <span className="text-green-400">✓</span>}
                    {showResult && isSelected && !isCorrect && (
                      <span className="text-red-400">✗</span>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {selected !== null && card && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 card p-5"
            >
              <div className="text-xs uppercase tracking-wider text-white/40 mb-2">
                About {card.name}
              </div>
              <div className="space-y-2 text-sm text-white/80">
                <div>
                  <span className="text-white/40">{deck.fieldLabels.etiology}:</span>{" "}
                  {card.etiology}
                </div>
                <div>
                  <span className="text-white/40">{deck.fieldLabels.species}:</span>{" "}
                  {card.species}
                </div>
                <div>
                  <span className="text-white/40">{deck.fieldLabels.keyClue}:</span>{" "}
                  {card.keyClue}
                </div>
                {card.pearls && (
                  <div>
                    <span className="text-white/40">{deck.fieldLabels.pearls}:</span>{" "}
                    {card.pearls}
                  </div>
                )}
              </div>
              <button className="btn-primary mt-4 w-full" onClick={next}>
                {i + 1 >= TOTAL ? "See results" : "Next question →"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </ModeShell>
  );
}
