'use client'

import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { UserApi } from '@/lib/api'
import { isValidToken, setAxiosAuth } from '@/lib/auth/utils'
import { clearAuthData } from '@/lib/auth/utils/clearAuthData'
import { useAuthStore } from '@/lib/store/stores/auth'

import { useLogin } from './useLogin'
import { useLogout } from './useLogout'

export const useAuth = () => {
  const { isAuthenticated, accessToken, isChecking, setChecking } = useAuthStore((state) => state)
  const queryClient = useQueryClient()
  const clearAuthState = useCallback(() => clearAuthData(queryClient), [queryClient])

  const checkAuth = useCallback(async () => {
    console.log('checkAuth', accessToken)
    setChecking(true)

    try {
      if (!accessToken) {
        return { isValid: false, reason: 'no_token' }
      }

      if (!isValidToken(accessToken)) {
        clearAuthData(queryClient)
        return { isValid: false, reason: 'invalid_token' }
      }

      // token 有效，设置 axios 认证头
      setAxiosAuth(accessToken)

      // 强制执行用户查询来验证 token 有效性
      await queryClient.fetchQuery({
        queryKey: ['user', 'me'],
        queryFn: UserApi.fetchUser,
        staleTime: 0, // 强制重新查询
      })
      return { isValid: true }
    } catch {
      clearAuthData(queryClient)
      return { isValid: false, reason: 'server_rejected' }
    } finally {
      setChecking(false)
    }
  }, [accessToken, queryClient, setChecking])

  const loginMutation = useLogin()
  const logoutMutation = useLogout()

  // 用户信息和权限需要单独使用 useUserQuery 和 usePermission
  return {
    // 认证状态
    isAuthenticated,
    accessToken,

    login: loginMutation.mutate,
    logout: logoutMutation.mutate,

    checkAuth, // 暴露给 AuthGuard 使用
    clearAuthState, // 暴露给全局错误处理等使用

    // 状态
    isChecking,
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
  }
}
