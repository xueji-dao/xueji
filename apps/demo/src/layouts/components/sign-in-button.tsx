import { CONFIG } from '@/global-config'
import { RouterLink } from '@/routes'
import type { ButtonProps } from '@mui/material/Button'
import Button from '@mui/material/Button'

// ----------------------------------------------------------------------

export function SignInButton({ sx, ...other }: ButtonProps) {
  return (
    <Button component={RouterLink} href={CONFIG.auth.redirectPath} variant="outlined" sx={sx} {...other}>
      Sign in
    </Button>
  )
}
