import type { Metadata } from 'next'

import { AnimateView } from '../_components'

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Animate` }

export default function Page() {
  return <AnimateView />
}
