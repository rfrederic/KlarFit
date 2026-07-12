import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0a",
        surface: "#141414",
        "surface-raised": "#1c1c1c",
        border: "#2a2a2a",
        foreground: "#f2f2f0",
        muted: "#9a9a95",
        accent: {
          DEFAULT: "#d7ff1e",
          dark: "#a8cc00",
          foreground: "#0a0a0a",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(215,255,30,0.25), 0 0 24px rgba(215,255,30,0.15)",
      },
      keyframes: {
        "fade-slide-in": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-slide-in": "fade-slide-in 0.35s ease-out",
      },
    },
  },
  plugins: [],
};
export default config;
