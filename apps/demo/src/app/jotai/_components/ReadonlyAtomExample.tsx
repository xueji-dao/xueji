'use client'

import { Typography } from '@mui/material'
import { atom, useAtom } from 'jotai'

import { cn } from '@/lib/utils'

const textAtom = atom('readonly atoms')
const uppercaseAtom = atom((get) => get(textAtom).toUpperCase())

export function ReadonlyAtomExample() {
  const [lowercaseText, setLowercaseText] = useAtom(textAtom)
  const [uppercaseText] = useAtom(uppercaseAtom)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLowercaseText(e.target.value)
  }

  return (
    <div
      className={cn(
        'rounded border border-blue-200 p-6',
        'my-4 w-full bg-blue-50 dark:border-gray-800',
        'dark:bg-gray-900',
      )}>
      <h5 className={cn('text-lg font-bold md:text-xl', 'text-gray-900', 'dark:text-gray-200')}>
        Readonly Atom Example
      </h5>
      <Typography variant="body2" color="text.secondary" sx={{ my: 1 }}>
        Type to see the uppercase transformation in real-time.
      </Typography>

      <div className="mt-4 space-y-4">
        <input
          value={lowercaseText}
          onChange={handleChange}
          className="w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          placeholder="Type something..."
        />

        <div className="prose dark:prose-invert w-full">
          <h3 className="text-xl font-bold text-blue-600">{uppercaseText}</h3>
        </div>

        <p className="text-sm text-gray-400 dark:text-gray-600">
          The uppercase text is derived from a readonly atom that automatically transforms the input.
        </p>
      </div>
    </div>
  )
}
