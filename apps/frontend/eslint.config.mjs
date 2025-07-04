import react from "@virtual-live-lab/eslint-config/presets/react";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [".react-router/**/*"],
  },
  ...react,
  {
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      "react-refresh": reactRefresh,
    },
    rules: {
      "react-refresh/only-export-components": [
        "error",
        { allowExportNames: ["meta", "links", "headers", "loader", "action"] },
      ],
    },
  },
);
