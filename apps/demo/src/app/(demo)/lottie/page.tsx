'use client'

import { useState } from 'react'

import { LottieIcon } from './LottieIcon'

export default function LottiePage() {
  const [isPlaying, setIsPlaying] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Lottie 动画示例</h1>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">控制</h2>
            <div className="mb-4 flex justify-center">
              <LottieIcon name="lupuorrc" width={150} height={150} loop={true} autoplay={isPlaying} />
            </div>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-full rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600">
              {isPlaying ? '暂停' : '播放'}
            </button>
          </div>

          {/* 鼠标悬停播放 */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">鼠标悬停播放</h2>
            <div className="mb-4 flex justify-center">
              <LottieIcon name="lupuorrc" width={150} height={150} loop={false} playOnHover={true} />
            </div>
            <p className="text-sm text-gray-600">鼠标悬停时播放，离开时暂停</p>
          </div>

          {/* 不同尺寸示例 */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">不同尺寸</h2>
            <div className="flex items-center justify-around">
              <LottieIcon name="lupuorrc" width={50} height={50} />
              <LottieIcon name="lupuorrc" width={100} height={100} />
              <LottieIcon name="lupuorrc" width={150} height={150} />
            </div>
          </div>

          {/* 不同渲染器示例 */}
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold">渲染器对比</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-16 text-sm">SVG:</span>
                <LottieIcon name="lupuorrc" width={80} height={80} renderer="svg" />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-16 text-sm">Canvas:</span>
                <LottieIcon name="lupuorrc" width={80} height={80} renderer="canvas" />
              </div>
            </div>
          </div>
        </div>

        {/* 使用说明 */}
        <div className="mt-8 rounded-lg bg-white p-6 shadow-md">
          <h2 className="mb-4 text-xl font-semibold">使用说明</h2>
          <div className="prose max-w-none">
            <h3>Props 参数</h3>
            <ul>
              <li>
                <code>animationData</code> - 动画数据对象（与 path 二选一）
              </li>
              <li>
                <code>name</code> - 动画文件名（与 animationData 二选一）
              </li>
              <li>
                <code>width/height</code> - 容器尺寸，默认 300
              </li>
              <li>
                <code>loop</code> - 是否循环播放，默认 true
              </li>
              <li>
                <code>autoplay</code> - 是否自动播放，默认 true
              </li>
              <li>
                <code>renderer</code> - 渲染器类型：svg/canvas/html，默认 svg
              </li>
              <li>
                <code>onComplete</code> - 动画完成回调
              </li>
              <li>
                <code>playOnHover</code> - 鼠标悬停时播放，默认 false
              </li>
              <li>
                <code>onComplete</code> - 动画完成回调
              </li>
              <li>
                <code>onLoopComplete</code> - 循环完成回调
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
