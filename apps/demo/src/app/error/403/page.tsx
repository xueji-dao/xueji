import type { Metadata } from 'next'

import { View403 } from '../_components'

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `403 forbidden!` }

export default function Page() {
  return <View403 />
}
