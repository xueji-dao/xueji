import { redirect } from 'next/navigation'
import { LocaleSwitcher } from '@/i18n/components'
import { UsersIcon } from '@heroicons/react/24/outline'
import { useLocale, useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

import Button from '@/components/Button'

import FormField from './FormField'
import LoginForm from './LoginForm'

export async function loginUser(credentials: { email: string; password: string }) {
  // In a real app, the credentials would be checked against a database and potentially a session token set in a cookie
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(credentials.email === 'jane@doe.com' && credentials.password === 'next-intl')
    }, 1000)
  })
}

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

type LoginFormInput = z.infer<typeof loginFormSchema>

export type LoginFormErrors = z.typeToFlattenedError<LoginFormInput>

async function loginAction(prev: unknown, data: FormData) {
  'use server'
  const t = await getTranslations('LoginPage')
  const values = Object.fromEntries(data)
  console.log('loginAction values', values)
  // Zod 链式验证：基础验证 -> 业务验证 -> 错误本地化
  const result = await loginFormSchema
    // 第二层验证：在基础字段验证通过后，执行实际的登录业务逻辑
    .refine(async (credentials) => loginUser(credentials), {
      message: t('invalidCredentials'), // 业务验证失败时的错误信息
    })
    // 异步解析并应用自定义错误映射
    .safeParseAsync(values, {
      // 自定义错误映射：将 Zod 默认错误转换为多语言错误信息
      errorMap(issue, ctx) {
        let message

        // 根据字段路径匹配对应的翻译错误信息
        if (issue.path[0] == 'email') {
          message = t('invalidEmail') // email 格式错误
        } else if (issue.path[0] == 'password') {
          message = t('invalidPassword') // password 长度不足
        }
        // 回退到默认错误信息
        return { message: message || ctx.defaultError }
      },
    })

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten(),
    }
  } else {
    redirect('/about')
  }
}

export default function LoginPage() {
  const t = useTranslations('LoginPage')
  const locale = useLocale()

  return (
    <>
      <div className="absolute top-8 right-8">
        <LocaleSwitcher />
      </div>
      <LoginForm
        key={locale}
        action={loginAction}
        fields={
          <div className="flex flex-col gap-5">
            <FormField label={t('email')} name="email" placeholder="jane@doe.com" required type="email" />
            <FormField label={t('password')} name="password" placeholder="••••••••" required type="password" />
          </div>
        }
        header={
          <div className="text-center">
            <UsersIcon className="mx-auto h-14 w-14 text-slate-900" />
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900">{t('title')}</h1>
            <p className="mt-2 text-slate-700">{t('description')}</p>
          </div>
        }
        submit={
          <div>
            <Button type="submit">{t('login')}</Button>
            <p className="mt-4 text-center text-sm text-slate-700">{t('credentials')}</p>
          </div>
        }
      />
    </>
  )
}
