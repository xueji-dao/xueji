'use client'

import { useActionState } from 'react'
import { createEntryAction } from '@/actions/entry'
import { useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'

import ErrorMessage from './ErrorMessage'
import LoadingSpinner from './LoadingSpinner'
import SuccessMessage from './SuccessMessage'

const inputClasses = cn(
  'block bg-white py-2 dark:bg-gray-800',
  'rounded-md border-gray-300 focus:ring-blue-500',
  'text-gray-900 focus:border-blue-500 dark:text-gray-100',
)

const initialState = {
  successMessage: null as string | null,
  errorMessage: null as string | null,
}

export default function EntryForm() {
  const [state, formAction] = useActionState(createEntryAction, initialState)
  const { pending } = useFormStatus()

  return (
    <>
      <form className="relative my-4 flex" action={formAction}>
        <input
          required
          className={cn(inputClasses, 'mr-2 w-1/3 px-4')}
          aria-label="Your name"
          placeholder="Your name..."
          name="name"
        />
        <input
          required
          className={cn(inputClasses, 'grow pr-32 pl-4')}
          aria-label="Your message"
          placeholder="Your message..."
          name="message"
        />
        <button
          className={cn(
            'flex items-center justify-center',
            'absolute top-1 right-1 h-8 px-4 font-bold',
            'bg-gray-100 text-gray-900 dark:bg-gray-700',
            'w-28 rounded dark:text-gray-100',
          )}
          type="submit"
          disabled={pending}>
          {pending ? <LoadingSpinner /> : 'Sign'}
        </button>
      </form>
      {state?.successMessage ? <SuccessMessage>{state.successMessage}</SuccessMessage> : null}
      {state?.errorMessage ? <ErrorMessage>{state.errorMessage}</ErrorMessage> : null}
    </>
  )
}
