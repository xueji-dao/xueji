import { Metadata } from 'next'

import { ConditionalHeader } from '@/components/ConditionalHeader'

export const metadata: Metadata = { title: `Demos` }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <ConditionalHeader />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
