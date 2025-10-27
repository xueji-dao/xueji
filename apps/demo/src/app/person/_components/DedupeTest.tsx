'use client'

import { usePersonList } from '@/api'

export function DedupeTest() {
  const { data: data1, isLoading: loading1 } = usePersonList()
  const { data: data2, isLoading: loading2 } = usePersonList()
  const { data: data3, isLoading: loading3 } = usePersonList()

  return (
    <div>
      <h3>去重测试 - 同时调用3次相同API</h3>
      <p>加载状态1: {loading1 ? '加载中' : '完成'}</p>
      <p>加载状态2: {loading2 ? '加载中' : '完成'}</p>
      <p>加载状态3: {loading3 ? '加载中' : '完成'}</p>
      <p>打开 Network 面板查看请求数量</p>
    </div>
  )
}
