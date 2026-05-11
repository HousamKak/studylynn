import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "./components/TopBar";
import Home from "./components/Home";
import QuickQuiz from "./modes/QuickQuiz";
import Flashcards from "./modes/Flashcards";
import Match from "./modes/Match";
import Sort from "./modes/Sort";
import BossBattle from "./modes/BossBattle";
import Diagnose from "./modes/Diagnose";

const MODE_COMPONENTS = {
  quickQuiz: QuickQuiz,
  flashcards: Flashcards,
  match: Match,
  sort: Sort,
  bossBattle: BossBattle,
  diagnose: Diagnose,
};

export default function App() {
  const [mode, setMode] = useState(null);
  const onHome = () => setMode(null);
  const ModeComponent = mode ? MODE_COMPONENTS[mode] : null;

  return (
    <div className="min-h-screen">
      <TopBar onHome={onHome} />
      <AnimatePresence mode="wait">
        <motion.main
          key={mode || "home"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {ModeComponent ? (
            <ModeComponent onExit={onHome} />
          ) : (
            <Home onPickMode={setMode} />
          )}
        </motion.main>
      </AnimatePresence>
    </div>
  );
}
