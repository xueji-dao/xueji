'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { UserApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store/stores/auth'

export const usePermission = () => {
  const { isAuthenticated } = useAuthStore((state) => state)
  const queryClient = useQueryClient()

  const { data: authData, isLoading } = useQuery({
    queryKey: ['user', 'permissions'],
    queryFn: UserApi.fetchUserPermissions,
    enabled: isAuthenticated,
    staleTime: 10 * 60 * 1000,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401 || error?.status === 401) {
        queryClient.removeQueries({ queryKey: ['user'] })
        return false
      }
      return failureCount < 3
    },
  })

  return {
    // 权限数据
    permissions: authData?.permissions || [],
    roles: authData?.roles || [],
    isLoading,

    // 权限检查方法
    hasPermission: (permission: string) => {
      if (!isAuthenticated) return false // 未认证用户无权限
      const permissions = authData?.permissions
      if (!permissions) return false
      if (permissions.includes('*')) return true // 超级管理员
      return permissions.includes(permission)
    },
    hasRole: (role: string) => isAuthenticated && (authData?.roles?.includes(role) ?? false),
    hasAnyRole: (roles: string[]) =>
      isAuthenticated && (roles.some((role) => authData?.roles?.includes(role)) ?? false),
  }
}
