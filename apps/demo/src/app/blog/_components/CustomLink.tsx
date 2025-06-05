'use client'

import Link from 'next/link'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomLink({ as, href, ...otherProps }: any) {
  return (
    <Link as={as} href={href} legacyBehavior>
      <a {...otherProps} className="font-bold" />
    </Link>
  )
}
