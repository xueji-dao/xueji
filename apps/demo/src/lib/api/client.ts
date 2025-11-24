import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

/**
 * 默认 Axios 配置
 */
const defaultAxiosConfig = {
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true, // 支持跨域 Cookie
  maxRedirects: 3, // 最大重定向次数
  validateStatus: (status: number) => status >= 200 && status < 300, // 只有 2xx 状态码视为成功
  maxContentLength: 10 * 1024 * 1024, // 10MB 最大响应体大小
  maxBodyLength: 10 * 1024 * 1024, // 10MB 最大请求体大小
} as const

/**
 * 基础 API 客户端
 */
export class ApiClient {
  protected instance: AxiosInstance

  constructor(baseURL: string, timeout = 10000) {
    this.instance = axios.create({
      ...defaultAxiosConfig,
      baseURL,
      timeout,
    })
    this.setupInterceptors()
  }

  protected setupInterceptors() {
    this.instance.interceptors.response.use(
      (response) => response.data,
      (error) => Promise.reject(error),
    )
  }

  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.get(url, config)
  }

  async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.post(url, data, config)
  }

  async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.put(url, data, config)
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.instance.delete(url, config)
  }

  getInstance(): AxiosInstance {
    return this.instance
  }
}

export const nextApi = new ApiClient('/api')
