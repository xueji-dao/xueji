import { createStore } from 'zustand/vanilla'

export type ClockState = {
  lastUpdate: number
  light: boolean
}

export type ClockActions = {
  tick: (lastUpdate: number) => void
  toggleLight: () => void
  setLight: (light: boolean) => void
}

export type ClockStore = ClockState & ClockActions

const getDefaultInitialState = (): ClockState => ({
  lastUpdate: Date.now(),
  light: false,
})

export const createClockStore = (preloadedState?: Partial<ClockState>) => {
  return createStore<ClockStore>()((set, get) => ({
    ...getDefaultInitialState(),
    ...preloadedState,
    tick: (lastUpdate: number) =>
      set({
        lastUpdate,
        light: !get().light,
      }),
  }))
}
