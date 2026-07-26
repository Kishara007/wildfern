import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Playfair Display", "Cinzel", "Georgia", "serif"],
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        wildfern: {
          50: '#f4f7f5',
          100: '#e3ece6',
          900: '#0d1512',
        }
      }
    },
  },
  plugins: [],
};
export default config;
