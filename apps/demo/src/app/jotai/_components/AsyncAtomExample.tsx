'use client'

import { atom, useAtom } from 'jotai'

/**
 * AsyncAtom vs 普通组件的变化对比：
 *
 * 1. 原子定义变化：
 *    普通: const syncAtom = atom((get) => get(counter) * 5)
 *    异步: const asyncAtom = atom(async (get) => get(counter) * 5)
 *
 * 2. 组件使用变化：
 *    普通: const [value] = useAtom(syncAtom) // 立即获得值
 *    异步: const [value] = useAtom(asyncAtom) // 抛出 Promise，需要 Suspense
 *
 * 3. 渲染行为变化：
 *    普通: 同步渲染，无需额外处理
 *    异步: 首次渲染抛出 Promise → Suspense 捕获 → 显示 fallback → 解析后重新渲染
 *
 * 4. 错误处理变化：
 *    普通: try/catch 或 ErrorBoundary
 *    异步: ErrorBoundary 自动捕获 Promise rejection
 *
 * 5. 依赖更新变化：
 *    普通: 依赖变化 → 立即重新计算 → 立即重新渲染
 *    异步: 依赖变化 → 重新执行异步函数 → 再次进入 Suspense → 解析后渲染
 */

const counter = atom(1)
const asyncAtom = atom(async (get) => get(counter) * 5)

export default function AsyncAtomExample() {
  // 异步原子使用：会抛出 Promise，必须包装在 Suspense 中
  const [asyncCount] = useAtom(asyncAtom)
  return (
    <div className="my-4 w-full rounded border border-green-200 bg-green-50 p-6 dark:border-gray-800 dark:bg-gray-900">
      <h5 className="text-lg font-bold text-gray-900 md:text-xl dark:text-gray-200">Async Atom Example</h5>
      <p className="my-1 text-gray-800 dark:text-gray-300">
        Async atom automatically resolves Promise and integrates with Suspense.
      </p>
      <div className="mt-4">
        <h1 className="text-2xl font-bold text-green-600">{asyncCount}</h1>
      </div>
    </div>
  )
}
