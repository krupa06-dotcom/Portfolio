import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#FAF7F2",
        surface: "#F1ECE4",
        "surface-dim": "#E3DACE",
        border: "#DCD6CC",
        heading: "#16130F",
        primary: "#16130F",
        body: "#3A352F",
        muted: "#6B655C",
        "on-badge": "#4A453F",
        accent: "#B3382C",
        "accent-hover": "#8F2C22",
        "accent-on": "#FFFDF9",
        "dark-bg": "#0E0C0B",
        "dark-heading": "#F5F1EC",
        "dark-body": "#D8D2C9",
        "dark-label": "#A69C97",
        "skills-bg": "#8C2A20",
        "skills-heading": "#FBEFEC",
        "skills-label": "#F0C6BC",
      },
      fontFamily: {
        heading: ["Georgia", "Times New Roman", "serif"],
        body: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["Menlo", "Monaco", "Consolas", "monospace"],
      },
      borderRadius: {
        md: "4px",
      },
      animation: {
        "aurora-1": "aurora-1 22s ease-in-out infinite alternate",
        "aurora-2": "aurora-2 18s ease-in-out infinite alternate",
        "marquee": "marquee 40s linear infinite",
        "typing": "typing 2s steps(12) 0.5s forwards",
        "blink": "blink 0.7s step-end 0.5s infinite",
      },
      keyframes: {
        "aurora-1": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(5%, 3%) scale(1.05)" },
          "100%": { transform: "translate(2%, -2%) scale(0.95)" },
        },
        "aurora-2": {
          "0%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(-4%, -2%) scale(1.08)" },
          "100%": { transform: "translate(3%, 4%) scale(0.92)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "typing": {
          "from": { width: "0" },
          "to": { width: "100%" },
        },
        "blink": {
          "50%": { borderColor: "transparent" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
