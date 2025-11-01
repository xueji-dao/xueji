'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { useUserStore } from '@/lib/store/providers'

export function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const isLoading = useUserStore((state) => state.isLoading)
  const setUser = useUserStore((state) => state.setUser)
  const setAccessToken = useUserStore((state) => state.setAccessToken)
  const setLoading = useUserStore((state) => state.setLoading)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (response.ok) {
        if (data.user) {
          setUser(data.user)
        }

        if (data.accessToken) {
          setAccessToken(data.accessToken)
        }

        // 跳转
        router.push('/dashboard')
      } else {
        alert('登录失败：' + (data.error || '未知错误'))
      }
    } catch (error) {
      alert('登录失败：网络错误')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleLogin} className="mx-auto max-w-md space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">邮箱</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>
      <div>
        <label className="mb-1 block text-sm font-medium">密码</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-md bg-blue-600 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
        {isLoading ? '登录中...' : '登录'}
      </button>
    </form>
  )
}
