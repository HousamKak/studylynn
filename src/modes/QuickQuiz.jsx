import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import confetti from "canvas-confetti";
import ModeShell from "../components/ModeShell";
import { generateQuestionSet, cardLookupFn } from "../utils/questions";
import { useDeck } from "../state/deckContextHook";
import { useProgress } from "../state/progress";
import { SuitIcon } from "../components/icons";

const TOTAL = 20;

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
      if (newStreak >= 3) confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (i + 1 >= TOTAL) {
      submitHighScore(`${deck.slug}:quickQuiz`, score);
      setFinished(true);
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    } else {
      setI((x) => x + 1);
      setSelected(null);
    }
  };

  if (finished) {
    return (
      <ModeShell title="Quick Quiz · Complete" subtitle="Session summary">
        <div className="panel-elev p-8 text-center">
          <div className="label-mono mb-2">Final score</div>
          <div className="stat-num font-display text-5xl font-semibold text-ink-0 mb-1">
            {score}
          </div>
          <div className="text-ink-300 text-sm mb-6">
            {score > 0 ? Math.min(TOTAL, Math.ceil(score / 10)) : 0} of {TOTAL} correct
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
      title="Quick Quiz"
      subtitle={`Question ${i + 1} of ${TOTAL}`}
      hud={
        <div className="flex items-center gap-4 text-[12px]">
          <div className="flex-1 h-1.5 bg-ink-800 border border-ink-700 rounded-sm overflow-hidden">
            <motion.div
              className="h-full bg-teal-500"
              animate={{ width: `${((i + (selected !== null ? 1 : 0)) / TOTAL) * 100}%` }}
            />
          </div>
          <div className="flex items-center gap-3">
            <span className="label-mono">XP</span>
            <span className="stat-num text-ink-0">{score}</span>
            {streak >= 2 && (
              <span className="chip bg-orange-500/15 text-orange-300 border border-orange-500/30">
                streak ×{streak}
              </span>
            )}
          </div>
        </div>
      }
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={i}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 0.15 }}
        >
          {suit && card && (
            <div className="flex items-center gap-2 mb-3 text-[11px]">
              <span className="label-mono inline-flex items-center gap-1.5" style={{ color: suit.color }}>
                <SuitIcon deck={deck.slug} suit={card.suit} size={11} strokeWidth={2} />
                {suit.label}
              </span>
            </div>
          )}
          <div className="panel-elev p-5 mb-4">
            <p className="text-ink-50 text-[15px] leading-relaxed whitespace-pre-wrap">
              {q.prompt}
            </p>
          </div>

          <div className="space-y-2">
            {q.options.map((opt, idx) => {
              const isCorrect = idx === q.answerIndex;
              const isSelected = idx === selected;
              const showResult = selected !== null;
              let cls = "panel panel-hover p-3.5 w-full text-left cursor-pointer focus-ring";
              if (showResult) {
                if (isCorrect) cls += " !bg-green-500/10 !border-green-500/50";
                else if (isSelected) cls += " !bg-red-500/10 !border-red-500/50";
                else cls += " opacity-40";
                cls = cls.replace("cursor-pointer", "cursor-default panel-hover", 1);
              }
              return (
                <motion.button
                  key={idx}
                  whileTap={{ scale: showResult ? 1 : 0.99 }}
                  onClick={() => pick(idx)}
                  disabled={showResult}
                  className={cls}
                >
                  <div className="flex items-start gap-3">
                    <span className="stat-num text-[11px] text-ink-400 mt-1 w-4 shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <div className="flex-1 text-ink-50 text-[14px] leading-snug">{opt}</div>
                    {showResult && isCorrect && (
                      <Check size={16} className="text-green-400 mt-0.5 shrink-0" />
                    )}
                    {showResult && isSelected && !isCorrect && (
                      <X size={16} className="text-red-400 mt-0.5 shrink-0" />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {selected !== null && card && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="panel-elev p-4 mt-5"
            >
              <div className="label-mono mb-3">About · {card.name}</div>
              <dl className="space-y-2 text-[13px]">
                <Detail label={deck.fieldLabels.etiology} value={card.etiology} />
                <Detail label={deck.fieldLabels.species} value={card.species} />
                <Detail label={deck.fieldLabels.keyClue} value={card.keyClue} highlight />
                {card.pearls && <Detail label={deck.fieldLabels.pearls} value={card.pearls} />}
              </dl>
              <button className="btn-primary text-sm mt-4 w-full" onClick={next}>
                {i + 1 >= TOTAL ? "See results →" : "Next question →"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </ModeShell>
  );
}

function Detail({ label, value, highlight = false }) {
  return (
    <div className="flex gap-3">
      <dt className="label-mono w-24 shrink-0">{label}</dt>
      <dd className={highlight ? "text-teal-200 flex-1" : "text-ink-100 flex-1"}>{value}</dd>
    </div>
  );
}
