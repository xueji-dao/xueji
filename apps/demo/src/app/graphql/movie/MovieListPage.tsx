'use client'

import Link from 'next/link'
// import { gql, useQuery } from '@apollo/client'
import { useQuery } from '@tanstack/react-query'

import { graphql } from '@/lib/graphql/movie'

import type { Movies } from '../../../types'

const GET_MOVIES = graphql`
  query GetMovies {
    allMovies {
      title
      tagline
      released
      actors {
        name
      }
      directors {
        name
      }
    }
  }
`

export default function Page() {
  const { isLoading: loading, error, data } = useQuery<{ movies: Movies }>(GET_MOVIES)

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  if (error)
    return <div className="flex min-h-screen items-center justify-center text-red-500">Error! {error.message}</div>

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-2 py-8">
      <main className="w-full max-w-7xl">
        <div className="mb-6 text-center">
          <p className="text-lg">
            <strong>Movies</strong> Neo4j example dataset.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-3 py-2 text-left">#</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Movie Title</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Released</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Tagline</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Directed</th>
                <th className="border border-gray-300 px-3 py-2 text-left">Actors</th>
              </tr>
            </thead>
            <tbody>
              {data?.movies.map((movie, index) => (
                <tr key={movie.title} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-3 py-2 font-medium">{index + 1}</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <Link
                      href={`/demo/movie/${encodeURIComponent(movie.title || '')}`}
                      className="text-blue-600 underline hover:text-blue-800">
                      {movie.title}
                    </Link>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">{movie.released}</td>
                  <td className="border border-gray-300 px-3 py-2">{movie.tagline}</td>
                  <td className="border border-gray-300 px-3 py-2">
                    <ul className="space-y-1">
                      {movie?.directors?.map((director) => (
                        <li key={director.name} className="text-sm">
                          {director.name}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-300 px-3 py-2">
                    <ul className="space-y-1">
                      {movie?.actors?.map((actor) => (
                        <li key={actor.name} className="text-sm">
                          <Link
                            href={`/demo/movie/actor/${encodeURIComponent(actor.name || '')}`}
                            className="text-blue-600 underline hover:text-blue-800">
                            {actor.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
