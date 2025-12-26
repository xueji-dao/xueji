'use client'

import { CONFIG } from '@/global-config'
import { RouterLink } from '@/routes'
import { paths } from '@/routes/paths'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { Breakpoint, CSSObject, Theme, useTheme } from '@mui/material/styles'
import { merge } from 'es-toolkit'

import { Logo } from '@/components/logo'

import { SettingsButton } from '../components/settings-button'
import type { HeaderSectionProps, LayoutSectionProps, MainSectionProps } from '../core'
import { HeaderSection, LayoutSection, MainSection } from '../core'
import type { AuthCenteredContentProps } from './content'
import { AuthCenteredContent } from './content'

// ----------------------------------------------------------------------

type LayoutBaseProps = Pick<LayoutSectionProps, 'sx' | 'children' | 'cssVars'>

export type AuthCenteredLayoutProps = LayoutBaseProps & {
  layoutQuery?: Breakpoint
  slotProps?: {
    header?: HeaderSectionProps
    main?: MainSectionProps
    content?: AuthCenteredContentProps
  }
}

export function AuthCenteredLayout({ sx, cssVars, children, slotProps, layoutQuery = 'md' }: AuthCenteredLayoutProps) {
  const theme = useTheme()
  const headerSlotProps: HeaderSectionProps['slotProps'] = { container: { maxWidth: false } }

  const headerSlots: HeaderSectionProps['slots'] = {
    topArea: (
      <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
        This is an info Alert.
      </Alert>
    ),
    leftArea: (
      <>
        <Logo />
      </>
    ),
    rightArea: (
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.5 } }}>
        <Link href={paths.faqs} component={RouterLink} color="inherit" sx={{ typography: 'subtitle2' }}>
          帮助?
        </Link>
        <SettingsButton />
      </Box>
    ),
  }

  return (
    <LayoutSection
      /** **************************************
       * @Header
       *************************************** */
      headerSection={
        <HeaderSection
          disableElevation
          layoutQuery={layoutQuery}
          {...slotProps?.header}
          slots={{ ...headerSlots, ...slotProps?.header?.slots }}
          slotProps={merge(headerSlotProps, slotProps?.header?.slotProps ?? {})}
          sx={[
            { position: { [layoutQuery]: 'fixed' } },
            ...(Array.isArray(slotProps?.header?.sx) ? slotProps.header.sx : [slotProps?.header?.sx]),
          ]}
        />
      }
      /** **************************************
       * @Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * @Styles
       *************************************** */
      cssVars={{ '--layout-auth-content-width': '420px', ...cssVars }}
      sx={[
        {
          position: 'relative',
          '&::before': backgroundStyles(theme),
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}>
      <MainSection
        {...slotProps?.main}
        sx={[
          (theme) => ({
            alignItems: 'center',
            p: theme.spacing(3, 2, 10, 2),
            [theme.breakpoints.up(layoutQuery)]: {
              justifyContent: 'center',
              p: theme.spacing(10, 0, 10, 0),
            },
          }),
          ...(Array.isArray(slotProps?.main?.sx) ? slotProps.main.sx : [slotProps?.main?.sx]),
        ]}>
        <AuthCenteredContent {...slotProps?.content}>{children}</AuthCenteredContent>
      </MainSection>
    </LayoutSection>
  )
}

// ----------------------------------------------------------------------

const backgroundStyles = (theme: Theme): CSSObject => ({
  ...theme.mixins.bgGradient({
    images: [`url(${CONFIG.assetsUrl}/images/bg/bg-1-blur.webp)`],
  }),
  zIndex: 1,
  opacity: 0.24,
  width: '100%',
  height: '100%',
  content: "''",
  position: 'absolute',
  ...theme.applyStyles('dark', {
    opacity: 0.08,
  }),
})
