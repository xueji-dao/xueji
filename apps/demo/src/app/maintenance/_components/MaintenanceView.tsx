'use client'

import { RouterLink } from '@/routes'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { MaintenanceIllustration } from '@/lib/assets/illustrations'

// ----------------------------------------------------------------------

export function MaintenanceView() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        页面维护中
      </Typography>

      <Typography sx={{ color: 'text.secondary' }}>我们目前正在努力修改这个页面！</Typography>

      <MaintenanceIllustration sx={{ my: { xs: 5, sm: 10 } }} />

      <Button component={RouterLink} href="/" size="large" variant="contained">
        返回首页
      </Button>
    </Box>
  )
}
