'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AuthApi } from '@/lib/api'
import { clearAxiosAuth } from '@/lib/auth/utils'
import { useAuthStore } from '@/lib/store/stores/auth'

export const useLogout = () => {
  const { clearAuth } = useAuthStore((state) => state)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: AuthApi.logout,
    onSettled: () => {
      clearAuth()
      clearAxiosAuth()
      queryClient.removeQueries({ queryKey: ['user'] })
    },
  })
}
