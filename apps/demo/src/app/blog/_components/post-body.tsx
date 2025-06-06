import markdownStyles from './markdown-styles.module.css'

type Props = {
  content: string
}

export function PostBody({ content }: Props) {
  return (
    <div className="mx-auto max-w-2xl">
      <div className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

// import { Typography } from '@mui/material'
// import { MDXRemote } from 'next-mdx-remote/rsc'
// import rehypeKatex from 'rehype-katex'
// import rehypePrettyCode from 'rehype-pretty-code'
// import remarkMath from 'remark-math'

// import { sans } from '@/lib/fonts'
// import { cn } from '@/lib/utils'

// // import Counter from '@/components/Counter'

// import CustomLink from './CustomLink'
// import Greeting from './Greeting'

// type Props = {
//   content: string
// }

// export async function PostBody({ content }: Props) {
//   const components = {
//     a: CustomLink, // 客户端组件
//     h1: (props: any) => (
//       <h1 {...props} className="text-2xl">
//         {props.children}
//       </h1>
//     ),
//     h2: (props: any) => <Typography variant="h2" {...props} />,
//     TestComponent: (await import('./TestComponent')).default,
//     // Counter: () => <Counter />,
//     Greeting: (props: any) => <Greeting {...props} />,
//   }

//   return (
//     <div className="mx-auto max-w-4xl">
//       {/* <MDXRemote
//         source={'[This is a link](https://www.xuejiai.com)<TestComponent name="next-mdx-remote" />'}
//         components={{ ...components }}
//       /> */}
//       {/* 使用 remark 解析 markdown 文件*/}
//       {/* <div className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: content }} /> */}
//       <div className={cn('markdown', sans.className)}>
//         <MDXRemote
//           source={content}
//           components={{ ...components }}
//           options={{
//             parseFrontmatter: true,
//             mdxOptions: {
//               remarkPlugins: [remarkMath],
//               rehypePlugins: [
//                 rehypeKatex,
//                 [
//                   rehypePrettyCode,
//                   {
//                     theme: 'material-theme-palenight',
//                   },
//                 ],
//               ],
//             },
//           }}
//         />
//       </div>
//     </div>
//   )
// }

//==================================
// export default function PostBody({ content }) {
//   return (
//     <div className="prose lg:prose-xl mx-auto max-w-2xl">
//       <div className="mb-6 block md:hidden">
//         {content.author.length ? (
//           <Avatar
//             name={`${content.author[0].firstName} ${content.author[0].lastName}`}
//             picture={content.author[0].profilePhoto}
//           />
//         ) : null}
//       </div>
//       <div className="mb-6 text-lg">
//         {content.postingDate !== 'now' ? (
//           <div className="mb-6 text-lg">
//             Posted <DateComponent dateString={content.postingDate} />
//           </div>
//         ) : null}
//       </div>
//       <ContentBlocks content={content.blogContent.json.content} />
//     </div>
//   )
// }
