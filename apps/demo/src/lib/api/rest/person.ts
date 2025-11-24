import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import type { Person, ResponseError } from '@/types/person'
import { nextApi } from '@/lib/api/client'

// 不拆分 API 和 hooks 的原因：
// 1. 缓存策略耦合：mutation 的 onSuccess 需要精确控制相关 query 的缓存失效
// 2. 开发效率：一个文件包含完整的数据层，减少文件跳转和心智负担
// 3. React Query 生态：现代 React 应用的数据获取本身就是 hooks 化的
// 4. 类型安全：queryKey 和 queryFn 在同一文件中，类型推导更准确
// 5. 项目规模：中小型项目过度拆分会增加复杂度而非简化

/**
 * 类型安全策略说明：
 *
 * 1. useQuery<Person, ResponseError> - Query 层类型约束
 *    - Person: 约束 data 的类型，确保组件中 data.name 等属性类型正确
 *    - ResponseError: 约束 error 的类型，确保 error.message 等属性可用
 *
 * 2. nextApi.get<Person>() - API 层类型约束
 *    - 确保 API 调用返回 Promise<Person>
 *    - 与 useQuery 的 Person 类型保持一致
 *    - 提供编译时类型检查，防止 API 响应结构变更时的运行时错误
 *
 * 双重类型保护的好处：
 * - API 层：捕获接口变更和数据结构不匹配
 * - Query 层：为组件提供准确的类型推断
 * - 开发体验：IDE 自动补全和类型提示
 */

export function usePerson(id: string | null) {
  return useQuery<Person, ResponseError>({
    queryKey: ['person', id],
    queryFn: () => nextApi.get<Person>(`/public/people/${id}`),
    enabled: !!id,
  })
}

export function usePersonList() {
  return useQuery({
    queryKey: ['people'],
    queryFn: () => nextApi.get<Person[]>('/public/people'),
  })
}

export function usePersonListPaginated(page: number, limit: number) {
  return useQuery({
    queryKey: ['people', 'paginated', page, limit],
    queryFn: () => nextApi.get(`/public/people?page=${page}&limit=${limit}`),
  })
}

export function usePersonSearch(query: string) {
  return useQuery({
    queryKey: ['people', 'search', query],
    queryFn: () => nextApi.get(`/public/people/search?q=${query}`),
    enabled: !!query,
  })
}

export function useCreatePerson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: any) => nextApi.post('/public/people', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] })
    },
  })
}

export function useUpdatePerson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => nextApi.put(`/public/people/${id}`, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['people'] })
      queryClient.invalidateQueries({ queryKey: ['person', id] })
    },
  })
}

export function useDeletePerson() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id }: { id: string }) => nextApi.delete(`/public/people/${id}`),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['people'] })
      queryClient.removeQueries({ queryKey: ['person', id] })
    },
  })
}
