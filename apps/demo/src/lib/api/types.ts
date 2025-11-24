// API 响应包装类型
export interface ApiResponse<T = unknown> {
  data: T
  message?: string
  code?: number
}
