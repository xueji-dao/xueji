import styles from '../styles.module.css'
import type { Metadata } from 'next'

import ElementsForm from '../_components/ElementsForm'

export const metadata: Metadata = {
  title: 'Donate with Elements',
}

export default function PaymentElementPage() {
  return (
    <div className={styles['page-container']}>
      <h1>Donate with Elements</h1>
      <p>Donate to our project 💖</p>
      <ElementsForm />
    </div>
  )
}
