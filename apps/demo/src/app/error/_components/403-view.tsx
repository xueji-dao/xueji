'use client'

import { SimpleLayout } from '@/layouts/simple'
import { RouterLink } from '@/routes'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { m } from 'framer-motion'

import { ForbiddenIllustration } from '@/lib/assets/illustrations'
import { MotionContainer, varBounce } from '@/components/animate'

// ----------------------------------------------------------------------

export function View403() {
  return (
    <SimpleLayout
      slotProps={{
        content: { compact: true },
      }}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce('in')}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            No permission
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <Typography sx={{ color: 'text.secondary' }}>
            The page you’re trying to access has restricted access. Please refer to your system administrator.
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')}>
          <ForbiddenIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          返回首页
        </Button>
      </Container>
    </SimpleLayout>
  )
}
