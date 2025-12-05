import js from '@eslint/js'
import nx from '@nx/eslint-plugin'
import pluginQuery from '@tanstack/eslint-plugin-query'
import eslintPluginPrettier from 'eslint-plugin-prettier/recommended'

const eslintIgnores = ['**/dist', "'migrations/**/*'"]

const config = [
  ...pluginQuery.configs['flat/recommended'],
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  js.configs.recommended,
  eslintPluginPrettier,
  {
    ignores: eslintIgnores,
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts', '**/*.js', '**/*.jsx', '**/*.cjs', '**/*.mjs'],
    // Override or add rules here
    rules: {},
  },
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: ['./tsconfig.base.json', 'libs/ui/tsconfig.storybook.json'],
        },
        node: true,
      },
    },
  },
]

export default config
