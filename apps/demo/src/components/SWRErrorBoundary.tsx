'use client'

import { ErrorBoundary } from 'react-error-boundary'
import { mutate } from 'swr'

function SWRErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  const handleRetryWithCache = async () => {
    // 清除所有 SWR 缓存并重试
    await mutate(() => true, undefined, { revalidate: true })
    resetErrorBoundary()
  }

  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-4">
      <h3 className="font-semibold text-red-800">数据加载失败</h3>
      <p className="mt-1 text-sm text-red-600">{error.message}</p>
      <div className="mt-3 flex gap-2">
        <button
          onClick={resetErrorBoundary}
          className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700">
          重试
        </button>
        <button
          onClick={handleRetryWithCache}
          className="rounded bg-green-600 px-3 py-1 text-sm text-white hover:bg-green-700">
          清除缓存重试
        </button>
      </div>
    </div>
  )
}

export function SWRErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary FallbackComponent={SWRErrorFallback}>{children}</ErrorBoundary>
}
