'use client'

import { PersonApi } from '@/lib/api'

export function DedupeTest() {
  const { data: data1, isPending: loading1 } = PersonApi.usePersonList()
  const { data: data2, isPending: loading2 } = PersonApi.usePersonList()
  const { data: data3, isPending: loading3 } = PersonApi.usePersonList()

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
