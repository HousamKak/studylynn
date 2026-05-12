import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function InfographicGallery({ deck }) {
  const [active, setActive] = useState(null); // {idx, mode: 'image'|'prompt'}
  const [promptText, setPromptText] = useState("");
  const [promptLoading, setPromptLoading] = useState(false);

  const items = items || [];
  const baseUrl = `${import.meta.env.BASE_URL.replace(/\/$/, "")}/infographics/${deck.slug}`;
  const imageUrl = (file) => `${baseUrl}/${file}.jpg`;
  const promptUrl = (file) => `${baseUrl}/${file}.md`;

  const openImage = (idx) => setActive({ idx, mode: "image" });
  const openPrompt = async (idx) => {
    setActive({ idx, mode: "prompt" });
    setPromptLoading(true);
    setPromptText("");
    try {
      const res = await fetch(promptUrl(items[idx].file));
      const text = await res.text();
      setPromptText(text);
    } catch {
      setPromptText("Failed to load prompt.");
    } finally {
      setPromptLoading(false);
    }
  };

  const close = () => setActive(null);
  const prev = () =>
    setActive((a) => ({ ...a, idx: (a.idx - 1 + items.length) % items.length }));
  const next = () =>
    setActive((a) => ({ ...a, idx: (a.idx + 1) % items.length }));

  useEffect(() => {
    if (!active) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-baseline justify-between mb-4">
        <h2 className="font-display text-2xl font-bold text-white">Study sheets</h2>
        <div className="text-xs text-white/40">
          {items.length} infographics · click any to enlarge
        </div>
      </div>
      <p className="text-white/50 text-sm mb-5">
        High-density reference posters covering each topic. Use these to study before drilling cards.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((g, idx) => {
          const primarySuit = deck.suits[g.suits[0]];
          return (
            <button
              key={g.id}
              onClick={() => openImage(idx)}
              className="group relative rounded-xl overflow-hidden border border-white/10 hover:border-white/30 bg-white/[0.02] transition-all"
            >
              <div className="aspect-square overflow-hidden bg-black/30">
                <img
                  src={imageUrl(g.file)}
                  alt={g.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-3 text-left">
                <div className="text-white text-sm font-medium leading-tight line-clamp-2">
                  {g.title}
                </div>
                <div className="mt-2 flex flex-wrap gap-1">
                  {g.suits.map((s) => {
                    const suit = deck.suits[s];
                    return (
                      <span
                        key={s}
                        className="pill text-[10px] py-0.5 px-1.5"
                        style={{ background: suit.color + "22", color: suit.color }}
                      >
                        {suit.emoji} {suit.label.split(" ")[0]}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white/70 text-xs font-semibold opacity-0 group-hover:opacity-100 transition">
                ⤢
              </div>
              <div
                className="absolute top-2 left-2 w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center text-xs font-bold text-white"
                style={{ background: primarySuit.color + "cc" }}
              >
                {g.id}
              </div>
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            onClick={close}
          >
            <motion.div
              initial={{ scale: 0.95, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ duration: 0.15 }}
              className="relative w-full max-w-6xl max-h-full flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between gap-3 mb-3 text-white">
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white/40 uppercase tracking-wider">
                    {active.idx + 1} of {items.length} · {deck.title}
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-bold truncate">
                    {items[active.idx].title}
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() =>
                      active.mode === "image"
                        ? openPrompt(active.idx)
                        : openImage(active.idx)
                    }
                    className="btn-ghost text-xs"
                  >
                    {active.mode === "image" ? "View prompt" : "View image"}
                  </button>
                  <a
                    href={imageUrl(items[active.idx].file)}
                    download
                    className="btn-ghost text-xs"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Download
                  </a>
                  <button onClick={close} className="btn-ghost text-xs">
                    Close
                  </button>
                </div>
              </div>

              <div className="relative flex-1 overflow-auto rounded-2xl border border-white/10 bg-black/40">
                {active.mode === "image" ? (
                  <img
                    src={imageUrl(items[active.idx].file)}
                    alt={items[active.idx].title}
                    className="block mx-auto max-w-full max-h-[80vh] object-contain"
                  />
                ) : (
                  <div className="p-6">
                    {promptLoading ? (
                      <div className="text-white/50 text-sm">Loading prompt…</div>
                    ) : (
                      <pre className="text-white/85 text-xs sm:text-sm whitespace-pre-wrap leading-relaxed font-mono">
                        {promptText}
                      </pre>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-white/50">
                <button
                  onClick={prev}
                  className="hover:text-white transition px-2 py-1"
                  aria-label="Previous infographic"
                >
                  ← Prev
                </button>
                <div className="hidden sm:block">
                  Use ← → arrows · Esc to close
                </div>
                <button
                  onClick={next}
                  className="hover:text-white transition px-2 py-1"
                  aria-label="Next infographic"
                >
                  Next →
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
