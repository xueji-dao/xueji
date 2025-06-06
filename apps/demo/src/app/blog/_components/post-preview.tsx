// import Link from 'next/link'
import { Link } from 'next-view-transitions'

import { type Author } from '@/types/author'

import Avatar from './avatar'
import CoverImage from './cover-image'
import DateFormatter from './date-formatter'

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

export function PostPreview({ title, coverImage, date, excerpt, author, slug }: Props) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage slug={slug} title={title} src={coverImage} />
      </div>
      <h3 className="mb-3 text-3xl leading-snug">
        <Link href={`/blog/posts/${slug}`} className="hover:underline">
          {title}
        </Link>
      </h3>
      <div className="mb-4 text-lg text-gray-500">
        <DateFormatter dateString={date} />
      </div>
      <p className="mb-4 text-lg leading-relaxed text-pretty">{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </div>
  )
}
