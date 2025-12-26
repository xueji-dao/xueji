import { getRequestConfig } from 'next-intl/server'

import { getUserLocale } from './locale'

// next-intl creates a request-scoped configuration object,
// which you can use to provide messages and other options based on the user’s locale to Server Components.

export default getRequestConfig(async () => {
  const locale = await getUserLocale()
  return {
    locale,
    messages: (await import(`../../../messages/${locale}.json`)).default,
    formats: {
      dateTime: {
        short: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        },
        long: {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        },
      },
      number: {
        precise: {
          maximumFractionDigits: 5,
        },
      },
      list: {
        enumeration: {
          style: 'long',
          type: 'conjunction',
        },
      },
    },
  }
})
