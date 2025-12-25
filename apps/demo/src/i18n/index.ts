// next-intl 使用方式：

// 1. 服务端组件中使用（异步）
// import { getTranslations } from 'next-intl/server'
// const t = await getTranslations('namespace')
// return <h1>{t('title')}</h1>

// 2. 客户端组件中使用（Hook）
// import { useTranslations } from 'next-intl'
// const t = useTranslations('namespace')
// return <h1>{t('title')}</h1>

export * from './config'
export * from './locale'
export * from './localization-provider'
export * from './number-format-locale'
