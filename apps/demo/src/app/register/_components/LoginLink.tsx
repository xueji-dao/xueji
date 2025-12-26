'use client'

import { RouterLink } from '@/routes'
import { paths } from '@/routes/paths'
import Link from '@mui/material/Link'

export function LoginLink() {
  return (
    <Link component={RouterLink} href={paths.login} variant="subtitle2">
      登录
    </Link>
  )
}
