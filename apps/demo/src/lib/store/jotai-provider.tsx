'use client'

import { ReactNode } from 'react'
import { createStore, Provider } from 'jotai'

// 在客户端组件中创建 store
const globalStore = createStore()

interface JotaiProviderProps {
  children: ReactNode
}

export function JotaiProvider({ children }: JotaiProviderProps) {
  return <Provider store={globalStore}>{children}</Provider>
}
