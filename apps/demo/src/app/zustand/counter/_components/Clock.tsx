'use client'

import { useShallow } from 'zustand/react/shallow'

import { useClockStore } from '@/lib/store/providers'
import useInterval from '@/hooks/useInterval'

function useClock() {
  return useClockStore(
    useShallow((store) => ({
      lastUpdate: store.lastUpdate,
      light: store.light,
    })),
  )
}

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString()
}

export function Clock() {
  const { lastUpdate, light } = useClock()
  // alternative way to fetch single piece of state:
  const tick = useClockStore((store) => store.tick)

  useInterval(() => {
    tick(Date.now())
  }, 1000)

  return (
    <div
      className={`inline-block rounded bg-black p-[15px] font-mono text-[50px] text-[#82fa58] ${light ? 'bg-[#333]' : ''}`}>
      {formatTime(lastUpdate)}
    </div>
  )
}
