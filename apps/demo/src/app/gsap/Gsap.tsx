'use client'

import styles from './styles.module.scss'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useTranslations } from 'next-intl'

import { cn } from '@/lib/utils'

gsap.registerPlugin(useGSAP)

export const Gsap = () => {
  const t = useTranslations('demo')
  // Create variable referencesuseTranslations
  const container = useRef(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tl = useRef<any>()

  const toggleTimeline = () => {
    tl.current.reversed(!tl.current.reversed())
  }

  useGSAP(
    () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const boxes: any = gsap.utils.toArray('.box')
      tl.current = gsap
        .timeline()
        .to(boxes[0], { x: 120, rotation: 360 })
        .to(boxes[1], { x: -120, rotation: -360 }, '<')
        .to(boxes[2], { y: -166 })
        .reverse()
    },
    { scope: container },
  )

  return (
    <section className={styles.container} ref={container}>
      <h2>Use the button to toggle a Timeline</h2>
      <div>
        <button onClick={toggleTimeline}>{t('play')}</button>
      </div>
      <div className={cn(styles.box, 'box')}>Box 1</div>
      <div className={cn(styles.box, 'box')}>Box 2</div>
      <div className={cn(styles.box, 'box')}>Box 3</div>
    </section>
  )
}
