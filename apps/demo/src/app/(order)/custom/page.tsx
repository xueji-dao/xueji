'use client'

import styles from '../styles.module.css'
import Button from '@mui/material/Button'
import { useTransitionRouter } from 'next-view-transitions'

export default function Page() {
  const router = useTransitionRouter()
  return (
    <div className={`${styles.demoBox} mt-40`}>
      <h2>
        This is the <span className={styles.demo}>demo</span>
      </h2>
      <p>OK you just saw the demo :)</p>
      <Button
        onClick={() => {
          // 使用 push 替代 back，避免 ViewTransition 超时
          router.push('/home')
        }}>
        ← Back to home
      </Button>

      <button
        onClick={() => {
          router.push('/home')
        }}>
        Go to /home
      </button>
    </div>
  )
}
