'use client'

import dayjs from 'dayjs'

import { useRouter } from '@/lib/routes'

import 'dayjs/locale/zh-cn'
import 'dayjs/locale/en'

type Props = {
  dateTime: Date
}

export default function DayjsInfo({ dateTime }: Props) {
  const dayjsLocale = dayjs.locale()
  const dayjsFormatted = dayjs(dateTime).format('LLLL')
  const router = useRouter()

  const handleRegister = async () => {
    router.push('/register')
  }

  return (
    <>
      <h2>
        Dayjs Locale: <code>{dayjsLocale}</code>
      </h2>
      <h2>
        Dayjs Formatted: <code>{dayjsFormatted}</code>
      </h2>
      <button onClick={handleRegister} className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
        去注册
      </button>
    </>
  )
}
