/** @jsxImportSource @emotion/react */
'use client'

import { css } from '@emotion/react'
import { useTheme } from '@mui/material/styles'

export const ThemedComponent = () => {
  const theme = useTheme()

  return (
    <div
      css={css`
        padding: ${theme.spacing(3)};
        background: ${theme.palette.primary.main};
        color: ${theme.palette.primary.contrastText};
        border-radius: ${theme.shape.borderRadius}px;
        text-align: center;
      `}>
      <h3>MUI 主题集成示例</h3>
      <p
        css={css`
          margin: ${theme.spacing(1)} 0 0 0;
          opacity: 0.9;
        `}>
        使用 MUI 主题变量：颜色、间距、圆角等
      </p>
    </div>
  )
}
