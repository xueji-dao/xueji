'use client'

import { ReactNode } from 'react'
import { createStore, Provider } from 'jotai'

// Jotai SSR 支持方式：
// useHydrateAtoms 在具体组件中 (推荐)
// - 在需要的组件中直接调用 useHydrateAtoms
// - 适用：组件级状态，按需初始化
// - 优势：更灵活、就近原则、按需加载
//
// 重要注意：当前文件标记了 'use client'，只在客户端运行不存在服务端请求间状态污染问题，可以安全使用全局 store 实例

// 使用示例：
// const countAtom = atom(0)
// const CounterPage = ({ countFromServer }) => {
//   useHydrateAtoms([[countAtom, countFromServer]])
//   const [count] = useAtom(countAtom) // count would be the value of `countFromServer`, not 0.
// }

interface JotaiProviderProps {
  children: ReactNode
}

// 方式1：全局 store (客户端安全)
const globalStore = createStore()

export function JotaiProvider({ children }: JotaiProviderProps) {
  return <Provider store={globalStore}>{children}</Provider>
}
