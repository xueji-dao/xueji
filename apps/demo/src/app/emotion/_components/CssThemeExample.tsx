/** @jsxImportSource @emotion/react */
'use client'

import { css } from '@emotion/react'
import { useTheme } from '@mui/material/styles'

export const CssThemeExample = () => {
  const theme = useTheme()

  return (
    <div
      css={css`
        background: ${theme.palette.info.main};
        color: ${theme.palette.info.contrastText};
        padding: ${theme.spacing(2)};
        border-radius: ${theme.shape.borderRadius}px;
        margin-bottom: ${theme.spacing(2)};
      `}>
      useTheme Hook 访问主题
    </div>
  )
}
