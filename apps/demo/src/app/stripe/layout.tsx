import styles from './styles.module.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    template: '%s | Stripe Example',
    default: 'Stripe Example',
  },
  twitter: {
    card: 'summary_large_image',
    description: 'Full-stack TypeScript example using Next.js, react-stripe-js, and stripe-node.',
    images: [
      {
        url: 'https://nextjs-typescript-react-stripe-js.vercel.app/social_card.png',
      },
    ],
    site: '@StripeDev',
    title: 'TypeScript Next.js Stripe Example',
  },
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className={styles.container}>
        <header className={styles.header}>
          <div className={styles['header-content']}>
            <Link href="/" className={styles.logo}>
              <Image src="/images/logo.png" alt="Logo" width={40} height={40} />
            </Link>
            <h1>
              <span className={styles.light}>Stripe Sample</span>
              <br />
              Next.js, TypeScript, and Stripe 🔒💸
            </h1>
          </div>
        </header>
        {children}
      </div>
      <div className={styles.banner}>
        <span>
          This is a demo of Next.js integration with Stripe. View code on{' '}
          <a href="https://github.com/xueji-dao/xueji.git" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          .
        </span>
      </div>
    </>
  )
}
