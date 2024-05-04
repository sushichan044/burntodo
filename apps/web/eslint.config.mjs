import nextjs from "@virtual-live-lab/eslint-config/presets/nextjs"
import tailwind from "@virtual-live-lab/eslint-config/addons/tailwind"

import tseslint from "typescript-eslint"

export default tseslint.config(...nextjs, ...tailwind, {
  languageOptions: {
    parser: tseslint.parser,
  },
})
