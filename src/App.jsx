import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "./components/TopBar";
import Hub from "./components/Hub";
import NeuropathHome from "./subjects/NeuropathHome";
import QuickQuiz from "./modes/QuickQuiz";
import Flashcards from "./modes/Flashcards";
import Match from "./modes/Match";
import Sort from "./modes/Sort";
import BossBattle from "./modes/BossBattle";
import Diagnose from "./modes/Diagnose";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <Routes location={location}>
          <Route path="/" element={<Hub />} />
          <Route path="/neuropath" element={<NeuropathHome />} />
          <Route path="/neuropath/quiz" element={<QuickQuiz />} />
          <Route path="/neuropath/flashcards" element={<Flashcards />} />
          <Route path="/neuropath/match" element={<Match />} />
          <Route path="/neuropath/sort" element={<Sort />} />
          <Route path="/neuropath/boss" element={<BossBattle />} />
          <Route path="/neuropath/diagnose" element={<Diagnose />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <TopBar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
