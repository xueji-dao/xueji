'use client'

import { useCallback } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { clearAxiosAuth, isValidToken, setAxiosAuth } from '@/lib/auth/utils'
import { useAuthStore } from '@/lib/store/stores/auth'

import { useLogin } from './useLogin'
import { useLogout } from './useLogout'
import { useUserQuery } from './useUserQuery'

// TODO 拆分
export const useAuth = () => {
  const { isAuthenticated, accessToken, setAuth, clearAuth } = useAuthStore((state) => state)
  const queryClient = useQueryClient()

  const { data: user, isLoading: isUserLoading } = useUserQuery()

  // TODO
  // const { data: authData, isLoading: isPermissionsLoading } = usePermissionsQuery()

  const checkAuth = useCallback(() => {
    console.log('checkAuth', accessToken)
    if (accessToken && isValidToken(accessToken)) {
      // token 有效，设置 axios 认证头
      setAxiosAuth(accessToken)
    } else if (accessToken) {
      // token 存在但无效，清理状态
      clearAuth()
      clearAxiosAuth()
      queryClient.removeQueries({ queryKey: ['user'] }) // 只清除用户相关缓存
    }
    // 没有 token 时什么都不做
  }, [accessToken, clearAuth, queryClient])

  const loginMutation = useLogin()
  const logoutMutation = useLogout()

  return {
    // 认证状态
    isAuthenticated,
    accessToken,

    // 用户信息
    user,
    // permissions: authData?.permissions || [], // 后台返回的实际权限
    // roles: authData?.roles || [], // 后台返回的角色
    isLoading: isUserLoading, // || isPermissionsLoading,

    // 权限检查方法
    hasPermission: (permission: string) => {
      const permissions = authData?.permissions
      if (!permissions) return false
      if (permissions.includes('*')) return true // 超级管理员
      return permissions.includes(permission)
    },
    hasRole: (role: string) => authData?.roles?.includes(role) ?? false,
    hasAnyRole: (roles: string[]) => roles.some((role) => authData?.roles?.includes(role)) ?? false,

    // 认证操作
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,

    checkAuth, // 暴露给 AuthGuard 使用

    // 操作状态
    isLoggingIn: loginMutation.isPending,
    isLoggingOut: logoutMutation.isPending,
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
  }
}
