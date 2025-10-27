import { dirname } from 'path'
import { fileURLToPath } from 'url'
import tailwind from '@hyoban/eslint-plugin-tailwindcss'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'
import { defineConfig, globalIgnores } from 'eslint/config'

import baseConfig from '../../eslint.config.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = defineConfig([
  ...baseConfig,
  ...nextVitals,
  ...nextTs,
  ...tailwind.configs['flat/recommended'],
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    '**/out-tsc',
  ]),

  // --- Testing Rules ---
  {
    files: ['**/*.test.ts?(x)'],
    ...testingLibrary.configs['flat/react'],
    ...jestDom.configs['flat/recommended'],
  },
  // --- Custom Rule Overrides ---
  {
    rules: {
      'import/first': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'import/named': 'error',
      'import/namespace': 'error',
      'import/default': 'error',
      'import/export': 'error',
    },
  },
  // --- Settings ---
  {
    settings: {
      tailwindcss: {
        config: `${__dirname}/src/styles/global.css`,
        callees: ['classnames', 'clsx', 'ctl', 'cn', 'cva'],
      },
    },
  },
])

export default config
