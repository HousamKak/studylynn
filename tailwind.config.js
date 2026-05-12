/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Deep cosmic surfaces (kept from clinical revamp, recolored a touch warmer)
        ink: {
          0: "#fafbfc",
          50: "#ecedf5",
          100: "#cdd0e0",
          200: "#a1a6c2",
          300: "#7a809e",
          400: "#5a6184",
          500: "#3f4564",
          600: "#2a2f47",
          700: "#1c2038",
          800: "#13162a",
          900: "#0b0d1e",
          950: "#070815",
        },
        // Brand: violet → fuchsia, the studylynn signature
        brand: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
        },
        // Accent palette for subject themes & glows
        magenta: {
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
        },
        sig: {
          good: "#34d399",
          warn: "#fbbf24",
          bad: "#f87171",
          info: "#22d3ee",
        },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        display: ["'Fraunces'", "Georgia", "serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        clinical: "-0.01em",
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(139, 92, 246, 0.55)",
        "glow-lg":
          "0 0 60px -10px rgba(217, 70, 239, 0.45), 0 0 30px -5px rgba(139, 92, 246, 0.4)",
        "card-lift":
          "0 30px 60px -20px rgba(8, 8, 28, 0.8), 0 18px 36px -18px rgba(139, 92, 246, 0.35)",
      },
      animation: {
        shake: "shake 0.4s ease-in-out",
        "fade-in": "fade-in 0.25s ease-out",
        "slide-up": "slide-up 0.35s ease-out",
        pop: "pop 0.3s ease-out",
        shimmer: "shimmer 2.6s linear infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2.4s ease-in-out infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
        "ping-slow": "ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-8px)" },
          "40%, 80%": { transform: "translateX(8px)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-up": {
          "0%": { transform: "translateY(16px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        pop: {
          "0%": { transform: "scale(0.9)" },
          "60%": { transform: "scale(1.06)" },
          "100%": { transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-glow": {
          "0%, 100%": {
            boxShadow: "0 0 0 0 rgba(217, 70, 239, 0.4)",
            opacity: 1,
          },
          "50%": {
            boxShadow: "0 0 0 12px rgba(217, 70, 239, 0)",
            opacity: 0.85,
          },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "ping-slow": {
          "75%, 100%": { transform: "scale(2.2)", opacity: 0 },
        },
      },
      backgroundImage: {
        "aurora":
          "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(139,92,246,0.18) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 90% 10%, rgba(217,70,239,0.14) 0%, transparent 60%), radial-gradient(ellipse 90% 70% at 50% 110%, rgba(34,211,238,0.10) 0%, transparent 60%)",
        "noise":
          "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.08 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      },
    },
  },
  plugins: [],
};
