import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full bg-white px-8 py-4 shadow-md">
      <nav className="flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-gray-800 transition-colors hover:text-blue-600">
          Superblog
        </Link>
        <div className="space-x-4">
          <Link href="/prisma/posts" className="text-blue-600 hover:underline">
            Posts
          </Link>
          <Link href="/prisma/posts/new" className="text-blue-600 hover:underline">
            New Post
          </Link>
          <Link
            href="/prisma/users/new"
            className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600">
            New User
          </Link>
        </div>
      </nav>
    </header>
  )
}
