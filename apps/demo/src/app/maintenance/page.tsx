import type { Metadata } from 'next'
import { CONFIG } from '@/global-config'

import { MaintenanceView } from './_components'

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Maintenance - ${CONFIG.appName}` }

export default function Page() {
  return <MaintenanceView />
}
