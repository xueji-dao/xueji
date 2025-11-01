'use client'

import { useQuery } from '@tanstack/react-query'

import { TestApi } from '@/lib/api'

export default function QueryPage() {
  return <Example />
}

function Example() {
  // 使用默认配置的查询
  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData'],
    queryFn: TestApi.fetchRepoData,
  })

  // 覆盖默认配置的查询示例
  const {
    data: userData,
    refetch: refetchUser,
    isFetching: isUserFetching,
  } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const response = await fetch('https://api.github.com/user')
      return await response.json()
    },
    gcTime: 1000 * 60 * 10, // 覆盖默认的 24 小时，设为 10 分钟
    staleTime: 1000 * 30, // 覆盖默认的 5 分钟，设为 30 秒
    retry: 1, // 覆盖默认的 3 次重试，设为 1 次
    refetchOnWindowFocus: true, // 覆盖默认的 false，启用窗口聚焦重新请求
    enabled: false, // 禁用自动执行，需要手动触发
  })

  if (isPending) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <div className="space-y-6 p-4">
      {/* 默认配置的查询结果 */}
      <div className="rounded border p-4">
        <h2 className="mb-2 text-lg font-bold">默认配置查询 (TanStack Query)</h2>
        {isPending ? (
          <p>Loading...</p>
        ) : error ? (
          <p>An error has occurred: {error.message}</p>
        ) : (
          <div>
            <h3>{data.full_name}</h3>
            <p>{data.description}</p>
            <div className="mt-2 flex gap-4">
              <strong>👀 {data.subscribers_count}</strong>
              <strong>✨ {data.stargazers_count}</strong>
              <strong>🍴 {data.forks_count}</strong>
            </div>
            <div className="mt-2 text-sm text-gray-500">{isFetching ? 'Updating...' : 'Data loaded'}</div>
          </div>
        )}
      </div>

      {/* 自定义配置的查询结果 */}
      <div className="rounded border p-4">
        <h2 className="mb-2 text-lg font-bold">自定义配置查询 (不自动执行)</h2>
        <p className="mb-3 text-sm text-gray-600">
          此查询使用了自定义配置：gcTime=10分钟, staleTime=30秒, retry=1次, enabled=false
        </p>

        {/* 手动触发按钮 */}
        <button
          onClick={() => refetchUser()}
          disabled={isUserFetching}
          className="mb-3 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50">
          {isUserFetching ? '请求中...' : '手动触发查询'}
        </button>

        <div className="mb-2 text-sm text-gray-600">
          💡 手动触发方式：
          <ul className="mt-1 list-inside list-disc space-y-1">
            <li>
              <code>refetch()</code> - 重新执行查询
            </li>
            <li>
              <code>queryClient.invalidateQueries(['userData'])</code> - 使缓存失效并重新请求
            </li>
            <li>
              <code>queryClient.refetchQueries(['userData'])</code> - 强制重新请求
            </li>
          </ul>
        </div>

        {userData ? (
          <pre className="mt-2 overflow-auto rounded bg-gray-100 p-2 text-xs">{JSON.stringify(userData, null, 2)}</pre>
        ) : (
          <p className="mt-2 text-gray-500">查询已禁用，点击上方按钮手动触发</p>
        )}
      </div>
    </div>
  )
}
