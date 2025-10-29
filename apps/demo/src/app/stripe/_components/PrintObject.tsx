import styles from '../styles.module.css'
import type { Stripe } from 'stripe'

export default function PrintObject({ content }: { content: Stripe.PaymentIntent | Stripe.Checkout.Session }) {
  const formattedContent: string = JSON.stringify(content, null, 2)
  return <pre className={styles.pre}>{formattedContent}</pre>
}
