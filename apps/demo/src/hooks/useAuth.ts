import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useApolloClient } from '@apollo/client/react'

import { useUserStore } from '@/lib/store/providers'

export function useAuth() {
  const router = useRouter()
  const user = useUserStore((state) => state.user)
  const isLoading = useUserStore((state) => state.isLoading)
  const setUser = useUserStore((state) => state.setUser)
  const setLoading = useUserStore((state) => state.setLoading)
  const clearUser = useUserStore((state) => state.clearUser)
  const client = useApolloClient()

  // 检查认证状态
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/me') // 走代理，自动处理 token 刷新
      if (response.ok) {
        const userData = await response.json()
        setUser(userData)
      } else {
        clearUser()
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      clearUser()
    } finally {
      setLoading(false)
    }
  }, [setLoading, setUser, clearUser])

  // 退出登录
  const logout = async () => {
    try {
      await client.resetStore()
      await fetch('/api/auth/logout', { method: 'POST' })
      document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
      clearUser()
      router.push('/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  // 初始化时检查认证
  useEffect(() => {
    if (!user && !isLoading) {
      checkAuth()
    }
  }, [user, isLoading, checkAuth])

  return {
    data: user ? { user } : null,
    status: isLoading ? 'loading' : user ? 'authenticated' : 'unauthenticated',
    user,
    isLoading,
    isAuthenticated: !!user,
    logout,
    refresh: checkAuth,
  }
}
