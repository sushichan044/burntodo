import react from "@virtual-live-lab/eslint-config/presets/react"
import tailwind from "@virtual-live-lab/eslint-config/addons/tailwind"

import tseslint from "typescript-eslint"

export default tseslint.config(...react, ...tailwind, {
  languageOptions: {
    parser: tseslint.parser,
  },
})
