import rehypeKatex from 'rehype-katex'
import rehypePrettyCode from 'rehype-pretty-code'
// import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
// import remarkMdx from 'remark-mdx'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

export default async function markdownToHtml(markdown: string) {
  // const result = await remark().use(html).process(markdown)
  const file = await unified()
    .use(remarkParse)
    .use(remarkFrontmatter)
    // .use(remarkMdx)
    .use(remarkMath)
    .use(remarkGfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeKatex)
    .use(rehypePrettyCode, { theme: 'material-theme-palenight' })
    // .use(rehypeSanitize)
    .use(rehypeStringify)
    .process(markdown)
  return file.toString()
}
