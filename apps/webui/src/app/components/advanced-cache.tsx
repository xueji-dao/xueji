'use cache'

import { cacheLife, cacheTag } from 'next/cache'

export async function AdvancedCache({ userId }: { userId: string }) {
  // 设置缓存生命周期为 5 分钟
  cacheLife('minutes')

  // 添加缓存标签用于精确失效
  cacheTag(`user-${userId}`)

  // 模拟数据获取
  const userData = await fetchUserData(userId)

  return (
    <div className="rounded-lg border bg-purple-50 p-4">
      <h3 className="font-semibold text-purple-800">高级缓存组件</h3>
      <p className="mb-2 text-sm text-gray-600">用户 ID: {userId}</p>
      <p className="mb-2 text-sm text-gray-600">数据: {userData.name}</p>
      <div className="space-y-1 text-xs text-gray-500">
        <p>• 缓存生命周期: 5 分钟</p>
        <p>• 缓存标签: user-{userId}</p>
        <p>• 生成时间: {userData.timestamp}</p>
      </div>
    </div>
  )
}

async function fetchUserData(userId: string) {
  // 模拟 API 调用延迟
  await new Promise((resolve) => setTimeout(resolve, 100))

  return {
    name: `用户 ${userId}`,
    timestamp: new Date().toISOString(),
  }
}
