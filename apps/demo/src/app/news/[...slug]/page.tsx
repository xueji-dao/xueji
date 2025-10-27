import styles from '../../about/styles.module.scss'
import Link from 'next/link'

type NewsProps = {
  params: { slug: [] }
}

// allows a dynamic route to catch all paths.
// catch all page is in `app/demo/news/[...slug]/page.tsx` it matches any path after `/demo/news`

export default async function News({ params }: NewsProps) {
  const { slug } = await params
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1>Path: {`/news/${slug.join('/')}`}</h1>
        <hr className={styles.hr} />
        <p>The response contains a custom header X-News-Custom-Header : news_header_value.</p>
        <p>To check the response headers of this page, open the Network tab inside your browser inspector.</p>
        <Link href="/">&larr; Back home</Link>
      </div>
    </div>
  )
}
