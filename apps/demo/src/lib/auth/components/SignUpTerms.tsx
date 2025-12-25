import type { BoxProps } from '@mui/material/Box'
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'

// ----------------------------------------------------------------------

export function SignUpTerms({ sx, ...other }: BoxProps) {
  return (
    <Box
      component="span"
      sx={[
        {
          mt: 3,
          display: 'block',
          textAlign: 'center',
          typography: 'caption',
          color: 'text.secondary',
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}>
      {' 注册则代表已阅读并同意 '}
      <Link underline="always" color="text.primary">
        服务协议
      </Link>
      {' 和 '}
      <Link underline="always" color="text.primary">
        隐私政策
      </Link>
    </Box>
  )
}
