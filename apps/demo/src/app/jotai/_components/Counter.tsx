'use client'

import { useCallback, useEffect, useState } from 'react'
import { atom, useAtom, useStore } from 'jotai'
import { useAtomCallback } from 'jotai/utils'

// 基础模式：直接创建原子
const counter = atom(0)

// 原子工厂模式：创建可复用的原子组合
// const createCountIncAtoms = (initialValue) => {
//   const baseAtom = atom(initialValue)
//   const valueAtom = atom((get) => get(baseAtom))  // 只读派生原子
//   const incAtom = atom(null, (get, set) => set(baseAtom, (c) => c + 1))  // 只写原子
//   return [valueAtom, incAtom]
// }

// 使用工厂模式：
// const [countValue, incCount] = createCountIncAtoms(0)
// const [count] = useAtom(countValue)
// const [, increment] = useAtom(incCount)

// useAtomCallback 示例：在组件外部读取原子值
const Monitor = () => {
  const [count, setCount] = useState(0)
  const readCount = useAtomCallback(
    useCallback((get) => {
      const currCount = get(counter)
      setCount(currCount)
      return currCount
    }, []),
  )

  useEffect(() => {
    /**
     * setInterval 目的和 useAtomCallback 使用场景：
     *
     * 1. 模拟非 React 环境下读取原子值：
     *    - 定时器、WebSocket 回调、事件监听器等
     *    - 这些场景下无法使用 useAtom hook
     *
     * 2. 不订阅变化，只读取当前值：
     *    - useAtom 会订阅原子变化，触发组件重渲染
     *    - useAtomCallback 只读取，不订阅，不重渲染
     *
     * 3. 实际应用场景：
     *    - 数据同步：定时上报状态到服务器
     *    - 日志记录：定时记录用户行为数据
     *    - 性能监控：定时检查应用状态
     *    - 自动保存：定时保存用户输入到 localStorage
     */
    const timer = setInterval(async () => {
      // 在定时器中读取原子值，模拟非 React 环境
      console.log('Monitor reads count:', readCount())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [readCount])

  return (
    <div className="mt-2 rounded bg-gray-100 p-2 dark:bg-gray-800">
      <small className="text-gray-600 dark:text-gray-400">Monitor (useAtomCallback): {count}</small>
    </div>
  )
}

export function Counter() {
  const [count, setCounter] = useAtom(counter)

  const store = useStore()

  useEffect(() => {
    const unsub = store.sub(counter, () => {
      console.log('Counter changed to:', store.get(counter))
    })
    return unsub
  }, [store])

  const onClick = () => setCounter((c) => c + 1)
  return (
    <div className="rounded border p-4">
      <h1 className="text-2xl font-bold">{count}</h1>
      <button onClick={onClick} className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Click
      </button>
      <Monitor />
    </div>
  )
}
