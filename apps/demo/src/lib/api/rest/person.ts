import { queryOptions, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
  // React Query v5: 使用单一 Query Options 对象传参
  return useQuery<Person, ResponseError>({
    queryKey: ['person', id], // 缓存键：唯一标识查询
    queryFn: () => nextApi.get<Person>(`/public/people/${id}`), // 数据获取函数
    enabled: !!id, // 条件执行：只有 id 存在时才执行
  })
}

export function usePersonList() {
  // 简化的 Query Options 对象：只包含必需的 queryKey 和 queryFn
  return useQuery({
    queryKey: ['people'], // 列表查询的缓存键
    queryFn: () => nextApi.get<Person[]>('/public/people'), // 获取人员列表
  })
}

/**
 * React Query v5 Query Options 对象模式说明：
 *
 * v5 重大变更：所有函数现在只接收一个 Query Options 对象，而非多个参数
 * 这个对象包含创建查询所需的所有选项配置
 *
 * 优势：
 * 1. 类型安全：queryOptions() 提供完整的类型推断和约束
 * 2. 可复用性：options 对象可在多处使用（预取、SSR、组件等）
 * 3. 一致性：统一的 API 设计，减少学习成本
 * 4. 扩展性：新增选项时无需修改函数签名
 */
function pageOptions(page: number, limit: number) {
  // queryOptions 工厂函数：创建类型安全的查询配置对象
  return queryOptions({
    // 查询键：用于缓存标识和失效控制
    queryKey: ['people', 'paginated', page, limit] as const,
    // 查询函数：实际的数据获取逻辑
    queryFn: () => nextApi.get<Person[]>(`/public/people?page=${page}&limit=${limit}`),
    // 其他选项：staleTime, cacheTime, enabled 等都在这个对象中
  })
}
// 通过 queryOptions，不用 getQueryData<Array<Todo>>
// const todos = queryClient.getQueryData(todosQuery.queryKey)
//    ^? const todos: Todo[] | undefined

export function usePersonListPaginated(page: number, limit: number) {
  return useQuery(pageOptions(page, limit))
}

export function usePersonSearch(query: string) {
  // 搜索查询：包含搜索关键词的 Query Options
  return useQuery({
    queryKey: ['people', 'search', query], // 搜索缓存键：包含查询参数
    queryFn: () => nextApi.get(`/public/people/search?q=${query}`), // 搜索 API 调用
    enabled: !!query, // 只有有搜索关键词时才执行
  })
}

export function useCreatePerson() {
  const queryClient = useQueryClient()

  // Mutation Options 对象：与 Query Options 类似，包含所有 mutation 配置
  return useMutation({
    mutationFn: (data: any) => nextApi.post('/public/people', data), // 变更函数
    onSuccess: () => {
      // 成功后失效相关缓存：保证数据一致性
      queryClient.invalidateQueries({ queryKey: ['people'] })
    },
  })
}

export function useUpdatePerson() {
  const queryClient = useQueryClient()

  // 更新 Mutation：精确失效多个相关缓存
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) => nextApi.put(`/public/people/${id}`, data),
    onSuccess: (_, { id }) => {
      // 失效列表缓存和具体项缓存
      queryClient.invalidateQueries({ queryKey: ['people'] })
      queryClient.invalidateQueries({ queryKey: ['person', id] })
    },
  })
}

export function useDeletePerson() {
  const queryClient = useQueryClient()

  // 删除 Mutation：失效 + 移除缓存
  return useMutation({
    mutationFn: ({ id }: { id: string }) => nextApi.delete(`/public/people/${id}`),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['people'] }) // 失效列表缓存
      queryClient.removeQueries({ queryKey: ['person', id] }) // 直接移除已删除项的缓存
    },
  })
}

// An example query factory could look something like this:
// const todoQueries = {
//   all: () => ['todos'],

//   lists: () => [...todoQueries.all(), 'list'],

//   list: (filters: string) =>
//     queryOptions({
//       queryKey: [...todoQueries.lists(), filters],
//       queryFn: () => fetchTodos(filters),
//     }),

//   details: () => [...todoQueries.all(), 'detail'],

//   detail: (id: number) =>
//     queryOptions({
//       queryKey: [...todoQueries.details(), id],
//       queryFn: () => fetchTodo(id),
//       staleTime: 5000,
//     }),
// }
