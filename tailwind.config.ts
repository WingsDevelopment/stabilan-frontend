import type { Config } from "tailwindcss";

import { colors } from "./tailwind-config/colors";
import { fontSize, fontWeight, lineHeight } from "./tailwind-config/fonts";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        primaryFont: ["var(--font-raleway)"],
      },
      colors,
      fontSize,
      fontWeight,
      lineHeight,
    },
  },
  plugins: [],
};
export default config;
