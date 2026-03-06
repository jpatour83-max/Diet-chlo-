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
        forest: {
          50:  "#F0F7F2",
          100: "#D8EBD8",
          200: "#B0D7B0",
          300: "#88C388",
          400: "#60AF60",
          500: "#3D7550",
          600: "#2D5A3D",
          700: "#1E3D29",
          800: "#0F2014",
          900: "#071007",
        },
        gold: {
          100: "#F7EFE2",
          200: "#EDD9BA",
          300: "#E3C393",
          400: "#D9AD6B",
          500: "#C8A96E",
          600: "#A88545",
        },
        cream: "#FDFAF5",
        sage:  "#EEF4EE",
      },
      fontFamily: {
        sans:  ["'Inter'", "system-ui", "sans-serif"],
        serif: ["'Playfair Display'", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
export default config;
