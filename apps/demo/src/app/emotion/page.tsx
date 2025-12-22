/** @jsxImportSource @emotion/react */
'use client'

import { useState } from 'react'
import { css } from '@emotion/react'
import { Button } from '@mui/material'
import { useTheme } from '@mui/material/styles'

import { ConfirmDialog } from '@/components/custom-dialog'

import { Card } from './_components/Card'
import { CssPropExample } from './_components/CssPropExample'
import { CssThemeExample } from './_components/CssThemeExample'
import { StyledButton } from './_components/StyledButton'
import { StyledComparison } from './_components/StyledComparison'
import { Animated, Basic, bounce, Combined, globalStyles } from './_components/styles'
import { ThemedComponent } from './_components/ThemedComponent'

export default function EmotionDemo() {
  const theme = useTheme()
  const [showDialog, setShowDialog] = useState(false)

  return (
    <div
      css={css`
        min-height: 100vh;
        background: ${theme.palette.background.default};
        padding: ${theme.spacing(4, 2)};
      `}>
      {globalStyles}
      <div
        css={css`
          max-width: 800px;
          margin: 0 auto;
        `}>
        <h1
          css={css`
            text-align: center;
            color: ${theme.palette.text.primary};
            margin-bottom: ${theme.spacing(4)};
          `}>
          @emotion/react + MUI 主题示例
        </h1>

        <Card>
          <h2>Styled Components</h2>
          <div
            css={css`
              display: flex;
              gap: ${theme.spacing(1.5)};
              flex-wrap: wrap;
            `}>
            <StyledButton variant="primary">主要按钮</StyledButton>
            <StyledButton variant="secondary">次要按钮</StyledButton>
            <StyledButton variant="danger">危险按钮</StyledButton>
          </div>
        </Card>

        <Card>
          <h2>CSS Prop (动态样式)</h2>
          <CssPropExample />
        </Card>

        <Card>
          <h2>MUI 主题集成</h2>
          <ThemedComponent />
        </Card>

        <Card>
          <h2>CSS 访问主题的方式</h2>
          <CssThemeExample />
        </Card>

        <Card>
          <h2>对比：原生 MUI 组件</h2>
          <div
            css={css`
              display: flex;
              gap: ${theme.spacing(1.5)};
              flex-wrap: wrap;
            `}>
            <Button variant="contained" color="primary" onClick={() => setShowDialog(true)}>
              MUI 主要按钮
            </Button>
            <Button variant="contained" color="secondary">
              MUI 次要按钮
            </Button>
            <Button variant="contained" color="error">
              MUI 错误按钮
            </Button>
          </div>
        </Card>

        <Card>
          <h2>样式组合示例</h2>
          <Basic>基础样式组件</Basic>
          <Combined>
            组合样式组件 <code>hover me</code>
          </Combined>
          <Animated animation={bounce}>
            动画组件 <code>with keyframes</code>
          </Animated>
        </Card>

        <Card>
          <h2>Emotion vs MUI Styled</h2>
          <StyledComparison />
        </Card>
      </div>

      <ConfirmDialog
        open={showDialog}
        onClose={() => setShowDialog(false)}
        title="确认操作"
        content="您确定要执行此操作吗？"
        action={
          <>
            <Button
              variant="contained"
              onClick={() => {
                console.log('用户确认操作')
                setShowDialog(false)
              }}>
              确认
            </Button>
          </>
        }
      />
    </div>
  )
}
