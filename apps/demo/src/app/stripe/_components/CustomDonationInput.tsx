import styles from '../styles.module.css'

import { formatAmountForDisplay } from '@/lib/utils/stripe-helpers'

export default function CustomDonationInput({
  name,
  min,
  max,
  currency,
  step,
  onChange,
  value,
  className,
}: {
  name: string
  min: number
  max: number
  currency: string
  step: number
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: number
  className?: string
}) {
  return (
    <label>
      Custom donation amount ({formatAmountForDisplay(min, currency)}-{formatAmountForDisplay(max, currency)}):
      <input
        type="range"
        name={name}
        min={min}
        max={max}
        step={step}
        onChange={onChange}
        value={value}
        className={`${styles['range-input']} ${className || ''}`}></input>
    </label>
  )
}
