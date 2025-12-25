import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        meu: {
          red: "#8A1F1F",
          dark: "#2B2B2B",
          gray: "#777777",
          white: "#FFFFFF"
        }
      }
    }
  },
  plugins: []
};

export default config;
