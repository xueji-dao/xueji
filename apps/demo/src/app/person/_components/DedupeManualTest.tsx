'use client'

import { useState } from 'react'

import { PersonApi } from '@/lib/api'

export function DedupeManualTest() {
  const [showHooks, setShowHooks] = useState(false)

  return (
    <div className="rounded border p-4">
      <h3>手动去重测试</h3>
      <button onClick={() => setShowHooks(!showHooks)} className="rounded bg-blue-500 px-4 py-2 text-white">
        {showHooks ? '隐藏' : '显示'} 3个相同Hook
      </button>

      {showHooks && (
        <div className="mt-4">
          <HookInstance name="Hook 1" />
          <HookInstance name="Hook 2" />
          <HookInstance name="Hook 3" />
        </div>
      )}
    </div>
  )
}

function HookInstance({ name }: { name: string }) {
  const { data, isPending } = PersonApi.usePersonList()

  return (
    <div className="mt-2 ml-4 border-l-4 border-blue-300 p-2">
      <strong>{name}</strong>: {isPending ? '加载中...' : `${data?.length || 0} 条数据`}
    </div>
  )
}
