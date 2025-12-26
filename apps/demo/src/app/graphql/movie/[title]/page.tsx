import Link from 'next/link'

import MoviePage from './MoviePage'

interface ParamsType {
  params: Promise<{ title: string }>
}
export default async function Page({ params }: ParamsType) {
  const { title } = await params
  const decodedTitle = decodeURIComponent(title)
  return (
    <>
      <MoviePage title={decodedTitle} />
      <div className="text-2xl">
        <Link href="/graphql/movie" className="text-2xl">
          🔙 Go Back
        </Link>
      </div>
    </>
  )
}
