/** @type {import('graphql-config').IGraphQLConfig } */
module.exports = {
  projects: {
    swapi: {
      // Star Wars API
      schema: 'https://swapi-graphql.netlify.app/graphql',
      documents: ['src/app/graphql/demo/**/*.{ts,tsx}'],
      extensions: {
        codegen: {
          generates: {
            './src/lib/graphql/codegen/': {
              preset: 'client',
              config: {
                documentMode: 'string',
              },
            },
            './src/lib/graphql/codegen/schema.graphql': {
              plugins: ['schema-ast'],
              config: {
                includeDirectives: true,
              },
            },
          },
        },
      },
    },
    movie: {
      schema: process.env.NEXT_PUBLIC_API_BASE_URL
        ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/graphql`
        : 'http://localhost:8080/graphql',
      documents: ['src/app/graphql/movie/**/*.{ts,tsx}'],
      extensions: {
        codegen: {
          generates: {
            './src/lib/graphql/movie/': {
              preset: 'client',
              config: {
                documentMode: 'string',
              },
            },
            './src/lib/graphql/movie/schema.graphql': {
              plugins: ['schema-ast'],
              config: {
                includeDirectives: true,
              },
            },
          },
        },
      },
    },
  },
}
