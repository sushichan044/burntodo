import tailwind from "@virtual-live-lab/eslint-config/addons/tailwind";
import react from "@virtual-live-lab/eslint-config/presets/react";
import reactCompiler from "eslint-plugin-react-compiler";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(...react, ...tailwind, {
  languageOptions: {
    parser: tseslint.parser,
  },
  plugins: {
    "react-compiler": reactCompiler,
    "react-refresh": reactRefresh,
  },
  rules: {
    "react-compiler/react-compiler": 2,
    "react-refresh/only-export-components": [
      "error",
      { allowExportNames: ["meta", "links", "headers", "loader", "action"] },
    ],
  },
});
