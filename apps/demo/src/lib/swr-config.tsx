'use client'

import { SWRConfig } from 'swr'

import api from './axios-config'

// 使用 Axios 作为 fetcher（带调试日志）
const fetcher = (url: string) => {
  console.log('🚀 SWR Fetcher called:', url, new Date().toISOString())
  return api.get(url)
}

export function SWRProvider({ children }: { children: React.ReactNode }) {
  return (
    <SWRConfig
      value={{
        fetcher,
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 2000,
        errorRetryCount: 3,
        // 开发环境调试
        ...(process.env.NODE_ENV === 'development' && {
          onSuccess: (data, key) => console.log('✅ SWR Success:', key),
          onError: (error, key) => console.log('❌ SWR Error:', key, error),
        }),
      }}>
      {children}
    </SWRConfig>
  )
}
