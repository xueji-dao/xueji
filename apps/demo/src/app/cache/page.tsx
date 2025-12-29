import { Suspense } from 'react'

import { lusitana } from '@/styles/fonts'

import { CachedTime } from './_components/cached-time'
import { DynamicTime } from './_components/dynamic-time'

export default function Index() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <div id="welcome" className="mb-8 text-center">
          <h1 className={`${lusitana.className} mb-4 text-4xl font-bold text-blue-600`}>Welcome XueJi 👋</h1>
        </div>

        <div className="mb-8 grid gap-6 md:grid-cols-2">
          <Suspense fallback={<div className="rounded-lg border bg-gray-100 p-4">加载中...</div>}>
            <CachedTime />
          </Suspense>

          <Suspense fallback={<div className="rounded-lg border bg-gray-100 p-4">加载中...</div>}>
            <DynamicTime />
          </Suspense>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-xl font-semibold">环境变量</h2>
          <div className="space-y-2 text-sm">
            <div>服务端环境变量：{process.env.ENV_VARIABLE}</div>
            <div>公共环境变量：{process.env.NEXT_PUBLIC_ENV_VARIABLE}</div>
          </div>
        </div>

        <div className="mt-8 space-y-4 text-center">
          <div className="rounded-lg bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-semibold">演示页面</h3>
            <a
              href="/cache/more"
              className="inline-block rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700">
              查看完整 Cache Components 演示
            </a>
          </div>

          <p className="flex items-center justify-center gap-2 text-gray-500">
            Carefully crafted with
            <svg className="h-3 w-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </p>
        </div>
      </div>
    </div>
  )
}
