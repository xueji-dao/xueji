import Link from 'next/link'

import prisma from '@/lib/prisma'

// Prisma 查询不会自动变成动态，需要显式配置
export const dynamic = 'force-dynamic'

export default async function Home() {
  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    take: 6,
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })

  return (
    <div className="-mt-16 flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="mb-12 text-5xl font-extrabold text-[#333333]">Recent Posts</h1>
      <div className="grid w-full max-w-6xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link key={post.id} href={`/prisma/posts/${post.id}`} className="group">
            <div className="rounded-lg border bg-white p-6 shadow-md transition-shadow duration-300 hover:shadow-lg">
              <h2 className="mb-2 text-2xl font-semibold text-blue-600 group-hover:underline">{post.title}</h2>
              <p className="text-sm text-gray-500">by {post.author ? post.author.name : 'Anonymous'}</p>
              <p className="mb-4 text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
              <div className="relative">
                <p className="line-clamp-2 leading-relaxed text-gray-700">{post.content || 'No content available.'}</p>
                <div className="absolute bottom-0 left-0 h-12 w-full bg-linear-to-t from-gray-50 to-transparent" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
