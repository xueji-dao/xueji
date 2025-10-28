'use client'

import styles from '../../gallery.module.scss'
import Link from 'next/link'
import { motion } from 'framer-motion'

import { images } from '../../constants'

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96] as const,
}

const imageVariants = {
  exit: { y: '50%', opacity: 0, transition },
  enter: {
    y: '0%',
    opacity: 1,
    transition,
  },
}

const backVariants = {
  exit: { x: 100, opacity: 0, transition },
  enter: { x: 0, opacity: 1, transition: { delay: 1, ...transition } },
}

const SingleImage = ({ index }: any) => (
  <>
    <motion.div className={styles.single} initial="exit" animate="enter" exit="exit">
      <motion.img variants={imageVariants} src={images[index]} alt="The Barbican" />
      <motion.div className={styles.back} variants={backVariants}>
        <Link href="/framer">← Back</Link>
      </motion.div>
    </motion.div>
  </>
)

export default SingleImage
