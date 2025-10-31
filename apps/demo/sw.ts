/**
 * Service Worker 配置
 * 使用 Serwist 提供 PWA 功能：缓存、离线支持、预加载
 */
import { defaultCache } from '@serwist/next/worker'
import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist'
import { Serwist } from 'serwist'

// 声明全局类型，用于 TypeScript 类型检查
// __SW_MANIFEST 会在构建时被实际的预缓存清单替换
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
declare const self: ServiceWorkerGlobalScope

// 创建 Serwist 实例
const serwist = new Serwist({
  // 预缓存条目：构建时生成的静态资源清单
  precacheEntries: self.__SW_MANIFEST,
  // 跳过等待：新 SW 立即激活，不等待旧 SW 停止
  skipWaiting: true,
  // 立即声明控制权：新 SW 立即控制所有客户端
  clientsClaim: true,
  // 导航预加载：在 SW 处理请求的同时预加载页面
  navigationPreload: true,
  // 运行时缓存策略：使用 Next.js 默认缓存配置
  runtimeCaching: defaultCache,
})

// 注册事件监听器：处理 fetch、install、activate 等 SW 事件
serwist.addEventListeners()
