import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import tailwind from '@hyoban/eslint-plugin-tailwindcss'
import nx from '@nx/eslint-plugin'
import jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'

import baseConfig from '../../eslint.config.mjs'

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  ...baseConfig,
  ...tailwind.configs['flat/recommended'],
  ...nx.configs['flat/react-typescript'],
  ...nx.configs['flat/react-jsx'],
  {
    ignores: ['.next/**/*'],
  },
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
]

export default config
