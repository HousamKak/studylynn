import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import confetti from "canvas-confetti";
import ModeShell from "../components/ModeShell";
import { useDeck } from "../state/deckContextHook";
import { useProgress } from "../state/progress";
import { shuffle } from "../utils/random";

const TOTAL = 15;

export default function TrueFalse() {
  const navigate = useNavigate();
  const deck = useDeck();
  const goHome = () => navigate(deck.routePrefix);
  const { addXp, submitHighScore, updateStreak } = useProgress();

  const items = useMemo(
    () => shuffle([...(deck.trueFalse || [])]).slice(0, TOTAL),
    [deck]
  );
  const total = items.length;

  const [i, setI] = useState(0);
  const [picked, setPicked] = useState(null); // the boolean the user chose
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => updateStreak(), [updateStreak]);

  const item = items[i];
  const isCorrect = picked !== null && picked === item.a;

  const pick = (val) => {
    if (picked !== null) return;
    setPicked(val);
    if (val === item.a) {
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
    if (i + 1 >= total) {
      submitHighScore(`${deck.slug}:trueFalse`, score);
      setFinished(true);
      confetti({ particleCount: 120, spread: 90, origin: { y: 0.5 } });
    } else {
      setI((x) => x + 1);
      setPicked(null);
    }
  };

  if (total === 0) {
    return (
      <ModeShell title="True / False" subtitle="No question bank for this subject">
        <div className="panel-elev p-8 text-center">
          <p className="text-ink-200 text-sm mb-6">
            This subject has no True/False bank yet.
          </p>
          <button className="btn-ghost text-sm" onClick={goHome}>
            Back to subject
          </button>
        </div>
      </ModeShell>
    );
  }

  if (finished) {
    const correctCount = score > 0 ? Math.min(total, Math.ceil(score / 10)) : 0;
    return (
      <ModeShell title="True / False · Complete" subtitle="Session summary">
        <div className="panel-elev p-8 text-center">
          <div className="label-mono mb-2">Final score</div>
          <div className="stat-num font-display text-5xl font-semibold text-ink-0 mb-1">{score}</div>
          <div className="text-ink-300 text-sm mb-6">
            {correctCount} of {total} correct
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

  const btnClass = (val) => {
    let cls = "panel panel-hover p-4 w-full text-center cursor-pointer focus-ring font-display text-lg font-semibold";
    if (picked !== null) {
      cls = cls.replace("cursor-pointer", "cursor-default");
      if (val === item.a) cls += " !bg-green-500/15 !border-green-500/50 text-green-200";
      else if (val === picked) cls += " !bg-red-500/15 !border-red-500/50 text-red-200";
      else cls += " opacity-40";
    }
    return cls;
  };

  return (
    <ModeShell
      title="True / False"
      subtitle={`Statement ${i + 1} of ${total}`}
      hud={
        <div className="flex items-center gap-4 text-[12px]">
          <div className="flex-1 h-1.5 bg-ink-800 border border-ink-700 rounded-sm overflow-hidden">
            <motion.div
              className="h-full bg-teal-500"
              animate={{ width: `${((i + (picked !== null ? 1 : 0)) / total) * 100}%` }}
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
          <div className="panel-elev p-6 mb-4 min-h-[120px] flex items-center">
            <p className="text-ink-50 text-[16px] leading-relaxed">{item.q}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileTap={{ scale: picked !== null ? 1 : 0.98 }}
              onClick={() => pick(true)}
              disabled={picked !== null}
              className={btnClass(true)}
            >
              True
            </motion.button>
            <motion.button
              whileTap={{ scale: picked !== null ? 1 : 0.98 }}
              onClick={() => pick(false)}
              disabled={picked !== null}
              className={btnClass(false)}
            >
              False
            </motion.button>
          </div>

          {picked !== null && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.18 }}
              className="panel-elev p-4 mt-5"
            >
              <div className="flex items-center gap-2 mb-2">
                {isCorrect ? (
                  <Check size={16} className="text-green-400" />
                ) : (
                  <X size={16} className="text-red-400" />
                )}
                <span className={`label-mono ${isCorrect ? "text-green-300" : "text-red-300"}`}>
                  {isCorrect ? "Correct" : "Incorrect"} · statement is {item.a ? "TRUE" : "FALSE"}
                </span>
              </div>
              {!item.a && item.c && (
                <p className="text-[13px] text-teal-200 leading-relaxed">
                  <span className="label-mono text-ink-300">Correct: </span>
                  {item.c}
                </p>
              )}
              <button className="btn-primary text-sm mt-4 w-full" onClick={next}>
                {i + 1 >= total ? "See results →" : "Next statement →"}
              </button>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </ModeShell>
  );
}
