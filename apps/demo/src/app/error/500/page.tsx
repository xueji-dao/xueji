import type { Metadata } from 'next'

import { View500 } from '../_components'

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: `500 内部错误`,
}

export default function Page() {
  return <View500 />
}
