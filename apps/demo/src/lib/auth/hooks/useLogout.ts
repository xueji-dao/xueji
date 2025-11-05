'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Endpoints } from '@/lib/api'
import { clearAxiosAuth } from '@/lib/auth/utils'
import { useAuthStore } from '@/lib/store/stores/auth'

export const useLogout = () => {
  const { clearAuth } = useAuthStore((state) => state)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async () => {
      await fetch(Endpoints.auth.logout, {
        method: 'POST',
        credentials: 'include',
      })
    },
    onSettled: () => {
      clearAuth()
      clearAxiosAuth()
      queryClient.removeQueries({ queryKey: ['user'] })
    },
  })
}
