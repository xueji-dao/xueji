/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Scalar for BigDecimal */
  BigDecimal: { input: any; output: any; }
  /** Scalar for BigInteger */
  BigInteger: { input: any; output: any; }
  /** Scalar for Date */
  Date: { input: any; output: any; }
  /** Scalar for DateTime */
  DateTime: { input: any; output: any; }
};

export type Actor = {
  __typename?: 'Actor';
  person?: Maybe<Person>;
  role?: Maybe<Scalars['String']['output']>;
};

export type CreateMovieInput = {
  /** ISO-8601 */
  released?: InputMaybe<Scalars['DateTime']['input']>;
  tagline?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type Film = {
  __typename?: 'Film';
  director?: Maybe<Scalars['String']['output']>;
  episodeID?: Maybe<Scalars['Int']['output']>;
  heroes?: Maybe<Array<Maybe<Hero>>>;
  /** ISO-8601 */
  releaseDate?: Maybe<Scalars['Date']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

export type Hero = {
  __typename?: 'Hero';
  darkSide?: Maybe<Scalars['Boolean']['output']>;
  episodeIds?: Maybe<Array<Maybe<Scalars['Int']['output']>>>;
  height?: Maybe<Scalars['Float']['output']>;
  lightSaber?: Maybe<LightSaber>;
  mass?: Maybe<Scalars['Int']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  surname?: Maybe<Scalars['String']['output']>;
};

export type HeroInput = {
  darkSide?: InputMaybe<Scalars['Boolean']['input']>;
  episodeIds?: InputMaybe<Array<InputMaybe<Scalars['Int']['input']>>>;
  height?: InputMaybe<Scalars['Float']['input']>;
  lightSaber?: InputMaybe<LightSaber>;
  mass?: InputMaybe<Scalars['Int']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  surname?: InputMaybe<Scalars['String']['input']>;
};

export type Legume = {
  __typename?: 'Legume';
  id?: Maybe<Scalars['BigInteger']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type LegumeInput = {
  id?: InputMaybe<Scalars['BigInteger']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export enum LightSaber {
  Blue = 'BLUE',
  Green = 'GREEN',
  Purple = 'PURPLE',
  Red = 'RED'
}

export type Movie = {
  __typename?: 'Movie';
  actors?: Maybe<Array<Maybe<Actor>>>;
  id?: Maybe<Scalars['BigInteger']['output']>;
  /** ISO-8601 */
  released?: Maybe<Scalars['DateTime']['output']>;
  tagline?: Maybe<Scalars['String']['output']>;
  title?: Maybe<Scalars['String']['output']>;
};

/** Mutation root */
export type Mutation = {
  __typename?: 'Mutation';
  createHero?: Maybe<Hero>;
  createLegume?: Maybe<Legume>;
  /** Create a movie */
  createMovie?: Maybe<Scalars['String']['output']>;
  deleteHero?: Maybe<Hero>;
  deleteLegume?: Maybe<Scalars['Boolean']['output']>;
  /** Delete a movie */
  deleteMovie?: Maybe<Scalars['Boolean']['output']>;
};


/** Mutation root */
export type MutationCreateHeroArgs = {
  hero?: InputMaybe<HeroInput>;
};


/** Mutation root */
export type MutationCreateLegumeArgs = {
  legume?: InputMaybe<LegumeInput>;
};


/** Mutation root */
export type MutationCreateMovieArgs = {
  movie?: InputMaybe<CreateMovieInput>;
};


/** Mutation root */
export type MutationDeleteHeroArgs = {
  id: Scalars['Int']['input'];
};


/** Mutation root */
export type MutationDeleteLegumeArgs = {
  id?: InputMaybe<Scalars['BigInteger']['input']>;
};


/** Mutation root */
export type MutationDeleteMovieArgs = {
  id?: InputMaybe<Scalars['BigInteger']['input']>;
};

/** A person has some information about themselves and maybe played in a movie or is an author and wrote books. */
export type Person = {
  __typename?: 'Person';
  actedIn?: Maybe<Array<Maybe<Movie>>>;
  /** ISO-8601 */
  born?: Maybe<Scalars['DateTime']['output']>;
  name?: Maybe<Scalars['ID']['output']>;
};

/** Query root */
export type Query = {
  __typename?: 'Query';
  /** Get all Films from a galaxy far far away */
  allFilms?: Maybe<Array<Maybe<Film>>>;
  /** Get all Legume */
  allLegume?: Maybe<Array<Maybe<Legume>>>;
  /** Get all Movies */
  allMovies?: Maybe<Array<Maybe<Movie>>>;
  /** Get a Films from a galaxy far far away */
  film?: Maybe<Film>;
  heroesWithSurname?: Maybe<Array<Maybe<Hero>>>;
  legume?: Maybe<Legume>;
  legumesWithName?: Maybe<Legume>;
  /** Get a movie by Id */
  movie?: Maybe<Movie>;
  /** Get a movie by title */
  movieByTitle?: Maybe<Movie>;
  multiMovies?: Maybe<Array<Maybe<Movie>>>;
  /** Say hello */
  sayHello?: Maybe<Scalars['String']['output']>;
};


/** Query root */
export type QueryFilmArgs = {
  filmId: Scalars['Int']['input'];
};


/** Query root */
export type QueryHeroesWithSurnameArgs = {
  surname?: InputMaybe<Scalars['String']['input']>;
};


/** Query root */
export type QueryLegumeArgs = {
  legumeId?: InputMaybe<Scalars['BigInteger']['input']>;
};


/** Query root */
export type QueryLegumesWithNameArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};


/** Query root */
export type QueryMovieArgs = {
  id?: InputMaybe<Scalars['BigInteger']['input']>;
};


/** Query root */
export type QueryMovieByTitleArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};


/** Query root */
export type QuerySayHelloArgs = {
  name?: InputMaybe<Scalars['String']['input']>;
};

/** Subscription root */
export type Subscription = {
  __typename?: 'Subscription';
  heroCreated?: Maybe<Hero>;
  legumeCreated?: Maybe<Legume>;
  movieCreated?: Maybe<Movie>;
};

export type GetMoviesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetMoviesQuery = { __typename?: 'Query', allMovies?: Array<{ __typename?: 'Movie', title?: string | null, tagline?: string | null, released?: any | null, actors?: Array<{ __typename?: 'Actor', person?: { __typename?: 'Person', born?: any | null, name?: string | null } | null } | null> | null } | null> | null };

export type GetMovieQueryVariables = Exact<{
  movieTitle?: InputMaybe<Scalars['String']['input']>;
}>;


export type GetMovieQuery = { __typename?: 'Query', movieByTitle?: { __typename?: 'Movie', title?: string | null, tagline?: string | null, released?: any | null, actors?: Array<{ __typename?: 'Actor', person?: { __typename?: 'Person', born?: any | null, name?: string | null } | null } | null> | null } | null };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: NonNullable<DocumentTypeDecoration<TResult, TVariables>['__apiType']>;
  private value: string;
  public __meta__?: Record<string, any> | undefined;

  constructor(value: string, __meta__?: Record<string, any> | undefined) {
    super(value);
    this.value = value;
    this.__meta__ = __meta__;
  }

  override toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetMoviesDocument = new TypedDocumentString(`
    query GetMovies {
  allMovies {
    title
    tagline
    released
    actors {
      person {
        born
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetMoviesQuery, GetMoviesQueryVariables>;
export const GetMovieDocument = new TypedDocumentString(`
    query GetMovie($movieTitle: String) {
  movieByTitle(title: $movieTitle) {
    title
    tagline
    released
    actors {
      person {
        born
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<GetMovieQuery, GetMovieQueryVariables>;