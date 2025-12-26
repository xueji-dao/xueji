import type { Metadata } from 'next'
import { CONFIG } from '@/global-config'

import { View403 } from '../_components'

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `403 forbidden! | Error - ${CONFIG.appName}` }

export default function Page() {
  return <View403 />
}
