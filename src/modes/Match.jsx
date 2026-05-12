import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Timer } from "lucide-react";
import confetti from "canvas-confetti";
import ModeShell from "../components/ModeShell";
import { useDeck } from "../state/deckContextHook";
import { useProgress } from "../state/progress";
import { shuffle, sample } from "../utils/random";
import { SuitIcon } from "../components/icons";

export default function Match() {
  const navigate = useNavigate();
  const deck = useDeck();
  const goHome = () => navigate(deck.routePrefix);

  const pairFields = [
    { key: "etiology", label: deck.fieldLabels.etiology },
    { key: "keyClue", label: deck.fieldLabels.keyClue },
    { key: "species", label: deck.fieldLabels.species },
  ];

  const { addXp, recordAnswer, submitHighScore, updateStreak } = useProgress();
  const [round, setRound] = useState(0);
  const [matched, setMatched] = useState({});
  const [wrong, setWrong] = useState({});
  const [selectedCard, setSelectedCard] = useState(null);
  const [field, setField] = useState(pairFields[0]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [finished, setFinished] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const set = useMemo(() => sample(deck.cards, 6), [round, deck]);
  const leftLabels = useMemo(() => set.map((c) => ({ id: c.id, label: c.name })), [set]);
  const rightLabels = useMemo(
    () => shuffle(set.map((c) => ({ id: c.id, label: c[field.key] }))),
    [set, field]
  );

  useEffect(() => updateStreak(), [updateStreak]);

  useEffect(() => {
    if (finished) return;
    if (timeLeft <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- end-of-round terminal transition
      setFinished(true);
      submitHighScore(`${deck.slug}:match`, score);
      return;
    }
    const t = setTimeout(() => setTimeLeft((x) => x - 1), 1000);
    return () => clearTimeout(t);
  }, [timeLeft, finished, score, submitHighScore, deck]);

  useEffect(() => {
    if (Object.keys(matched).length === set.length) {
      addXp(20);
      confetti({ particleCount: 60, spread: 60 });
      setTimeout(() => {
        setRound((r) => r + 1);
        setMatched({});
        setWrong({});
        setSelectedCard(null);
        setField(pairFields[Math.floor(Math.random() * pairFields.length)]);
      }, 600);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matched, set.length, addXp]);

  const handleLeft = (id) => !matched[id] && setSelectedCard(id);
  const handleRight = (id) => {
    if (matched[id] || !selectedCard) return;
    const correct = selectedCard === id;
    recordAnswer(`${deck.slug}:${selectedCard}`, correct);
    if (correct) {
      setMatched((m) => ({ ...m, [id]: true }));
      setScore((s) => s + 10);
      addXp(5);
    } else {
      setScore((s) => Math.max(0, s - 3));
      setWrong((w) => ({ ...w, [id]: true }));
      setTimeout(() => setWrong((w) => ({ ...w, [id]: false })), 400);
    }
    setSelectedCard(null);
  };

  if (finished) {
    return (
      <ModeShell title="Match · Complete">
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
      title="Match"
      subtitle={`Match ${deck.prompts.identifyNoun} with ${field.label.toLowerCase()}`}
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
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <div className="label-mono mb-1">
            {deck.prompts.identifyNoun.charAt(0).toUpperCase() + deck.prompts.identifyNoun.slice(1)}
          </div>
          {leftLabels.map((l) => {
            const c = deck.cards.find((x) => x.id === l.id);
            const suitColor = deck.suits[c.suit].color;
            const isMatched = matched[l.id];
            const isSelected = selectedCard === l.id;
            return (
              <button
                key={l.id}
                onClick={() => handleLeft(l.id)}
                disabled={isMatched}
                className={`w-full text-left p-3 rounded-sm border text-[13px] transition-colors focus-ring ${
                  isMatched
                    ? "bg-green-500/10 border-green-500/40 opacity-50"
                    : isSelected
                    ? "bg-teal-500/15 border-teal-400"
                    : "panel panel-hover"
                }`}
              >
                <div className="flex items-center gap-2">
                  <SuitIcon deck={deck.slug} suit={c.suit} size={13} strokeWidth={2} style={{ color: suitColor }} className="shrink-0" />
                  <span className="text-ink-50 font-medium leading-snug">{l.label}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="space-y-1.5">
          <div className="label-mono mb-1">{field.label}</div>
          {rightLabels.map((l) => {
            const isMatched = matched[l.id];
            const isWrong = wrong[l.id];
            return (
              <button
                key={l.id}
                onClick={() => handleRight(l.id)}
                disabled={isMatched}
                className={`w-full text-left p-3 rounded-sm border text-[13px] transition-colors focus-ring ${
                  isMatched
                    ? "bg-green-500/10 border-green-500/40 opacity-50"
                    : isWrong
                    ? "bg-red-500/15 border-red-500/50 animate-shake"
                    : "panel panel-hover"
                }`}
              >
                <span className="text-ink-100 leading-snug">{l.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </ModeShell>
  );
}
