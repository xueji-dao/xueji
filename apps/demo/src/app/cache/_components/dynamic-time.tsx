import { headers } from 'next/headers'

export async function DynamicTime() {
  // 访问当前时间之前先读取了请求头数据，符合 Next.js 16 的服务端组件要求
  await headers()
  const time = new Date().toISOString()

  return (
    <div className="rounded-lg border bg-green-50 p-4">
      <h3 className="font-semibold text-green-800">动态时间组件</h3>
      <p className="text-sm text-gray-600">生成时间: {time}</p>
      <p className="mt-2 text-xs text-gray-500">此组件不使用缓存，每次都会重新生成</p>
    </div>
  )
}
