/** @jsxImportSource @emotion/react */
'use client'

import { useState } from 'react'
import { css } from '@emotion/react'
import { useTheme } from '@mui/material/styles'

import { EmotionButton, MuiButton, NavIcon, NavItem, NavTitle } from './MuiStyledExample'

export const StyledComparison = () => {
  const theme = useTheme()
  const [activeNav, setActiveNav] = useState('home')

  return (
    <div>
      <h3>Emotion vs MUI Styled 对比</h3>

      <div
        css={css`
          display: grid;
          gap: ${theme.spacing(3)};
          margin-bottom: ${theme.spacing(3)};
        `}>
        <div>
          <h4>按钮对比</h4>
          <div
            css={css`
              display: flex;
              gap: ${theme.spacing(2)};
              align-items: center;
            `}>
            <EmotionButton>Emotion Button</EmotionButton>
            <MuiButton>MUI Button</MuiButton>
            <MuiButton variant="secondary">MUI Secondary</MuiButton>
            <MuiButton active>MUI Active</MuiButton>
          </div>
        </div>

        <div>
          <h4>导航项对比</h4>
          <div
            css={css`
              display: flex;
              flex-direction: column;
              gap: ${theme.spacing(1)};
              max-width: 300px;
            `}>
            <NavItem variant="primary" active={activeNav === 'home'} onClick={() => setActiveNav('home')}>
              <NavIcon variant="primary">🏠</NavIcon>
              <NavTitle variant="primary" active={activeNav === 'home'}>
                首页
              </NavTitle>
            </NavItem>

            <NavItem variant="secondary" active={activeNav === 'profile'} onClick={() => setActiveNav('profile')}>
              <NavIcon variant="secondary">👤</NavIcon>
              <NavTitle variant="secondary" active={activeNav === 'profile'}>
                个人资料
              </NavTitle>
            </NavItem>

            <NavItem variant="secondary" active={activeNav === 'settings'} onClick={() => setActiveNav('settings')}>
              <NavIcon variant="secondary">⚙️</NavIcon>
              <NavTitle variant="secondary" active={activeNav === 'settings'}>
                设置
              </NavTitle>
            </NavItem>
          </div>
        </div>
      </div>

      <div
        css={css`
          background: ${theme.palette.background.paper};
          padding: ${theme.spacing(2)};
          border-radius: ${theme.shape.borderRadius}px;
          border-left: 4px solid ${theme.palette.info.main};
        `}>
        <h4>主要区别</h4>
        <ul>
          <li>
            <strong>Emotion styled</strong>: 简单直接，CSS-in-JS 语法
          </li>
          <li>
            <strong>MUI styled</strong>: 支持 variants、shouldForwardProp、主题集成
          </li>
          <li>
            <strong>variants</strong>: 条件样式的声明式写法
          </li>
          <li>
            <strong>shouldForwardProp</strong>: 控制哪些 props 传递给 DOM
          </li>
        </ul>
      </div>
    </div>
  )
}
