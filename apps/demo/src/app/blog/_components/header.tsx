// import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Link } from 'next-view-transitions'

const Header = () => {
  const t = useTranslations('blog')

  return (
    <h2 className="mt-8 mb-20 flex items-center text-2xl leading-tight font-bold tracking-tight md:text-4xl md:tracking-tighter">
      <Link href="/blog" className="o-blog-title hover:scale-[1.02] hover:underline">
        <span role="img" aria-label="map">
          🗺️{t('title')}
        </span>
      </Link>
    </h2>
  )
}

export default Header
