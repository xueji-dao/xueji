import type { CodegenConfig } from '@graphql-codegen/cli'

// 主配置文件 - 默认使用 Star Wars API
const config: CodegenConfig = {
  schema: 'https://swapi-graphql.netlify.app/graphql',
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
