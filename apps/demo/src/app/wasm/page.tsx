import Link from 'next/link'

import { RustServerComponent } from './RustComponent'

type PageProps = {
  searchParams: { [key: string]: string | undefined }
}

export default async function Page({ searchParams }: PageProps) {
  const { number } = await searchParams
  const number1 = parseInt(number || '30')
  return (
    <div>
      <RustServerComponent number={number1} />
      <div>
        <Link href={`/wasm?number=${number1 + 1}`}>+</Link>
      </div>
    </div>
  )
}
