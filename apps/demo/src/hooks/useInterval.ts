'use client'

import { useEffect, useRef } from 'react'

export default function useInterval(callback: () => void, delay: number | undefined) {
  const savedCallback = useRef<typeof callback>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  useEffect(() => {
    const handler = () => savedCallback.current?.()

    if (delay !== null) {
      const id = setInterval(handler, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
