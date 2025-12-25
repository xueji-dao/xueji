import axios from 'axios'

import { clearAxiosAuth, setAxiosAuth } from '@/lib/auth/utils'
import { useAuthStore } from '@/lib/store/stores/auth'

import { Endpoints } from './index'

// Java 后端 API
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080',
  timeout: 10000,
})

/**
 * 通用 fetcher 函数 - 备选方案
 */
// export const fetcher = async <T = unknown>(args: string | [string, AxiosRequestConfig]): Promise<T> => {
//   const [url, config] = Array.isArray(args) ? args : [args, {}]
//   const res = await api.get<T>(url, config)
//   return res.data
// }

// Token 刷新队列
let isRefreshing = false
let requestQueue: Array<(token: string) => void> = []

// 认证头通过全局设置，无需请求拦截器
// 外部 api 响应拦截器 - 自动 token 刷新
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // 如果正在刷新，将请求加入队列
        return new Promise((resolve) => {
          requestQueue.push((token: string) => {
            originalRequest.headers.Authorization = `Bearer ${token}`
            resolve(api(originalRequest))
          })
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        // 尝试刷新 token
        const response = await fetch(Endpoints.auth.refresh, {
          method: 'POST',
          credentials: 'include',
        })

        if (response.ok) {
          const data = await response.json()
          const { accessToken } = data

          // 更新 store 和 axios 头
          useAuthStore.getState().setAuth(accessToken)
          setAxiosAuth(accessToken)

          // 处理队列中的请求
          requestQueue.forEach((callback) => callback(accessToken))
          requestQueue = []

          // 重试原始请求
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        } else {
          // 刷新失败，清除认证状态
          useAuthStore.getState().clearAuth()
          clearAxiosAuth()
          requestQueue.forEach((callback) => callback(''))
          requestQueue = []

          // 重定向到登录页
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }

          const errorData = error.response?.data || { error: 'Authentication failed' }
          return Promise.reject(errorData)
        }
      } catch (refreshError) {
        // 刷新异常，清除认证状态
        useAuthStore.getState().clearAuth()
        clearAxiosAuth()
        requestQueue.forEach((callback) => callback(''))
        requestQueue = []
        const errorData = { error: (refreshError as Error)?.message || 'Token refresh failed' }
        return Promise.reject(errorData)
      } finally {
        isRefreshing = false
      }
    }

    // 统一错误格式
    const errorData = error.response?.data || { error: error.message || 'Request failed' }
    return Promise.reject(errorData)
  },
)

export default api
