'use client'

import { SimpleLayout } from '@/layouts/simple'
import { RouterLink } from '@/routes'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import { m } from 'framer-motion'

import { PageNotFoundIllustration } from '@/lib/assets/illustrations'
import { MotionContainer, varBounce } from '@/components/animate'

// ----------------------------------------------------------------------

export function NotFoundView() {
  return (
    <SimpleLayout
      slotProps={{
        content: { compact: true },
      }}>
      <Container component={MotionContainer}>
        <m.div variants={varBounce('in')} initial={{ scale: 0.3, opacity: 0 }}>
          <Typography variant="h3" sx={{ mb: 2 }}>
            页面未找到！
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')} initial={{ scale: 0.3, opacity: 0 }}>
          <Typography sx={{ color: 'text.secondary' }}>
            抱歉，找不到您要访问的页面。也许您输错了网址？请检查您的拼写。
          </Typography>
        </m.div>

        <m.div variants={varBounce('in')} initial={{ scale: 0.3, opacity: 0 }}>
          <PageNotFoundIllustration sx={{ my: { xs: 5, sm: 10 } }} />
        </m.div>

        <Button component={RouterLink} href="/" size="large" variant="contained">
          返回首页
        </Button>
      </Container>
    </SimpleLayout>
  )
}
