'use client'

import { createContext, use, useRef, type PropsWithChildren } from 'react'
import { useStore } from 'zustand'

import { createClockStore, type ClockState, type ClockStore } from '../stores/clock'

// Zustand Store 创建及传递参数流程:
// 1. createClockStore() - 创建 vanilla store 实例
// 2. Context Provider - 通过 React Context 传递 store 实例
// 3. useStore() - 订阅 store 状态变化并返回选中的状态片段

export type ClockStoreApi = ReturnType<typeof createClockStore>

// 创建 Context 用于传递 store 实例
export const ClockStoreContext = createContext<ClockStoreApi | undefined>(undefined)

// Provider 组件：创建并提供 store 实例
export const ClockStoreProvider = ({ children, ...props }: PropsWithChildren<Partial<ClockState>>) => {
  // 使用 useRef 确保 store 实例在组件生命周期内保持稳定
  const storeRef = useRef<ClockStoreApi | null>(null)
  if (storeRef.current === null) {
    // 创建 store 实例，props 作为初始状态传入
    storeRef.current = createClockStore(props)
  }

  // eslint-disable-next-line react-hooks/refs
  return <ClockStoreContext.Provider value={storeRef.current}>{children}</ClockStoreContext.Provider>
}

// 自定义 hook：从 Context 获取 store 并订阅状态
export const useClockStore = <T,>(selector: (store: ClockStore) => T): T => {
  const clockStoreContext = use(ClockStoreContext)

  if (!clockStoreContext) {
    throw new Error(`useClockStore must be used within ClockStoreProvider`)
  }

  // useStore 订阅 store 状态变化，selector 选择需要的状态片段
  return useStore(clockStoreContext, selector)
}

// Provider 使用策略:
// 全局级 (app/layout.tsx) - 用户认证、主题配置等跨应用状态
// 路由级 (app/dashboard/layout.tsx) - 仪表盘模块、(app/orders/layout.tsx) - 订单模块等功能状态
// 页面级 (page.tsx) - 表单状态、列表筛选等临时状态，可直接使用 create() 而非 Provider

// 分离 Provider 的核心优势:
// 1. 按需加载 - 路由级状态随路由懒加载，减少初始包大小
// 2. 内存管理 - 路由切换时自动释放相关状态，避免内存泄漏
// 3. 状态隔离 - 不同模块状态互不影响，提高代码可维护性

// Jotai 适用场景:
// 1. 原子化状态 - 细粒度状态管理，如单个表单字段、开关状态
// 2. 派生状态 - 基于其他 atom 计算的状态，自动依赖追踪和更新
// 3. 异步状态 - 内置 Suspense 支持，处理异步数据获取
// 4. 组件级状态 - 替代 useState，但需要跨组件共享的场景
// 5. 服务端渲染 - 更好的 SSR 支持，状态可序列化

// 选择依据：
// 如果需要细粒度控制和自动依赖追踪，用 Jotai；
// 如果需要模块化和业务逻辑封装，用 Zustand。
