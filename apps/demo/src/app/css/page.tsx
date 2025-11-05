import styles from './styles.module.scss'

import { cn } from '@/lib/utils'

export default async function CssPage() {
  return (
    <div className="container">
      <div className="mt-8 py-[calc(--spacing(4)-1px)] text-center">
        <a href="/">
          <span className={cn(styles.btnSkeuomorphic, 'inline-block px-6 py-2')}>See full changelog</span>
        </a>
      </div>
    </div>
  )
}
