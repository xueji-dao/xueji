import { ReactNode } from 'react'

import { sans } from '@/lib/fonts'
import { cn } from '@/lib/utils'

type Props = {
  children?: ReactNode
}

export function PostTitle({ children }: Props) {
  return (
    <h1
      className={cn(
        sans.className,
        'o-post-title mb-4 text-center text-5xl leading-tight font-bold tracking-tighter md:text-left md:text-7xl md:leading-none lg:text-8xl',
      )}>
      {children}
    </h1>
  )
}
