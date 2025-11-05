'use client'

import type { MouseEvent } from 'react'
import Link from 'next/link'

import { useCount, useDispatchCount } from './_components/Counter'

export default function ContextPage() {
  const count = useCount()
  const dispatch = useDispatchCount()

  const handleIncrease = (event: MouseEvent<HTMLButtonElement>) =>
    dispatch({
      type: 'INCREASE',
    })
  const handleDecrease = (event: MouseEvent<HTMLButtonElement>) =>
    dispatch({
      type: 'DECREASE',
    })
  const handleIncrease15 = (event: MouseEvent<HTMLButtonElement>) =>
    dispatch({
      type: 'INCREASE_BY',
      payload: 15,
    })

  return (
    <div className="container">
      <p className="mt-4">Counter: {count}</p>
      <button onClick={handleIncrease}>Increase</button>
      <br />
      <button onClick={handleDecrease}>Decrease</button>
      <br />
      <button onClick={handleIncrease15}>Increase By 15</button>
      <p>
        <Link href="/">Back Home</Link>
      </p>
    </div>
  )
}
