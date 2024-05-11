import scrollBar from "tailwind-scrollbar";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx,ts,tsx,md,mdx}",
    "./components/**/*.{js,jsx,ts,tsx,md,mdx}",
    "../../packages/ui/**/*.{js,jsx,ts,tsx,md,mdx}",
  ],
  plugins: [
    scrollBar({ nocompatible: true, preferredStrategy: "pseudoelements" }),
  ],
  theme: {
    extend: {},
  },
};
