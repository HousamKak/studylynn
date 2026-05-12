/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Clinical dark palette
        ink: {
          0: "#fafbfc",
          50: "#e7edf3",
          100: "#c7d2dd",
          200: "#9fadbd",
          300: "#7a8898",
          400: "#5d6975",
          500: "#454f59",
          600: "#2f3640",
          700: "#1f242c",
          800: "#141921",
          900: "#0c1016",
          950: "#070a0e",
        },
        // Accent: medical teal/cyan (recommended by the skill — replaces violet)
        teal: {
          50: "#ecfeff",
          100: "#cffafe",
          200: "#a5f3fc",
          300: "#67e8f9",
          400: "#22d3ee",
          500: "#06b6d4",
          600: "#0891b2",
          700: "#0e7490",
          800: "#155e75",
          900: "#164e63",
        },
        // Functional semantics
        sig: {
          good: "#22c55e",
          warn: "#f59e0b",
          bad: "#ef4444",
          info: "#22d3ee",
        },
      },
      fontFamily: {
        sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        display: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "ui-monospace", "monospace"],
        serif: ["'Newsreader'", "Georgia", "serif"],
      },
      letterSpacing: {
        tightest: "-0.04em",
        clinical: "-0.01em",
      },
      animation: {
        shake: "shake 0.4s ease-in-out",
        "fade-in": "fade-in 0.2s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        scan: "scan 1.5s ease-in-out infinite",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "20%, 60%": { transform: "translateX(-6px)" },
          "40%, 80%": { transform: "translateX(6px)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-up": {
          "0%": { transform: "translateY(12px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        scan: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
