'use client'

import type { BoxProps } from '@mui/material/Box'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'

import { Iconify } from '@/components/iconify'

// ----------------------------------------------------------------------

export function FormSocials({ sx, ...other }: BoxProps) {
  const handleGoogleSignIn = () => {
    console.log('Google sign in')
  }

  const handleGithubSignIn = () => {
    console.log('Github sign in')
  }

  const handleTwitterSignIn = () => {
    console.log('Twitter sign in')
  }

  return (
    <Box
      sx={[
        {
          gap: 1.5,
          display: 'flex',
          justifyContent: 'center',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}>
      <IconButton color="inherit" onClick={handleGoogleSignIn}>
        <Iconify width={22} icon="socials:google" />
      </IconButton>
      <IconButton color="inherit" onClick={handleGithubSignIn}>
        <Iconify width={22} icon="socials:github" />
      </IconButton>
      <IconButton color="inherit" onClick={handleTwitterSignIn}>
        <Iconify width={22} icon="socials:twitter" />
      </IconButton>
    </Box>
  )
}
