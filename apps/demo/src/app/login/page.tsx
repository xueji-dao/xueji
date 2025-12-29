'use client'

import { useEffect, useState } from 'react'
import { useRouter } from '@/routes'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import { z } from 'zod'

import { useAuth } from '@/lib/auth'
import { LocaleSwitcher } from '@/lib/i18n/components'

const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(6),
})

type LoginForm = z.infer<typeof loginSchema>

export default function LoginPage() {
  const { isAuthenticated, login, isLoggingIn, loginError } = useAuth()
  const [formData, setFormData] = useState<LoginForm>({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})

  const t = useTranslations('LoginPage')
  const router = useRouter()

  // 已登录用户重定向
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard')
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setValidationErrors({})

    // Zod 验证
    const result = loginSchema.safeParse(formData)
    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        if (err.path[0] === 'email') {
          errors.email = err.code === 'invalid_string' ? t('invalidEmail') : t('invalidEmail')
        } else if (err.path[0] === 'password') {
          errors.password = t('invalidPassword')
        }
      })
      setValidationErrors(errors)
      return
    }

    // 使用 useAuth 的 login mutation
    login(formData)
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        p: 2,
      }}>
      <Card sx={{ maxWidth: 400, width: '100%', boxShadow: 3 }}>
        <CardContent sx={{ p: 4 }}>
          {/* 语言切换 */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <LocaleSwitcher />
          </Box>

          {/* 标题 */}
          <Typography variant="h4" component="h1" gutterBottom textAlign="center" color="primary">
            {t('title')}
          </Typography>

          {/* 错误提示 */}
          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError.message || t('invalidCredentials')}
            </Alert>
          )}

          {/* 登录表单 */}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label={t('email')}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!validationErrors.email}
              helperText={validationErrors.email}
              margin="normal"
              variant="outlined"
            />

            <TextField
              fullWidth
              label={t('password')}
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={!!validationErrors.password}
              helperText={validationErrors.password}
              margin="normal"
              variant="outlined"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <EyeSlashIcon className="h-3 w-3" /> : <EyeIcon className="h-3 w-3" />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button type="submit" fullWidth variant="contained" disabled={isLoggingIn} sx={{ mt: 3, mb: 2, py: 1.5 }}>
              {isLoggingIn ? <CircularProgress size={24} /> : t('login')}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
