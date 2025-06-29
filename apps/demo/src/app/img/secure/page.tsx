import styles from './page.module.css'

import { SecureImage } from '@/components/SecureImage'

// demo: use a Serverless Function as proxy to private image server to avoid giving direct access to browsers.
export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <h1>A frog from a secure origin</h1>
        <SecureImage src="/frog.jpg" alt="A frog" width={828 / 2} height={621 / 2} />
      </main>
    </div>
  )
}
