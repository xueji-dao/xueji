'use client'

import { Fragment } from 'react'
import Portal from '@mui/material/Portal'
import type { SxProps, Theme } from '@mui/material/styles'
import { styled } from '@mui/material/styles'

import type { AnimateLogoProps } from '../animate'
import { AnimateLogoZoom } from '../animate'

// ----------------------------------------------------------------------

export type SplashScreenProps = React.ComponentProps<'div'> & {
  portal?: boolean
  sx?: SxProps<Theme>
  slots?: {
    logo?: React.ReactNode
  }
  slotProps?: {
    wrapper?: React.ComponentProps<typeof LoadingWrapper>
    logo?: AnimateLogoProps
  }
}

export function SplashScreen({ portal = true, slots, slotProps, sx, ...other }: SplashScreenProps) {
  const PortalWrapper = portal ? Portal : Fragment

  return (
    <PortalWrapper>
      <LoadingWrapper className="flex grow flex-col" {...slotProps?.wrapper}>
        <LoadingContent className="fixed inset-0 z-9998 flex grow items-center justify-center" sx={sx} {...other}>
          {slots?.logo ?? <AnimateLogoZoom {...slotProps?.logo} />}
        </LoadingContent>
      </LoadingWrapper>
    </PortalWrapper>
  )
}

// ----------------------------------------------------------------------

const LoadingWrapper = styled('div')``

const LoadingContent = styled('div')(({ theme }) => ({
  // right: 0,
  // bottom: 0,
  // zIndex: 9998,
  // flexGrow: 1,
  // width: '100%',
  // height: '100%',
  // display: 'flex',
  // position: 'fixed',
  // alignItems: 'center',
  // justifyContent: 'center',
  backgroundColor: theme.vars?.palette.background.default,
}))
