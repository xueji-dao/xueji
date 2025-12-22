import type React from 'react'
import styled from '@emotion/styled'
import { styled as muiStyled } from '@mui/material/styles'

/**
 * MUI 组件开发样式方案对比
 *
 * 优先级推荐：
 * 1. sx prop (最优先) - 简单样式、一次性样式
 * 2. MUI styled (复杂组件) - 可复用组件、复杂逻辑
 * 3. MUI 组件扩展 - 基于现有组件的定制
 * 4. Emotion styled (特殊情况) - 脱离 MUI 生态的特殊需求
 *
 * 核心区别：
 * - sx prop: 内联样式属性，简洁直接
 * - MUI styled: 创建新组件，支持 variants、shouldForwardProp
 *
 * 渲染机制：
 * - 两种方式都生成 className，不是 style
 * - CSS-in-JS 自动生成唯一类名并注入 <style> 标签
 * - 支持伪类、媒体查询等完整 CSS 功能
 *
 * 示例对比：
 * sx prop 用法
 * <Button sx={{ p: 2, borderRadius: 1 }}>按钮</Button>
 *
 * MUI styled 用法
 * const StyledButton = styled(Button)(({ theme }) => ({
 *   padding: theme.spacing(2),
 *   borderRadius: theme.shape.borderRadius,
 * }))
 */

// Emotion styled 示例
export const EmotionButton = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 4px;
  background: #1976d2;
  color: white;
  cursor: pointer;

  &:hover {
    background: #1565c0;
  }
`

// MUI styled 标准用法 - 让 TypeScript 自动推断类型
const shouldForwardProp = (prop: string) => !['active', 'variant'].includes(prop)

interface StyledState {
  active?: boolean
  variant?: 'primary' | 'secondary'
}

// ✅ 标准用法：直接导出，让 TS 推断
export const MuiButton = muiStyled('button', { shouldForwardProp })<StyledState>(({ theme, active }) => ({
  padding: theme.spacing(1.5, 3),
  border: 'none',
  borderRadius: theme.shape.borderRadius,
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  cursor: 'pointer',
  fontWeight: active ? theme.typography.fontWeightBold : theme.typography.fontWeightMedium,

  '&:hover': {
    background: theme.palette.primary.dark,
  },

  variants: [
    {
      props: { variant: 'secondary' },
      style: {
        background: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        '&:hover': {
          background: theme.palette.secondary.dark,
        },
      },
    },
  ],
}))

// ✅ 标准用法：简单组件直接导出
export const NavItem = muiStyled('div', {
  shouldForwardProp,
})<StyledState>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1, 2),
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: theme.transitions.create(['background-color']),

  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },

  ...(active && {
    backgroundColor: theme.palette.action.selected,
    fontWeight: theme.typography.fontWeightBold,
  }),

  variants: [
    {
      props: { variant: 'primary' },
      style: {
        fontSize: theme.typography.pxToRem(16),
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    {
      props: { variant: 'secondary' },
      style: {
        fontSize: theme.typography.pxToRem(14),
        fontWeight: theme.typography.fontWeightRegular,
        paddingLeft: theme.spacing(4),
      },
    },
  ],
}))

export const NavIcon = muiStyled('span', {
  shouldForwardProp,
})<StyledState>(() => ({
  width: 24,
  height: 24,
  marginRight: 12,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  variants: [
    {
      props: { variant: 'secondary' },
      style: {
        width: 20,
        height: 20,
        marginRight: 8,
      },
    },
  ],
}))

export const NavTitle = muiStyled('span', { shouldForwardProp })<StyledState>(({ active, theme }) => ({
  lineHeight: 1.2,
  fontSize: theme.typography.pxToRem(14),
  fontWeight: theme.typography.fontWeightMedium,

  variants: [
    {
      props: { variant: 'primary' },
      style: {
        ...(active && { fontWeight: theme.typography.fontWeightBold }),
      },
    },
    {
      props: { variant: 'secondary' },
      style: {
        ...theme.typography.body2,
        fontWeight: theme.typography.fontWeightRegular,
        ...(active && { fontWeight: theme.typography.fontWeightMedium }),
      },
    },
  ],
}))

interface ContentRootProps {
  filled?: boolean
}

const StyledRoot = muiStyled('div')<ContentRootProps>(({ filled, theme }) => ({
  flexGrow: 1,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(0, 3),
  ...(filled && {
    borderRadius: Number(theme.shape.borderRadius) * 2,
    backgroundColor: theme.palette.grey[50],
    border: `dashed 1px ${theme.palette.grey[300]}`,
  }),
}))

// ❌ 过时写法：React.FC
// export const EmptyContent: React.FC<ContentRootProps & { children?: React.ReactNode }> = ({ filled, children }) => (
//   <StyledRoot filled={filled}>{children}</StyledRoot>
// )

// ✅ 现代写法：函数声明（推荐）
export function EmptyContent({ filled, children }: ContentRootProps & { children?: React.ReactNode }) {
  return <StyledRoot filled={filled}>{children}</StyledRoot>
}

// ✅ 现代写法：箭头函数 + 接口
interface EmptyContentProps extends ContentRootProps {
  children?: React.ReactNode
}

export const EmptyContentArrow = ({ filled, children }: EmptyContentProps) => (
  <StyledRoot filled={filled}>{children}</StyledRoot>
)
