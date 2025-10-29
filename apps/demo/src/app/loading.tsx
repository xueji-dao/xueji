import { Icon } from '@iconify/react'

export default function Loading() {
  return (
    <div className="flex size-full flex-col items-center justify-center">
      <Icon icon="tabler:loader-2" className="mt-4 size-12 animate-spin" />
    </div>
  )
}
