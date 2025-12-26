/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  query GetMovies {\n    allMovies {\n      title\n      tagline\n      released\n      actors {\n        person {\n          born\n          name\n        }\n      }\n    }\n  }\n": typeof types.GetMoviesDocument,
    "\n  query GetMovie($movieTitle: String) {\n    movieByTitle(title: $movieTitle) {\n      title\n      tagline\n      released\n      actors {\n        person {\n          born\n          name\n        }\n      }\n    }\n  }\n": typeof types.GetMovieDocument,
};
const documents: Documents = {
    "\n  query GetMovies {\n    allMovies {\n      title\n      tagline\n      released\n      actors {\n        person {\n          born\n          name\n        }\n      }\n    }\n  }\n": types.GetMoviesDocument,
    "\n  query GetMovie($movieTitle: String) {\n    movieByTitle(title: $movieTitle) {\n      title\n      tagline\n      released\n      actors {\n        person {\n          born\n          name\n        }\n      }\n    }\n  }\n": types.GetMovieDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMovies {\n    allMovies {\n      title\n      tagline\n      released\n      actors {\n        person {\n          born\n          name\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').GetMoviesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetMovie($movieTitle: String) {\n    movieByTitle(title: $movieTitle) {\n      title\n      tagline\n      released\n      actors {\n        person {\n          born\n          name\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').GetMovieDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
