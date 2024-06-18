import tailwind from "@virtual-live-lab/eslint-config/addons/tailwind";
import react from "@virtual-live-lab/eslint-config/presets/react";
import reactCompiler from "eslint-plugin-react-compiler";
import tseslint from "typescript-eslint";

export default tseslint.config(...react, ...tailwind, {
  languageOptions: {
    parser: tseslint.parser,
  },
  plugins: {
    "react-compiler": reactCompiler,
  },
  rules: {
    "react-compiler/react-compiler": 2,
  },
});
