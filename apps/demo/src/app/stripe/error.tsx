'use client'

export default function Error({ error }: { error: Error }) {
  return (
    <div className="p-4 text-center">
      <h2 className="mb-2 text-xl font-semibold text-red-600">Payment Error</h2>
      <p className="text-gray-600">{error.message}</p>
    </div>
  )
}
