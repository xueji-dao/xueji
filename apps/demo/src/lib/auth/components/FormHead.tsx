import type { BoxProps } from '@mui/material/Box'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

// ----------------------------------------------------------------------

type FormHeadProps = BoxProps & {
  icon?: React.ReactNode
  title: React.ReactNode
  description?: React.ReactNode
}

// 在服务端组件中不能使用函数形式的 sx。需要改为静态对象并合并 sx props
export function FormHead({ sx, icon, title, description, ...other }: FormHeadProps) {
  return (
    <>
      {icon && (
        <Box component="span" sx={{ mb: 3, mx: 'auto', display: 'inline-flex' }}>
          {icon}
        </Box>
      )}

      <Box
        sx={{
          mb: 5,
          gap: 1.5,
          display: 'flex',
          textAlign: 'center',
          whiteSpace: 'pre-line',
          flexDirection: 'column',
          ...sx,
        }}
        {...other}>
        <Typography variant="h5">{title}</Typography>

        {description && (
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {description}
          </Typography>
        )}
      </Box>
    </>
  )
}
