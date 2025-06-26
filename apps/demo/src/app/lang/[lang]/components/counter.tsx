'use client'

import { useState } from 'react'

import { type getDictionary } from '@/lib/lang/get-dictionary'

export default function Counter({ dictionary }: { dictionary: Awaited<ReturnType<typeof getDictionary>>['counter'] }) {
  const [count, setCount] = useState(0)
  return (
    <p>
      This component is rendered on client:
      <button className="mx-2 border-1 border-red-500 px-1" onClick={() => setCount((n) => n - 1)}>
        {dictionary.decrement}
      </button>
      {count}
      <button className="mx-2 border-1 border-red-500 px-1" onClick={() => setCount((n) => n + 1)}>
        {dictionary.increment}
      </button>
    </p>
  )
}
