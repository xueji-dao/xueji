'use client'

import styles from '../styles.module.css'
import Image from 'next/image'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { Link, useTransitionRouter } from 'next-view-transitions'

import AcmeLogo from '../_components/AcmeLogo'

function slideInOut() {
  document.documentElement.animate(
    [
      {
        opacity: 1,
        transform: 'translate(0, 0)',
      },
      {
        opacity: 0,
        transform: 'translate(-100px, 0)',
      },
    ],
    {
      duration: 400,
      easing: 'ease',
      fill: 'forwards',
      pseudoElement: '::view-transition-old(root)',
    },
  )

  document.documentElement.animate(
    [
      {
        opacity: 0,
        transform: 'translate(100px, 0)',
      },
      {
        opacity: 1,
        transform: 'translate(0, 0)',
      },
    ],
    {
      duration: 400,
      easing: 'ease',
      fill: 'forwards',
      pseudoElement: '::view-transition-new(root)',
    },
  )
}

export default function Home() {
  const router = useTransitionRouter()

  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] place-items-center gap-8 p-4 pb-20 font-(family-name:--font-geist-sans) sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-2 sm:items-start">
        <h2 id="demo">
          <span className={styles.demo}>Demo</span>
        </h2>
        <h1>
          <span className={styles.dashboard}>Dashboard</span>
        </h1>
        <p>
          <Link href="/custom">Go to /custom →</Link>
        </p>
        <p>
          <Link href="/view">Go to /view →</Link>
        </p>
        <p>
          <a
            onClick={(e) => {
              e.preventDefault()
              router.push('/custom', {
                onTransitionReady: slideInOut,
              })
            }}
            href="/custom">
            Go to /custom with custom transition →
          </a>
        </p>
        <div className="flex h-5 shrink-0 items-end rounded-lg bg-blue-500 p-1 md:h-26">
          <AcmeLogo />
        </div>
        <div className={styles.shape} />

        <div className="mt-2 flex grow flex-col gap-3 md:flex-row">
          <div className="flex flex-col justify-center gap-2 rounded-lg bg-gray-50 px-1 py-2 md:w-2/5 md:px-5">
            <p className={`text-xl text-gray-800 md:text-3xl md:leading-normal`}>
              <strong>Welcome to Acme.</strong> This is the example for the{' '}
              <a href="https://nextjs.org/learn/" className="text-blue-500">
                Next.js Learn Course
              </a>
              , brought to you by Vercel.
            </p>
            <Link
              href="/dashboard"
              className="flex items-center gap-2 self-start rounded-lg bg-blue-500 px-2 py-1 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base">
              <span>Dashboard</span> <ArrowRightIcon className="w-2 md:w-3" />
            </Link>
          </div>
          <div className="flex items-center justify-center p-1 md:w-3/5 md:px-7 md:py-6">
            {/* Add Hero Images Here */}
            <Image
              src="/images/mock/order/hero-desktop.png"
              width={1000}
              height={760}
              className="hidden md:block"
              alt="Screenshots of the dashboard project showing desktop version"
            />
            <Image
              src="/images/mock/order/hero-mobile.png"
              width={560}
              height={620}
              className="block sm:hidden"
              alt="Screenshots of the dashboard project showing desktop version"
            />
          </div>
        </div>
        <Image className="dark:invert" src="/next.svg" alt="Next.js logo" width={180} height={38} priority />
        <ol className="list-inside list-decimal text-center font-(family-name:--font-geist-mono) text-sm/6 sm:text-left">
          <li className="mb-2 tracking-[-.01em]">
            Get started by editing{' '}
            <code className="rounded bg-black/5 px-1 py-0.5 font-(family-name:--font-geist-mono) font-semibold dark:bg-white/6">
              src/app/page.tsx
            </code>
            .
          </li>
          <li className="tracking-[-.01em]">Save and see your changes instantly.</li>
        </ol>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="flex h-5 items-center justify-center gap-1 rounded-full border border-solid border-transparent bg-foreground px-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] sm:h-6 sm:w-auto sm:px-2 sm:text-base dark:hover:bg-[#ccc]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer">
            Deploy now
          </a>
          <a
            className="flex h-5 w-full items-center justify-center rounded-full border border-solid border-black/8 px-2 text-sm font-medium transition-colors hover:border-transparent hover:bg-[#f2f2f2] sm:h-6 sm:w-auto sm:px-2 sm:text-base md:w-[158px] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer">
            Read our docs
          </a>
        </div>
      </main>
      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-1 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Learn
        </a>
        <a
          className="flex items-center gap-1 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Examples
        </a>
        <a
          className="flex items-center gap-1 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer">
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  )
}
