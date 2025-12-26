'use client'

import styles from './gallery.module.scss'
import Link from 'next/link'
import { m } from 'framer-motion'

import { images } from './constants'

const transition = { duration: 0.5, ease: [0.43, 0.13, 0.23, 0.96] as const }

const thumbnailVariants = {
  initial: { scale: 0.9, opacity: 0 },
  enter: { scale: 1, opacity: 1, transition },
  exit: {
    scale: 0.5,
    opacity: 0,
    transition: { ...transition, duration: 1.5 },
  },
}

const frameVariants = {
  hover: { scale: 0.95 },
}

const imageVariants = {
  hover: { scale: 1.1 },
}

const Thumbnail = ({ id, i }) => (
  <>
    <m.div className={styles.thumbnail} variants={thumbnailVariants}>
      <m.div className={styles.frame} whileHover="hover" variants={frameVariants} transition={transition}>
        <Link href={`/framer/image/${i}`} scroll={false}>
          <m.img src={id} alt="The Barbican" variants={imageVariants} transition={transition} />
        </Link>
      </m.div>
    </m.div>
  </>
)

const Gallery = () => {
  return (
    <>
      <h3 className={styles.title}>Motion</h3>
      <div className={styles.gallery}>
        <m.div
          className={styles.thumbnails}
          initial="initial"
          animate="enter"
          exit="exit"
          variants={{ exit: { transition: { staggerChildren: 0.1 } } }}>
          {images.map((id, i) => (
            <Thumbnail key={id} id={id} i={i} />
          ))}
        </m.div>
      </div>
    </>
  )
}

export default Gallery
