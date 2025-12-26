import type { Metadata } from 'next'
import { CONFIG } from '@/global-config'

import { NotFoundView } from '../_components'

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `404 page not found! | Error - ${CONFIG.appName}` }

export default function Page() {
  return <NotFoundView />
}
