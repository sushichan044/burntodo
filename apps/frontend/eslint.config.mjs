import react from "@virtual-live-lab/eslint-config/presets/react";
import tailwind from "@virtual-live-lab/eslint-config/addons/tailwind";
import { compat } from "@virtual-live-lab/eslint-config";
import tseslint from "typescript-eslint";

export default tseslint.config(
  ...react,
  ...tailwind,
  ...compat.plugins("eslint-plugin-react-compiler"),
  {
    languageOptions: {
      parser: tseslint.parser,
    },
    rules: {
      "react-compiler/react-compiler": 2,
    },
  },
);
