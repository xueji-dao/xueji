'use client'

import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => {
    // eslint-disable-next-line @tanstack/query/stable-query-client
    const client = new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 5 * 60 * 1000, // 5分钟内数据视为新鲜
          gcTime: 10 * 60 * 1000, // 10分钟后清理缓存
          retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
          refetchOnWindowFocus: false,
          refetchOnReconnect: true,
          // 全局特殊处理：401 错误不重试
          retry: (failureCount, error: any) => {
            if (error?.status === 401) return false
            return failureCount < 3
          },
        },
        mutations: {
          retry: 1,
          retryDelay: 1000,
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
