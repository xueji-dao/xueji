import { createStore } from 'zustand/vanilla'

// Zustand 使用方式对比：
//
// 1. 全局 Store 模式 (auth.ts):
//    - 使用 create() 创建全局单例 store
//    - 直接导出 useAuthStore hook
//    - 适用场景：全局状态（用户认证、主题设置等）
//    - 优势：简单直接，无需 Provider
//    - SSR 支持：❌ 有限，容易出现水合不匹配
//    - 示例：export const useAuthStore = create()(...)
//
// 2. Context-based Store 模式 (clock.ts + provider):
//    - 使用 createStore() 创建 vanilla store 工厂函数
//    - 通过 Context Provider 传递 store 实例
//    - 适用场景：多实例状态、需要初始化参数的状态
//    - 优势：支持多实例、作用域隔离、内存管理
//    - SSR 支持：✅ 良好，可在服务端初始化状态
//    - 示例：export const createClockStore = (preloadedState) => createStore()(...)
//
// SSR 注意事项：
// - 全局模式：服务端和客户端共享同一个 store 实例，容易造成状态污染
// - Context 模式：每个请求创建独立 store，避免状态泄漏
// - 建议：SSR 应用优先使用 Context 模式，或配合 persist 中间件处理水合
//
// 选择原则：
// - 全局单例状态 + 无 SSR → 使用模式1（auth）
// - 多实例/参数化状态 → 使用模式2（clock）
// - 路由级状态 → 使用模式2，便于按需加载和内存释放
// - SSR 应用 → 优先使用模式2

export type ClockState = {
  lastUpdate: number
  light: boolean
}

export type ClockActions = {
  tick: (lastUpdate: number) => void
}

export type ClockStore = ClockState & ClockActions

const getDefaultInitialState = (): ClockState => ({
  lastUpdate: Date.now(),
  light: false,
})

// Context-based Store 工厂函数
// 支持预加载状态，每次调用创建新的 store 实例
export const createClockStore = (preloadedState?: Partial<ClockState>) => {
  return createStore<ClockStore>()((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    tick: (lastUpdate: number) =>
      set({
        lastUpdate,
        light: !get().light,
      }),
  }))
}
