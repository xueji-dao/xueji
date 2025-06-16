import { redirect } from 'next/navigation'
// eslint-disable-next-line @nx/enforce-module-boundaries
import { UsersIcon } from '@heroicons/react/24/outline'
// eslint-disable-next-line import/named
import { useLocale, useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { z } from 'zod'

import Button from '@/components/Button'
import FormField from '@/components/FormField'
import LocaleSwitcher from '@/components/LocaleSwitcher'

import LoginForm from './LoginForm'

export async function loginUser(credentials: { email: string; password: string }) {
  // In a real app, the credentials would be checked against a
  // database and potentially a session token set in a cookie
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

export type LoginFormResult =
  | {
      success: true
    }
  | {
      success: false
      errors: LoginFormErrors
    }

async function loginAction(prev: unknown, data: FormData): Promise<LoginFormResult> {
  'use server'
  const t = await getTranslations('LoginPage')
  const values = Object.fromEntries(data)
  console.log('loginAction values', values)
  const result = await loginFormSchema
    .refine(async (credentials) => loginUser(credentials), {
      message: t('invalidCredentials'),
    })
    .safeParseAsync(values, {
      errorMap(issue, ctx) {
        let message

        if (issue.path[0] == 'email') {
          message = t('invalidEmail')
        } else if (issue.path[0] == 'password') {
          message = t('invalidPassword')
        }
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
