'use client'

import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  // 开发环境显示详细错误信息
  const isDev = process.env.NODE_ENV === 'development'

  return (
    <div className="rounded-lg border border-red-300 bg-red-50 p-4">
      <h2 className="text-lg font-semibold text-red-800">页面出现错误</h2>
      <p className="mt-2 text-sm text-red-600">{isDev ? error.message : '请刷新页面重试，如问题持续请联系技术支持'}</p>
      {isDev && (
        <details className="mt-2">
          <summary className="cursor-pointer text-sm text-red-700">错误详情</summary>
          <pre className="mt-1 overflow-auto text-xs text-red-600">{error.stack}</pre>
        </details>
      )}
      <div className="mt-3 flex gap-2">
        <button onClick={resetErrorBoundary} className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700">
          重试组件
        </button>
        <button
          onClick={() => window.location.reload()}
          className="rounded bg-gray-600 px-4 py-2 text-white hover:bg-gray-700">
          刷新页面
        </button>
        <button
          onClick={() => window.history.back()}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          返回上页
        </button>
      </div>
    </div>
  )
}

// 错误日志记录
function logError(error: Error, errorInfo: any) {
  if (process.env.NODE_ENV === 'production') {
    // 生产环境发送错误到监控服务
    console.error('Error Boundary caught an error:', error, errorInfo)
    // TODO: 发送到 Sentry 或其他错误监控服务
  }
}

export function AppErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback} onError={logError}>
      {children}
    </ErrorBoundary>
  )
}

// 页面级 ErrorBoundary（轻量版）
export function PageErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary
      FallbackComponent={({ error, resetErrorBoundary }) => (
        <div className="p-4 text-center">
          <p className="text-red-600">加载失败</p>
          <button onClick={resetErrorBoundary} className="mt-2 rounded bg-blue-500 px-3 py-1 text-sm text-white">
            重试
          </button>
        </div>
      )}>
      {children}
    </ErrorBoundary>
  )
}
