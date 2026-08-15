import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#0B101E",
        ink: "#F3F4F6",
        navy: {
          DEFAULT: "#111827",
          light: "#1F2937",
        },
        gold: {
          DEFAULT: "#E2A63B",
          light: "#F3D08A",
          dark: "#B87F1E",
        },
        teal: {
          DEFAULT: "#2C6E76",
          light: "#4A8F97",
        },
        clay: "#C6572E",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        perforate:
          "radial-gradient(circle, transparent 3px, currentColor 3.2px)",
      },
    },
  },
  plugins: [],
};
export default config;