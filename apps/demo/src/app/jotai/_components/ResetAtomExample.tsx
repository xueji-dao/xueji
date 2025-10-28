'use client'

import { atom, useAtom, useSetAtom } from 'jotai'
import { atomWithReset, RESET, useResetAtom } from 'jotai/utils'

const dollarsAtom = atomWithReset(0)
const centsAtom = atom(
  (get) => get(dollarsAtom) * 100,
  (get, set, newValue: number | typeof RESET) => set(dollarsAtom, newValue === RESET ? newValue : newValue / 100),
)

const ResetControls = () => {
  const setDollars = useSetAtom(dollarsAtom)
  const resetCents = useResetAtom(centsAtom)

  return (
    <div className="flex gap-2">
      <button onClick={() => setDollars(RESET)} className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600">
        Reset dollars
      </button>
      <button onClick={resetCents} className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        Reset cents
      </button>
    </div>
  )
}

export default function ResetAtomExample() {
  const [dollars, setDollars] = useAtom(dollarsAtom)
  const [cents, setCents] = useAtom(centsAtom)

  return (
    <div className="my-4 w-full rounded border border-purple-200 bg-purple-50 p-6 dark:border-gray-800 dark:bg-gray-900">
      <h5 className="text-lg font-bold text-gray-900 md:text-xl dark:text-gray-200">Reset Atom Example</h5>
      <p className="my-1 text-gray-800 dark:text-gray-300">
        atomWithReset allows atoms to be reset to their initial values using RESET symbol.
      </p>

      <div className="mt-4 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dollars: ${dollars}</label>
            <input
              type="number"
              value={dollars}
              onChange={(e) => setDollars(Number(e.target.value))}
              className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
              step="0.01"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Cents: {cents}¢</label>
            <input
              type="number"
              value={cents}
              onChange={(e) => setCents(Number(e.target.value))}
              className="mt-1 w-full rounded border border-gray-300 p-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
            />
          </div>
        </div>

        <ResetControls />

        <p className="text-sm text-gray-500 dark:text-gray-400">
          The cents atom is derived from dollars (cents = dollars × 100). Both can be reset to their initial value (0).
        </p>
      </div>
    </div>
  )
}
