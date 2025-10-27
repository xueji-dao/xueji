'use client'

import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-4">
      <h2 className="text-lg font-semibold text-red-800">出错了</h2>
      <pre className="mt-2 text-sm text-red-600">{error.message}</pre>
      <button onClick={resetErrorBoundary} className="mt-3 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
        重试
      </button>
    </div>
  )
}

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
}
