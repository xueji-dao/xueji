'use client'

import { useState } from 'react'

export function ErrorTestComponent() {
  const [shouldError, setShouldError] = useState(false)

  if (shouldError) {
    throw new Error('测试错误：这是一个故意抛出的错误用于测试 ErrorBoundary')
  }

  return (
    <div className="mb-4 rounded border bg-yellow-50 p-4">
      <h3 className="font-semibold">ErrorBoundary 测试</h3>
      <p className="mt-1 text-sm text-gray-600">点击按钮触发错误，测试 ErrorBoundary 功能</p>
      <button
        onClick={() => setShouldError(true)}
        className="mt-2 rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600">
        触发错误
      </button>
    </div>
  )
}
