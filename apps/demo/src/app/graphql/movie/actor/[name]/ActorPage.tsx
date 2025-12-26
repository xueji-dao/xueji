'use client'

import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'

import { graphql } from '@/lib/graphql/movie'

import { Actors } from '../../../../../types'

// const GET_ACTOR = graphql`
//   query GetActor($actorName: String) {
//     people(where: { name: $actorName }) {
//       name
//       born
//       movies {
//         title
//       }
//     }
//   }
// `

export default function Actor({ name }: { name: string }) {
  const {
    isLoading: loading,
    error,
    data,
  } = useQuery<{ people: Actors }>(GET_ACTOR, {
    variables: { actorName: name },
  })

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  if (error)
    return <div className="flex min-h-screen items-center justify-center text-red-500">Error! {error.message}</div>

  return (
    <div className="mx-auto flex min-h-screen w-4/5 flex-col items-center justify-center px-2">
      <main className="flex w-full flex-col items-center justify-center py-8 text-center">
        <div className="mb-8 space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Information</h2>
            <div className="text-gray-600">
              <strong>Born: </strong>
              {data?.people[0].born}
            </div>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Movies</h2>
            <div className="space-y-2">
              {data?.people[0]?.movies?.map((movie) => (
                <div key={movie.title}>
                  <Link
                    href={`/demo/movie/${encodeURIComponent(movie.title || '')}`}
                    className="text-blue-600 underline hover:text-blue-800">
                    {movie.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="py-4">
          <Link
            href="/demo/movie/"
            className="inline-flex items-center rounded-md bg-gray-100 px-4 py-2 font-semibold text-gray-700 transition-colors hover:bg-gray-200">
            🔙 Go Back
          </Link>
        </div>
      </main>
    </div>
  )
}
