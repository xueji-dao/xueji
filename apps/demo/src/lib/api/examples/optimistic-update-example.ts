// 乐观更新示例：用户更新个人资料

import { useMutation, useQueryClient } from '@tanstack/react-query'

interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newProfile: Partial<User>) => {
      // 实际的 API 请求（可能需要 1-2 秒）
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        body: JSON.stringify(newProfile),
      })
      return response.json()
    },

    // 乐观更新：请求发送前立即更新 UI
    onMutate: async (newProfile) => {
      // 1. 取消正在进行的查询，避免覆盖乐观更新
      await queryClient.cancelQueries({ queryKey: ['user', 'me'] })

      // 2. 获取当前数据作为回滚备份
      const previousUser = queryClient.getQueryData<User>(['user', 'me'])

      // 3. 乐观更新：立即在 UI 中显示新数据
      queryClient.setQueryData<User>(['user', 'me'], (old) => ({
        ...old!,
        ...newProfile, // 合并新数据
      }))

      // 4. 返回回滚数据，供错误处理使用
      return { previousUser }
    },

    // 请求成功：用服务器返回的真实数据替换乐观数据
    onSuccess: (serverData) => {
      queryClient.setQueryData(['user', 'me'], serverData)
    },

    // 请求失败：回滚到之前的数据
    onError: (error, variables, context) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user', 'me'], context.previousUser)
      }
      // 显示错误提示
      console.error('更新失败，已回滚:', error)
    },

    // 无论成功失败都重新获取最新数据
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] })
    },
  })
}

/*
乐观更新的用户体验流程：

传统方式：
用户点击"保存" → 显示 loading → 等待 1-2 秒 → 显示结果

乐观更新：
用户点击"保存" → 立即显示结果 → 后台确认/回滚

具体流程：
1. 用户点击"保存" → UI 立即显示新数据（乐观更新）
2. 网络请求发送中 → 用户看到的是已更新的界面
3. 请求成功 → 用服务器数据确认更新
4. 请求失败 → 自动回滚到原始数据 + 显示错误

这就是为什么现代应用（如微信点赞、Twitter发推）操作感觉如此流畅的原因。
React Query 内置了这套机制，传统 store 需要手动实现所有逻辑。
*/
