import { Suspense } from 'react'

import { AdvancedCache } from '../components/advanced-cache'
import { CacheControls } from '../components/cache-controls'
import { CachedTime } from '../components/cached-time'
import { DynamicTime } from '../components/dynamic-time'

export default function CacheDemoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-8 text-center text-3xl font-bold">Cache Components 完整演示</h1>

        <div className="grid gap-6">
          <section>
            <h2 className="mb-4 text-xl font-semibold">基础缓存对比</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Suspense fallback={<LoadingCard />}>
                <CachedTime />
              </Suspense>

              <Suspense fallback={<LoadingCard />}>
                <DynamicTime />
              </Suspense>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">高级缓存功能</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Suspense fallback={<LoadingCard />}>
                <AdvancedCache userId="123" />
              </Suspense>

              <Suspense fallback={<LoadingCard />}>
                <AdvancedCache userId="456" />
              </Suspense>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">缓存控制</h2>
            <CacheControls />
          </section>

          <section className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="mb-4 text-xl font-semibold">缓存说明</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div>
                <strong className="text-blue-600">基础缓存 ('use cache'):</strong>
                <p>组件输出会被缓存，相同的组件调用会返回缓存结果</p>
              </div>
              <div>
                <strong className="text-purple-600">高级缓存 (cacheLife + cacheTag):</strong>
                <p>可以设置缓存过期时间和标签，支持精确的缓存失效控制</p>
              </div>
              <div>
                <strong className="text-green-600">动态组件:</strong>
                <p>不使用缓存，每次渲染都会重新执行</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

function LoadingCard() {
  return (
    <div className="animate-pulse rounded-lg border bg-gray-100 p-4">
      <div className="mb-2 h-4 rounded bg-gray-300"></div>
      <div className="mb-1 h-3 rounded bg-gray-300"></div>
      <div className="h-3 w-3/4 rounded bg-gray-300"></div>
    </div>
  )
}
