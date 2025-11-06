'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { AuthApi } from '@/lib/api'
import { setAxiosAuth } from '@/lib/auth/utils'
import { useAuthStore } from '@/lib/store/stores/auth'

export const useLogin = () => {
  const { setAuth } = useAuthStore((state) => state)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: AuthApi.login,
    onSuccess: (data) => {
      setAxiosAuth(data.accessToken)
      setAuth(data.accessToken)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
