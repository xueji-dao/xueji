import type { Metadata, Viewport } from 'next'

import '@/styles/global.css'
import '@/styles/style.scss'

export const viewport: Viewport = {
  themeColor: 'black',
  initialScale: 1,
  width: 'device-width',
}

export const metadata: Metadata = {
  title: {
    template: '%s | Demo', // can be used to add a prefix or a suffix to titles defined in child route segments.
    default: 'Welcome to demo',
    // absolute: 'About', // Output: <title>About</title>
  },
  applicationName: 'Next.js',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'AaronZZH', url: 'https://aaronzzh.cn' }],
  description: 'The Next.js Learn Demo built with App Router.',
  // We recommend using the file-based Metadata API for icons where possible.
  // Rather than having to sync the config export with actual files,
  // the file-based API will automatically generate the correct metadata for you.
  // icons: {},
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    videos: [
      {
        url: 'https://nextjs.org/video.mp4', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    audio: [
      {
        url: 'https://nextjs.org/audio.mp3', // Must be an absolute URL
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
