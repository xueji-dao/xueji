import type { Metadata } from 'next'
import { ViewTransitions } from 'next-view-transitions'

import { geistMono, geistSans, inter } from '@/styles/fonts'

export const metadata: Metadata = {
  title: 'Acme Dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
  metadataBase: new URL('https://aaronzzh.cn'),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <div className={`${inter.className} ${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</div>
    </ViewTransitions>
  )
}
