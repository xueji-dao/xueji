import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '动态路由',
}

export default function Page() {
  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">动态路由示例</h1>

      <div className="rounded-lg bg-yellow-50 p-4">
        <h3 className="font-semibold text-yellow-800">路由优先级说明:</h3>
        <p className="text-sm text-yellow-700">
          Next.js 路由匹配优先级：静态路由 &gt; 动态路由 [id] &gt; 捕获所有路由 [...slug]
          <br />
          当前：/dynamic/all 被 [id] 捕获（id="all"）
          <br />
          <strong>如果删除 [id] 路由</strong>，/dynamic/all 就会被 all/[...slug] 捕获
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">当前路由结构:</h2>
        <div className="rounded bg-gray-100 p-3 font-mono text-sm">
          <div>/dynamic/ (当前页面)</div>
          <div>├── [id]/ (动态路由，如 /dynamic/123, /dynamic/all)</div>
          <div>└── all/[...slug]/ (捕获子路由，如 /dynamic/all/products)</div>
        </div>
      </div>

      <div className="rounded-lg bg-blue-50 p-4">
        <h3 className="font-semibold text-blue-800">实验提示:</h3>
        <p className="text-sm text-blue-700">
          可以尝试删除 [id] 目录，然后访问 /dynamic/all 看看是否被 all/[...slug] 捕获
        </p>
      </div>

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">导航示例:</h2>

        <div className="flex flex-col gap-2">
          <Link href="/dynamic/all" className="text-blue-600 underline hover:text-blue-800">
            → /dynamic/all (当前被 [id] 捕获，id=all)
          </Link>

          <Link href="/dynamic/all/products" className="text-blue-600 underline hover:text-blue-800">
            → /dynamic/all/products (被 all/[...slug] 捕获)
          </Link>

          <Link href="/dynamic/123" className="text-blue-600 underline hover:text-blue-800">
            → /dynamic/123 (被 [id] 捕获)
          </Link>

          <Link href="/dynamic/user-456" className="text-blue-600 underline hover:text-blue-800">
            → /dynamic/user-456 (被 [id] 捕获)
          </Link>
        </div>
      </div>
    </div>
  )
}
