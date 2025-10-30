'use client'

import { useState } from 'react'

import { UIContext } from '@/lib/context'

interface GlobalStateProps {
  children: React.ReactNode
}

// createContext 基本流程:
// 1. createContext() - 创建 Context 对象，定义默认值
// 2. Provider 组件 - 提供状态值，包装需要共享状态的组件树
// 3. useContext() - 在子组件中消费 Context 值
export const GlobalState = ({ children }: GlobalStateProps) => {
  // 创建本地状态，将通过 Context 共享给子组件
  const [isDemo, setIsDemo] = useState<boolean | null>(true)

  return (
    // Provider 向下传递状态值和更新函数
    <UIContext.Provider
      value={{
        isDemo, // 当前状态值
        setIsDemo, // 状态更新函数
      }}>
      {children} {/* 所有子组件都能访问 Context 值 */}
    </UIContext.Provider>
  )
}
