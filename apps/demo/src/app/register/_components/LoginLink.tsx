'use client'

import Link from '@mui/material/Link'

import { RouterLink } from '@/lib/routes'
import { paths } from '@/lib/routes/paths'

export function LoginLink() {
  return (
    <Link component={RouterLink} href={paths.login} variant="subtitle2">
      登录
    </Link>
  )
}
