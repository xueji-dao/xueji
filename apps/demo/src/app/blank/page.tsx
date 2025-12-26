import type { Metadata } from 'next'
import { CONFIG } from '@/global-config'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

// ----------------------------------------------------------------------

export const metadata: Metadata = { title: `Blank - ${CONFIG.appName}` }

export default function Page() {
  return (
    <Container>
      <Typography variant="h4">Blank</Typography>
    </Container>
  )
}
