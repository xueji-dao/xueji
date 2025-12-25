'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import { useBoolean } from 'minimal-shared/hooks'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Field, Form, schemaUtils } from '@/components/hook-form'
import { Iconify } from '@/components/iconify'

// ----------------------------------------------------------------------

export type RegisterSchemaType = z.infer<typeof RegisterSchema>

export const RegisterSchema = z.object({
  email: schemaUtils.email(),
  password: z.string().min(1, { error: '请输入密码!' }).min(6, { error: '密码长度至少为6个字符!' }),
})

// ----------------------------------------------------------------------

export function RegisterForm() {
  const showPassword = useBoolean()

  const defaultValues: RegisterSchemaType = {
    email: '',
    password: '',
  }

  const methods = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues,
  })

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      console.info('DATA', data)
    } catch (error) {
      console.error(error)
    }
  })

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Box
        sx={{
          gap: 3,
          display: 'flex',
          flexDirection: 'column',
        }}>
        <Field.Text name="email" type="email" label="邮箱" slotProps={{ inputLabel: { shrink: true } }} />

        <Field.Text
          name="password"
          label="密码"
          placeholder=""
          type={showPassword.value ? 'text' : 'password'}
          slotProps={{
            inputLabel: { shrink: true },
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={showPassword.onToggle} edge="end">
                    <Iconify icon={showPassword.value ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <Button
          fullWidth
          color="inherit"
          size="large"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          loadingIndicator="注册中...">
          注册
        </Button>
      </Box>
    </Form>
  )
}
