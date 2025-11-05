'use client'

import { useQuery } from '@tanstack/react-query'

import { useAuthStore } from '@/lib/store/stores/auth'

// TODO: 实现权限 API
// import { PermissionApi } from '@/lib/api'

export const usePermission = () => {
  const { isAuthenticated } = useAuthStore((state) => state)

  const { data: authData, isLoading } = useQuery({
    queryKey: ['auth', 'permissions'],
    queryFn: async () => {
      // TODO: 实现权限查询 API
      // return PermissionApi.fetchPermissions()
      return { permissions: [], roles: [] }
    },
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000, // 5分钟缓存
  })

  return {
    // 权限数据
    permissions: authData?.permissions || [],
    roles: authData?.roles || [],
    isLoading,

    // 权限检查方法
    hasPermission: (permission: string) => {
      const permissions = authData?.permissions
      if (!permissions) return false
      if (permissions.includes('*')) return true // 超级管理员
      return permissions.includes(permission)
    },
    hasRole: (role: string) => authData?.roles?.includes(role) ?? false,
    hasAnyRole: (roles: string[]) => roles.some((role) => authData?.roles?.includes(role)) ?? false,
  }
}