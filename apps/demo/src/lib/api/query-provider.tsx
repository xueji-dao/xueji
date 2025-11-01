'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => {
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          gcTime: 1000 * 60 * 60 * 24, // 24 hours - 垃圾回收时间（数据在内存中保留时间）
          staleTime: 1000 * 60 * 5, // 5 minutes - 数据过期时间（多久后重新请求）
          retry: (failureCount, error: any) => {
            if (error?.status === 401) return false
            return failureCount < 3
          },
          refetchOnWindowFocus: false, // 窗口聚焦时不自动重新请求
          refetchOnReconnect: true, // 网络重连时重新请求
          refetchOnMount: true, // 组件挂载时重新请求
        },
        mutations: {
          retry: 1, // 变更操作失败重试次数
        },
      },
    })

    // 开发环境调试 - 使用 QueryClient 事件监听器
    if (process.env.NODE_ENV === 'development') {
      client.getQueryCache().subscribe((event) => {
        if (event.type === 'updated' && event.query.state.status === 'success') {
          console.log('✅ Query Success:', event.query.queryKey, event.query.state.data)
        }
        if (event.type === 'updated' && event.query.state.status === 'error') {
          console.log('❌ Query Error:', event.query.queryKey, event.query.state.error)
        }
      })

      client.getMutationCache().subscribe((event) => {
        if (event.type === 'updated' && event.mutation.state.status === 'success') {
          console.log('✅ Mutation Success:', event.mutation.state.data)
        }
        if (event.type === 'updated' && event.mutation.state.status === 'error') {
          console.log('❌ Mutation Error:', event.mutation.state.error)
        }
      })
    }

    return client
  })

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
