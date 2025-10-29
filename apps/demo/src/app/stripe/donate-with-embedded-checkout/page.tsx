import styles from '../styles.module.css'
import type { Metadata } from 'next'

import CheckoutForm from '../_components/CheckoutForm'

export const metadata: Metadata = {
  title: 'Donate with embedded Checkout',
}

export default function DonatePage() {
  return (
    <div className={styles['page-container']}>
      <h1>Donate with embedded Checkout</h1>
      <p>Donate to our project 💖</p>
      <CheckoutForm uiMode="embedded" />
    </div>
  )
}
