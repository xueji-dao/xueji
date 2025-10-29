'use client'

import styles from '../styles.module.css'
import { useState } from 'react'
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from '@stripe/react-stripe-js'
import type Stripe from 'stripe'

import getStripe from '@/lib/utils/get-stripejs'
import { formatAmountForDisplay } from '@/lib/utils/stripe-helpers'

import { createCheckoutSession } from '../actions'
import * as config from '../config'
import CustomDonationInput from './CustomDonationInput'
import StripeTestCards from './StripeTestCards'

interface CheckoutFormProps {
  uiMode: Stripe.Checkout.SessionCreateParams.UiMode
}

export default function CheckoutForm(props: CheckoutFormProps) {
  const [loading] = useState<boolean>(false)
  const [input, setInput] = useState<{ customDonation: number }>({
    customDonation: Math.round(config.MAX_AMOUNT / config.AMOUNT_STEP),
  })
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e): void =>
    setInput({
      ...input,
      [e.currentTarget.name]: e.currentTarget.value,
    })

  const formAction = async (data: FormData): Promise<void> => {
    const uiMode = data.get('uiMode') as Stripe.Checkout.SessionCreateParams.UiMode
    const { client_secret, url } = await createCheckoutSession(data)

    if (uiMode === 'embedded') return setClientSecret(client_secret)

    window.location.assign(url as string)
  }

  return (
    <>
      <form action={formAction}>
        <input type="hidden" name="uiMode" value={props.uiMode} />
        <CustomDonationInput
          className={styles['checkout-style']}
          name="customDonation"
          min={config.MIN_AMOUNT}
          max={config.MAX_AMOUNT}
          step={config.AMOUNT_STEP}
          currency={config.CURRENCY}
          onChange={handleInputChange}
          value={input.customDonation}
        />
        <StripeTestCards />
        <button className={`${styles.button} ${styles['checkout-style-background']}`} type="submit" disabled={loading}>
          Donate {formatAmountForDisplay(input.customDonation, config.CURRENCY)}
        </button>
      </form>
      {clientSecret ? (
        <EmbeddedCheckoutProvider stripe={getStripe()} options={{ clientSecret }}>
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      ) : null}
    </>
  )
}
