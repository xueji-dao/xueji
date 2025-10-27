export async function DynamicTime() {
  const time = new Date().toISOString()

  return (
    <div className="rounded-lg border bg-green-50 p-4">
      <h3 className="font-semibold text-green-800">动态时间组件</h3>
      <p className="text-sm text-gray-600">生成时间: {time}</p>
      <p className="mt-2 text-xs text-gray-500">此组件不使用缓存，每次都会重新生成</p>
    </div>
  )
}
