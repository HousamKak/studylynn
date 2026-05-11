import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function ModeShell({
  title,
  subtitle,
  onExit,
  children,
  hud = null,
  exitTo = "/neuropath",
}) {
  const navigate = useNavigate();
  const exit = onExit || (() => navigate(exitTo));

  return (
    <div className="max-w-3xl mx-auto px-5 py-6">
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-white">{title}</h1>
          {subtitle && <p className="text-white/50 mt-1 text-sm">{subtitle}</p>}
        </div>
        <button onClick={exit} className="btn-ghost text-sm">
          ← Exit
        </button>
      </div>
      {hud && <div className="mb-4">{hud}</div>}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={title}>
        {children}
      </motion.div>
    </div>
  );
}
