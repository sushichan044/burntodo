import react from "@virtual-live-lab/eslint-config/presets/react";
import tailwind from "@virtual-live-lab/eslint-config/addons/tailwind";
import tseslint from "typescript-eslint";
import reactCompiler from "eslint-plugin-react-compiler";

export default tseslint.config(...react, ...tailwind, {
  plugins: {
    "react-compiler": reactCompiler,
  },
  languageOptions: {
    parser: tseslint.parser,
  },
  rules: {
    "react-compiler/react-compiler": 2,
  },
});
