'use client'

import Link from 'next/link'
// import { gql, useQuery } from '@apollo/client'
import { useQuery } from '@tanstack/react-query'

import { graphql } from '@/lib/graphql/movie'

import type { Movies } from '../../../../types'

const GET_MOVIE = graphql`
  query GetMovie($movieTitle: String) {
    movies(where: { title: $movieTitle }) {
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

export default function Movie({ title }: { title: string }) {
  const {
    isLoading: loading,
    error,
    data,
  } = useQuery<{ movies: Movies }>(GET_MOVIE, {
    variables: { movieTitle: title },
  })

  if (loading) return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  if (error)
    return <div className="flex min-h-screen items-center justify-center text-red-500">Error! {error.message}</div>
  if (data?.movies.length === 0)
    return <div className="flex min-h-screen items-center justify-center text-gray-500">未找到 {title}</div>

  const movie = data?.movies[0]

  return (
    <div className="mx-auto flex min-h-screen w-4/5 flex-col items-center justify-center px-2">
      <main className="flex w-full flex-col items-center justify-center py-8 text-center">
        <div className="w-full max-w-4xl space-y-6">
          {/* 电影标题 */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">{movie?.title}</h1>
          </div>

          {/* 基本信息 */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Information</h2>
            <div className="space-y-3 text-left">
              <div className="flex flex-wrap">
                <strong className="mr-2 text-gray-700">Tagline:</strong>
                <span className="text-gray-600">{movie?.tagline}</span>
              </div>
              <div className="flex flex-wrap">
                <strong className="mr-2 text-gray-700">Released:</strong>
                <span className="text-gray-600">{movie?.released}</span>
              </div>
            </div>
          </div>

          {/* 演员列表 */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Actors</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
              {movie?.actors?.map((actor) => (
                <div key={actor.name} className="rounded-md bg-gray-50 p-3">
                  <Link
                    href={`/demo/movie/actor/${encodeURIComponent(actor.name || '')}`}
                    className="text-blue-600 underline hover:text-blue-800">
                    {actor.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* 导演列表 */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-bold text-gray-800">Directors</h2>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {movie?.directors?.map((director) => (
                <div key={director.name} className="rounded-md bg-gray-50 p-3 text-gray-700">
                  {director.name}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="mt-8">
          <Link
            href="/demo/movie/"
            className="inline-flex items-center rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700">
            🔙 Back to Movies
          </Link>
        </div>
      </main>
    </div>
  )
}
