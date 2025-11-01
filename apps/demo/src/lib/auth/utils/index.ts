import axios from 'axios'

// Token 验证工具
export const isValidToken = (token: string): boolean => {
  if (!token) {
    return false
  }
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    if (!payload || !('exp' in payload)) {
      return false
    }
    return payload.exp * 1000 > Date.now() // 检查是否过期
  } catch {
    return false
  }
}

// Axios 认证头管理
// 设置全局默认认证头，影响所有 axios 请求：
// 1. 直接使用 axios.get() 等方法
// 2. 通过 axios.create() 创建的实例
// 3. 第三方库使用的 axios 请求
export const setAxiosAuth = (token: string) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`
}

// 清除全局认证头
export const clearAxiosAuth = () => {
  delete axios.defaults.headers.common.Authorization
}
