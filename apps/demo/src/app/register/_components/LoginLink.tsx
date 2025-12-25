'use client'

import RouterLink from 'next/link'
import Link from '@mui/material/Link'

import { paths } from '@/lib/routes/paths'

export function LoginLink() {
  return (
    <Link component={RouterLink} href={paths.login} variant="subtitle2">
      登录
    </Link>
  )
}
