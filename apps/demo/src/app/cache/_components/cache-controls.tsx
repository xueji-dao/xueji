'use client'

import { useState } from 'react'

export function CacheControls() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const invalidateCache = async (tag: string) => {
    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/public/cache/invalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tag }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage(`✅ ${data.message}`)
        // 刷新页面以显示更新后的内容
        setTimeout(() => window.location.reload(), 1000)
      } else {
        setMessage(`❌ ${data.error}`)
      }
    } catch (error) {
      setMessage(`❌ 请求失败: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">缓存控制</h3>

      <div className="space-y-3">
        <div className="flex gap-2">
          <button
            onClick={() => invalidateCache('user-123')}
            disabled={loading}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50">
            清除用户 123 缓存
          </button>

          <button
            onClick={() => invalidateCache('user-456')}
            disabled={loading}
            className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-50">
            清除用户 456 缓存
          </button>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
          刷新页面
        </button>
      </div>

      {message && <div className="mt-4 rounded bg-gray-100 p-3 text-sm">{message}</div>}

      <div className="mt-4 text-xs text-gray-500">
        <p>• 点击&quot;清除缓存&quot;按钮会使特定用户的缓存失效</p>
        <p>• 页面会自动刷新以显示更新后的时间戳</p>
      </div>
    </div>
  )
}
