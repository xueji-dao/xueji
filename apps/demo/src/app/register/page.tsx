import type { Metadata } from 'next'

import { FormDivider, FormHead, FormSocials, SignUpTerms } from '@/lib/auth/components'
import { AnimateLogoRotate } from '@/components/animate/animate-logo'

import { LoginLink, RegisterForm } from './_components'

export const metadata: Metadata = { title: `注册` }

export default function Page() {
  return (
    <>
      <AnimateLogoRotate sx={{ mb: 3, mx: 'auto' }} />
      <FormHead
        title="注册新账号"
        description={
          <>
            {`已有账号? `}
            <LoginLink />
          </>
        }
      />
      <RegisterForm />

      <SignUpTerms />

      <FormDivider />

      <FormSocials />
    </>
  )
}
