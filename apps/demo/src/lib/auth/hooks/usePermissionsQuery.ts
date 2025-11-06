'use client'

import { useQuery, useQueryClient } from '@tanstack/react-query'

import { UserApi } from '@/lib/api'
import { useAuthStore } from '@/lib/store/stores/auth'

export const usePermissionsQuery = () => {
  const { isAuthenticated } = useAuthStore((state) => state)
  const queryClient = useQueryClient()

  return useQuery({
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
}
