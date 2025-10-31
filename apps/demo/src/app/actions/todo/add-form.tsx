'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

import { createTodo } from './actions'

const initialState = {
  message: '',
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">
      {pending ? 'Adding...' : 'Add Todo'}
    </button>
  )
}

export function AddForm() {
  // https://react.dev/blog/2024/04/25/react-19#new-hook-useactionstate
  const [state, formAction] = useActionState(createTodo, initialState)

  return (
    <div className="rounded-lg bg-white p-6 shadow-sm">
      <form action={formAction} className="flex gap-3">
        <div className="flex-1">
          <label htmlFor="todo" className="sr-only">
            Enter Task
          </label>
          <input
            type="text"
            id="todo"
            name="todo"
            required
            placeholder="What needs to be done?"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
          />
        </div>
        <SubmitButton />
      </form>
      {state?.message && <p className="mt-2 text-sm text-green-600">{state.message}</p>}
    </div>
  )
}
