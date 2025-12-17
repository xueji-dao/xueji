import styles from './styles.module.scss'
import Link from 'next/link'

import { cn } from '@/lib/utils'

export default async function CssPage() {
  return (
    <div className="container">
      <div className="mt-8 py-[calc(--spacing(4)-1px)] text-center">
        <Link href="/">
          <span className={cn(styles.btnSkeuomorphic, 'inline-block px-6 py-2')}>See full changelog</span>
        </Link>
      </div>
    </div>
  )
}
