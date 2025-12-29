import type { Metadata } from 'next'

import { MaintenanceView } from './_components'

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Maintenance` }

export default function Page() {
  return <MaintenanceView />
}
