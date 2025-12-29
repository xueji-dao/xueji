import type { Metadata } from 'next'

import { NotFoundView } from '../_components'

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `404 page not found! ` }

export default function Page() {
  return <NotFoundView />
}
