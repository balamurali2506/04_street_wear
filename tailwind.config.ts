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
        brand: {
          black: "#0A0A0A",
          dark: "#0F0F0F",
          surface: "#141414",
          surface2: "#1C1C1C",
          border: "#272727",
          white: "#F2F0EB",
          orange: "#FF4D00",
          lime: "#C6FF00",
          gray: "#82807B",
          subtle: "#404040",
        },
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Bebas Neue", "Impact", "sans-serif"],
        sans: ["var(--font-space)", "Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
