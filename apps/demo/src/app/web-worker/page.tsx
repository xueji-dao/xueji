'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Web Worker 示例页面
 *
 * 演示如何在 Next.js 16 中使用 Web Worker 进行后台计算，
 * 避免阻塞主线程的用户界面。
 */
export default function WebWorkerDemo() {
  const workerRef = useRef<Worker | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)
  const [result, setResult] = useState<number | null>(null)
  const [iterations, setIterations] = useState(100000)

  useEffect(() => {
    // 打印 import.meta.url 的值，用于理解其工作原理
    console.log('当前模块 URL:', import.meta.url)
    console.log('Worker URL:', new URL('./worker.ts', import.meta.url).href)

    workerRef.current = new Worker(new URL('./worker.ts', import.meta.url))

    // 监听 Worker 返回的消息
    workerRef.current.onmessage = (event: MessageEvent<number>) => {
      console.log('收到 Worker 返回的结果:', event.data)
      setResult(event.data)
      setIsCalculating(false)
    }

    // 监听 Worker 错误
    workerRef.current.onerror = (error) => {
      console.error('Worker error:', error)
      setIsCalculating(false)
    }

    // 清理函数：组件卸载时终止 Worker
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  /**
   * 启动 PI 计算
   * 将计算任务发送给 Web Worker，避免阻塞主线程
   */
  const handleCalculatePI = useCallback(() => {
    if (!workerRef.current || isCalculating) return

    setIsCalculating(true)
    setResult(null)

    console.log('发送消息给 Worker:', iterations)

    // 向 Worker 发送消息，传递迭代次数
    workerRef.current.postMessage(iterations)
  }, [iterations, isCalculating])

  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-2xl font-bold">Web Worker 示例</h1>

      <div className="mb-6 rounded-lg bg-blue-50 p-4">
        <h2 className="mb-2 font-semibold">什么是 Web Worker？</h2>
        <p className="mb-2 text-sm text-gray-700">
          Web Worker 允许在后台线程中运行 JavaScript，不会阻塞主线程的 UI 渲染。 适用于 CPU
          密集型计算，如数学运算、图像处理、数据解析等。
        </p>
        <p className="mb-2 text-sm text-gray-700">
          本示例使用莱布尼茨级数计算 π 值，演示如何在不冻结界面的情况下进行复杂计算。
        </p>
        <div className="mt-3 rounded border-l-4 border-blue-400 bg-white p-2">
          <p className="text-xs text-gray-600">
            <strong>import.meta.url 解释：</strong>
            <br />
            • 获取当前模块的完整 URL 路径
            <br />
            • 用于相对路径解析，确保 Worker 文件正确加载
            <br />
            • 在 Next.js 中会被自动处理和优化
            <br />• 查看控制台可以看到实际的 URL 值
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium">迭代次数 (影响计算精度和耗时):</label>
          <input
            type="number"
            value={iterations}
            onChange={(e) => setIterations(Number(e.target.value))}
            className="w-32 rounded border px-3 py-2"
            min="1000"
            max="10000000"
            step="1000"
            disabled={isCalculating}
          />
        </div>

        <button
          onClick={handleCalculatePI}
          disabled={isCalculating}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50">
          {isCalculating ? '计算中...' : '计算 π 值'}
        </button>

        {result !== null && (
          <div className="rounded-lg bg-green-50 p-4">
            <h3 className="font-semibold">计算结果:</h3>
            <p className="font-mono text-lg">{result}</p>
            <p className="text-sm text-gray-600">实际 π 值: {Math.PI}</p>
            <p className="text-sm text-gray-600">误差: {Math.abs(result - Math.PI).toFixed(8)}</p>
          </div>
        )}

        {isCalculating && (
          <div className="rounded-lg bg-yellow-50 p-4">
            <p className="text-sm">💡 注意：计算正在后台进行，您仍然可以与页面交互！</p>
          </div>
        )}
      </div>

      <div className="mt-8 rounded-lg bg-gray-50 p-4">
        <h3 className="mb-2 font-semibold">技术实现说明:</h3>
        <div className="space-y-2 text-sm">
          <div>
            <strong>Worker 创建:</strong>
            <code className="ml-1 rounded bg-gray-200 px-1 text-xs">
              new Worker(new URL('./worker.ts', import.meta.url))
            </code>
          </div>
          <div>
            <strong>消息通信:</strong> 主线程通过 postMessage 发送数据，Worker 通过 onmessage 接收
          </div>
          <div>
            <strong>模块支持:</strong> Worker 可以使用 import 导入其他模块
          </div>
          <div>
            <strong>类型安全:</strong> 完整的 TypeScript 支持
          </div>
        </div>
      </div>
    </div>
  )
}
