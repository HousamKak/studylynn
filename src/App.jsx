import { BrowserRouter, Routes, Route, Navigate, useLocation, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "./components/TopBar";
import Hub from "./components/Hub";
import SubjectHome from "./subjects/SubjectHome";
import { DeckProvider } from "./state/deckContext";
import { subjectBySlug } from "./data/subjects";
import QuickQuiz from "./modes/QuickQuiz";
import Flashcards from "./modes/Flashcards";
import Match from "./modes/Match";
import Sort from "./modes/Sort";
import BossBattle from "./modes/BossBattle";
import Diagnose from "./modes/Diagnose";
import TrueFalse from "./modes/TrueFalse";

const MODE_COMPONENTS = {
  quiz: QuickQuiz,
  flashcards: Flashcards,
  match: Match,
  sort: Sort,
  boss: BossBattle,
  diagnose: Diagnose,
  truefalse: TrueFalse,
};

function SubjectRouter() {
  const { subject, mode } = useParams();
  if (!subjectBySlug(subject)) return <Navigate to="/" replace />;
  if (mode && !MODE_COMPONENTS[mode]) return <Navigate to={`/${subject}`} replace />;
  const Body = mode ? MODE_COMPONENTS[mode] : SubjectHome;
  return (
    <DeckProvider slug={subject}>
      <Body />
    </DeckProvider>
  );
}

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
          <Route path="/:subject" element={<SubjectRouter />} />
          <Route path="/:subject/:mode" element={<SubjectRouter />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </motion.main>
    </AnimatePresence>
  );
}

export default function App() {
  const basename = import.meta.env.BASE_URL.replace(/\/$/, "") || "/";
  return (
    <BrowserRouter basename={basename}>
      <div className="min-h-screen">
        <TopBar />
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  );
}
