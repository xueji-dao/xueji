import { AuthCenteredLayout } from '@/layouts/auth-centered'

import { GuestGuard } from '@/lib/auth/components'

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <GuestGuard>
      <AuthCenteredLayout slotProps={{ header: { slotProps: { container: { sx: { px: { md: 5 } } } } } }}>
        {children}
      </AuthCenteredLayout>
    </GuestGuard>
  )
}
