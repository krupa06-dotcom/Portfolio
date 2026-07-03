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
        background: "#120C0C",
        surface: "#1A1414",
        border: "rgba(245, 241, 236, 0.08)",
        primary: "#F5F1EC",
        muted: "#A69C97",
        accent: "#C4462C",
      },
      fontFamily: {
        heading: ["Fraunces", "serif"],
        display: ["Fraunces", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        md: "4px",
      },
      animation: {
        "aurora-1": "aurora-1 22s ease-in-out infinite alternate",
        "aurora-2": "aurora-2 18s ease-in-out infinite alternate",
        "marquee": "marquee 40s linear infinite",
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
      },
    },
  },
  plugins: [],
};
export default config;
