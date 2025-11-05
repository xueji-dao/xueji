'use client'

import type { QueryClient } from '@tanstack/react-query'

import { useAuthStore } from '@/lib/store/stores/auth'

import { clearAxiosAuth } from './index'

/**
 * 清理认证状态和查询缓存的工具函数
 * @param queryClient - React Query 客户端实例
 */
export const clearAuthData = (queryClient: QueryClient) => {
  useAuthStore.getState().clearAuth()
  clearAxiosAuth()
  queryClient.removeQueries({ queryKey: ['user'] })
}
