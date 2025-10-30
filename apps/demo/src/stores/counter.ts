import { createStore } from 'zustand/vanilla'

export type CounterState = {
  count: number
}

export type CounterActions = {
  decrement: () => void
  increment: () => void
  reset: () => void
}

export type CounterStore = CounterState & CounterActions

const getDefaultInitialState = (): CounterState => ({
  count: new Date().getFullYear(),
})

export const createCounterStore = (preloadedState?: Partial<CounterState>) => {
  return createStore<CounterStore>()((set) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    decrement: () => set((state) => ({ count: state.count - 1 })),
    increment: () => set((state) => ({ count: state.count + 1 })),
    reset: () => set(getDefaultInitialState()),
  }))
}
