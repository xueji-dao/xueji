import { blue, purple, red } from '@mui/material/colors'
import type { ThemeOptions } from '@mui/material/styles'

/**
 * 基础主题配置
 */
const baseTheme: ThemeOptions = {
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
    h1: { fontWeight: 600 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          borderRadius: 8,
          ...(ownerState.severity === 'info' && {
            backgroundColor: blue[50],
            color: blue[800],
          }),
        }),
      },
    },
  },
}

/**
 * 浅色主题配置
 */
export const lightTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'light',
    primary: {
      main: '#3377dd',
      light: '#5a8dee',
      dark: '#2455aa',
    },
    secondary: {
      main: purple[500],
    },
    error: {
      main: red.A400,
    },
    warning: {
      main: '#ff9800',
    },
    success: {
      main: '#4caf50',
    },
    background: {
      default: '#f7f3e9',
      paper: '#ffffff',
    },
    text: {
      primary: 'rgba(18,18,18,0.87)',
      secondary: 'rgba(18,18,18,0.6)',
    },
    divider: 'rgba(88,88,88,0.12)',
  },
}

/**
 * 深色主题配置
 */
export const darkTheme: ThemeOptions = {
  ...baseTheme,
  palette: {
    mode: 'dark',
    primary: {
      main: '#5a8dee',
      light: '#7ba3f0',
      dark: '#3377dd',
    },
    secondary: {
      main: purple[300],
    },
    error: {
      main: red[300],
    },
    warning: {
      main: '#ffb74d',
    },
    success: {
      main: '#81c784',
    },
    background: {
      default: '#0f172a',
      paper: '#1e293b',
    },
    text: {
      primary: 'rgba(255,255,255,0.87)',
      secondary: 'rgba(255,255,255,0.6)',
    },
    divider: 'rgba(255,255,255,0.12)',
  },
}
