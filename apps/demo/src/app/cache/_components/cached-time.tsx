'use cache'

export async function CachedTime() {
  const time = new Date().toISOString()

  return (
    <div className="rounded-lg border bg-blue-50 p-4">
      <h3 className="font-semibold text-blue-800">缓存时间组件</h3>
      <p className="text-sm text-gray-600">生成时间: {time}</p>
      <p className="mt-2 text-xs text-gray-500">此组件使用 &quot;use cache&quot; 指令，时间会被缓存</p>
    </div>
  )
}
