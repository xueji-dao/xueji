import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'https://swapi-graphql.netlify.app/graphql', //'./src/lib/graphql/schema.graphql',
  documents: ['src/**/*.{ts,tsx}'],
  ignoreNoDocuments: true,
  generates: {
    './src/lib/graphql/codegen/': {
      preset: 'client',
      config: {
        documentMode: 'string',
      },
    },
    './src/lib/graphql/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
}

export default config
