import styles from './styles.module.css'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Stripe Samples',
}

export default function IndexPage() {
  return (
    <ul className={styles['card-list']}>
      {/* 嵌入式结账 - 在当前页面内嵌入 Stripe 结账表单 */}
      <li>
        <Link
          href="/stripe/donate-with-embedded-checkout"
          className={`${styles.card} ${styles['checkout-style-background']}`}>
          <h2 className={styles.bottom}>Donate with embedded Checkout</h2>
          <Image src="/images/stripe/checkout-one-time-payments.svg" alt="Embedded Checkout" width={48} height={48} />
        </Link>
      </li>
      {/* 托管式结账 - 跳转到 Stripe 托管的结账页面 */}
      <li>
        <Link href="/stripe/donate-with-checkout" className={`${styles.card} ${styles['checkout-style-background']}`}>
          <h2 className={styles.bottom}>Donate with hosted Checkout</h2>
          <Image src="/images/stripe/checkout-one-time-payments.svg" alt="Hosted Checkout" width={48} height={48} />
        </Link>
      </li>
      {/* Elements 自定义表单 - 使用 Stripe Elements 构建完全自定义的支付表单 */}
      <li>
        <Link href="/stripe/donate-with-elements" className={`${styles.card} ${styles['elements-style-background']}`}>
          <h2 className={styles.bottom}>Donate with Elements</h2>
          <Image src="/images/stripe/elements-card-payment.svg" alt="Elements" width={48} height={48} />
        </Link>
      </li>
    </ul>
  )
}
