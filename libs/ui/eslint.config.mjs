// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import tailwind from '@hyoban/eslint-plugin-tailwindcss'
import nx from '@nx/eslint-plugin'
import storybook from 'eslint-plugin-storybook'

import baseConfig from '../../eslint.config.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default [
  ...baseConfig,
  ...tailwind.configs['flat/recommended'],
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  // --- Settings ---
  {
    settings: {
      tailwindcss: {
        config: `${__dirname}/../../apps/webui/src/styles/global.css`,
        callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
      },
    },
  },
  ...storybook.configs['flat/recommended'],
]
