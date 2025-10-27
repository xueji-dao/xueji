'use client'

import { useState } from 'react'

import { UIContext } from '@/lib/context'

interface GlobalStateProps {
  children: React.ReactNode
}

export const GlobalState = ({ children }: GlobalStateProps) => {
  const [isDemo, setIsDemo] = useState<boolean | null>(true)

  return (
    <UIContext.Provider
      value={{
        isDemo,
        setIsDemo,
      }}>
      {children}
    </UIContext.Provider>
  )
}
