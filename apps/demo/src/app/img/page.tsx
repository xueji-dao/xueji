import styles from './styles.module.css'
import type { PropsWithChildren } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import vercel from '../../../public/images/vercel.png'
import ViewSource from '../components/view-source'

const Code = (props: PropsWithChildren<{}>) => <code className={styles.inlineCode} {...props} />

const Index = () => (
  <div className={styles.container}>
    <ViewSource pathname="app/img/page.tsx" />
    <div className={styles.card}>
      <h1>Image Component with Next.js</h1>
      <p>
        This page demonstrates the usage of the <b>next/image</b> component with live examples.
      </p>
      <p>This component is designed to automatically optimize images on-demand as the browser requests them.</p>
      <hr className={styles.hr} />
      <h2 id="examples">Examples</h2>
      <p>
        Try it the examples below (you may need to disable cache in dev tools to see the effect if you already visited):
      </p>
      <ul>
        <li>
          <Link href="/img/responsive">Responsive to viewport</Link>
        </li>
        <li>
          <Link href="/img/fill">Fill dimensions of parent element</Link>
        </li>
        <li>
          <Link href="/img/placeholder">Blur-up placeholder</Link>
        </li>
        <li>
          <Link href="/img/shimmer">Shimmer placeholder</Link>
        </li>
        <li>
          <Link href="/img/color">Color placeholder</Link>
        </li>
        <li>
          <Link href="/img/theme">Light/Dark mode theme detection</Link>
        </li>
        <li>
          <Link href="/img/background">Text on background image</Link>
        </li>
      </ul>
      <hr className={styles.hr} />
      <h2 id="internal">Internal Image</h2>
      <p>
        The following is an example of a reference to an internal image from the <Code>public</Code> directory.
      </p>
      <p>This image is intentionally large so you have to scroll down to the next image.</p>
      <Image
        alt="Vercel logo"
        src={vercel}
        width={1000}
        height={1000}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <hr className={styles.hr} />
      <h2 id="external">External Image</h2>
      <p>
        The following is an example of a reference to an external image at <Code>assets.vercel.com</Code>.
      </p>
      <p>
        External images must be configured in <Code>next.config.js</Code> using the <Code>remotePatterns</Code>{' '}
        property.
      </p>
      <Image
        alt="Next.js logo"
        src="https://assets.vercel.com/image/upload/v1538361091/repositories/next-js/next-js-bg.png"
        width={1200}
        height={400}
        style={{
          maxWidth: '100%',
          height: 'auto',
        }}
      />
      <hr className={styles.hr} />
      <h2 id="more">Learn More</h2>
      <p>You can optionally configure a cloud provider, device sizes, and more!</p>
      <p>
        Checkout the <a href="https://nextjs.org/docs/app/getting-started/images">Image Optimization documentation</a>{' '}
        to learn more.
      </p>
    </div>
  </div>
)

export default Index
