import { useEffect, useState, useCallback } from "react";

const STORAGE_KEY = "neuropath_progress_v1";

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const yesterdayKey = () => {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
};

const defaultState = {
  xp: 0,
  totalCorrect: 0,
  totalSeen: 0,
  streak: 0,
  lastPlayedDay: null,
  mastery: {}, // cardId -> { reps, correct, lastSeen, ease }
  highScores: {
    quickQuiz: 0,
    bossBattle: 0,
    match: 0,
    sort: 0,
    diagnose: 0,
  },
};

const load = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
};

const save = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Quota exceeded or storage blocked — fail silently; in-memory state still works.
  }
};

export const xpForLevel = (level) => Math.floor(50 * level * (level + 1));
export const levelFromXp = (xp) => {
  let level = 1;
  while (xpForLevel(level) <= xp) level++;
  return level - 1;
};

export const useProgress = () => {
  const [state, setState] = useState(load);

  useEffect(() => {
    save(state);
  }, [state]);

  const updateStreak = useCallback(() => {
    setState((s) => {
      const today = todayKey();
      if (s.lastPlayedDay === today) return s;
      const yest = yesterdayKey();
      const newStreak = s.lastPlayedDay === yest ? s.streak + 1 : 1;
      return { ...s, streak: newStreak, lastPlayedDay: today };
    });
  }, []);

  const recordAnswer = useCallback((cardId, correct) => {
    setState((s) => {
      const m = s.mastery[cardId] || { reps: 0, correct: 0, lastSeen: 0, ease: 1 };
      const next = {
        reps: m.reps + 1,
        correct: m.correct + (correct ? 1 : 0),
        lastSeen: Date.now(),
        ease: Math.max(0.5, Math.min(3, m.ease + (correct ? 0.15 : -0.3))),
      };
      return {
        ...s,
        mastery: { ...s.mastery, [cardId]: next },
        totalSeen: s.totalSeen + 1,
        totalCorrect: s.totalCorrect + (correct ? 1 : 0),
      };
    });
  }, []);

  const addXp = useCallback((amount) => {
    setState((s) => ({ ...s, xp: s.xp + amount }));
  }, []);

  const submitHighScore = useCallback((mode, score) => {
    setState((s) => ({
      ...s,
      highScores: {
        ...s.highScores,
        [mode]: Math.max(s.highScores[mode] || 0, score),
      },
    }));
  }, []);

  const reset = useCallback(() => {
    setState(defaultState);
  }, []);

  return {
    state,
    level: levelFromXp(state.xp),
    xpInLevel: state.xp - xpForLevel(levelFromXp(state.xp)),
    xpToNext: xpForLevel(levelFromXp(state.xp) + 1) - xpForLevel(levelFromXp(state.xp)),
    progressToNext:
      (state.xp - xpForLevel(levelFromXp(state.xp))) /
      (xpForLevel(levelFromXp(state.xp) + 1) - xpForLevel(levelFromXp(state.xp))),
    addXp,
    recordAnswer,
    updateStreak,
    submitHighScore,
    reset,
  };
};

export const masteryColor = (m) => {
  if (!m || m.reps === 0) return "#3a3a45";
  const ratio = m.correct / m.reps;
  if (m.reps < 2) return "#71717a";
  if (ratio >= 0.85) return "#22c55e";
  if (ratio >= 0.6) return "#eab308";
  return "#ef4444";
};
