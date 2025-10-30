'use client'

import { createContext, useContext, useRef, type PropsWithChildren } from 'react'
import { createCounterStore, type CounterState, type CounterStore } from '@/stores/counter'
import { useStore } from 'zustand'

export type CounterStoreApi = ReturnType<typeof createCounterStore>

export const CounterStoreContext = createContext<CounterStoreApi | undefined>(undefined)

export const CounterStoreProvider = ({ children, ...props }: PropsWithChildren<Partial<CounterState>>) => {
  const storeRef = useRef<CounterStoreApi | null>(null)
  if (storeRef.current === null) {
    storeRef.current = createCounterStore(props)
  }

  // eslint-disable-next-line react-hooks/refs
  return <CounterStoreContext.Provider value={storeRef.current}>{children}</CounterStoreContext.Provider>
}

export const useCounterStore = <T,>(selector: (store: CounterStore) => T): T => {
  const counterStoreContext = useContext(CounterStoreContext)

  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`)
  }

  return useStore(counterStoreContext, selector)
}
