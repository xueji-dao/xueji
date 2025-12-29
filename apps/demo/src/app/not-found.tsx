import type { Metadata } from 'next'

import { NotFoundView } from '@/app/error/_components'

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `400 页面未找到！` }

export default function Page() {
  return <NotFoundView />
}
