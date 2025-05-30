/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ['prettier-plugin-tailwindcss', '@ianvs/prettier-plugin-sort-imports'],
  bracketSpacing: true,
  printWidth: 120,
  tabWidth: 2,
  quoteProps: 'as-needed',
  singleQuote: true,
  jsxSingleQuote: false,
  trailingComma: 'all',
  bracketSameLine: true,
  semi: false,
  endOfLine: 'auto',
  importOrder: [
    '^.+\\.scss$',
    '^.+\\.css$',
    '^(react/(.*)$)|^(react$)',
    '^(next/(.*)$)|^(next$)',
    '<THIRD_PARTY_MODULES>',
    '',
    '^types$',
    '^@/types/(.*)$',
    '^@/config/(.*)$',
    '^@/lib/(.*)$',
    '^@/hooks/(.*)$',
    '^@/components/ui/(.*)$',
    '^@/components/(.*)$',
    '^@/registry/(.*)$',
    '^@/styles/(.*)$',
    '^@/app/(.*)$',
    '',
    '^[./]',
  ],
}

export default config
