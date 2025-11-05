'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import { Endpoints } from '@/lib/api'
import { setAxiosAuth } from '@/lib/auth/utils'
import { useAuthStore } from '@/lib/store/stores/auth'

export const useLogin = () => {
  const { setAuth } = useAuthStore((state) => state)
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (credentials: { email: string; password: string }) => {
      const response = await fetch(Endpoints.auth.signIn, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      return response.json()
    },
    onSuccess: (data) => {
      setAxiosAuth(data.accessToken)
      setAuth(data.accessToken)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
