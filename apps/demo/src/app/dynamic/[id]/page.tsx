import type { Metadata } from 'next'

// 约定
// 在app目录中，嵌套的文件夹定义了路由结构，路由中的每个文件夹代表一个路由段。
// 每个路由段都映射到 URL 路径中的对应段。文件（如page.jsx和布局layout.jsx）用于创建所在段的UI。

// `fetch` 默认是强制缓存返回结果可复用，也可使用 cache 方法缓存数据
// import { cache } from 'react';
// export const getUser = cache(async (id: string) => {
//   const user = await db.user.findUnique({ id });
//   return user;
// });

interface ParamsType {
  params: Promise<{ id: string }>
}

async function getProduct(id: string) {
  // Sharing fetch requests between Server Components，不需要通过传递 props 参数，服务端组件之前共享请求结果
  // const res = await fetch(`https://.../api/products/${id}`);
  // return res.json();
  return { id, title: `产品${id}的标题` }
}

// 示例：使用 generateMetadata 来生成动态元数据。params 是来自路由的参数
export async function generateMetadata({ params }: ParamsType): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
  return { title: product.title }
}

// 示例：通过 dynamicParams 设置访问时所用路由参数不是通过 generateStaticParams 生成时的处理方式
// true (默认) - 根据需要生成的。
// false - 将返回404
export const dynamicParams = true

// 示例：构建时生成动态路由页面路由参数，替代原 getStaticPaths 功能
export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }]
}

// In Next 15 Dynamic APIs are Asynchronous
// The params and searchParams props that get provided to pages, layouts, metadata APIs, and route handlers.
// cookies(), draftMode(), and headers() from next/headers

// 路由参数示例：params
// app/shop/[slug]/page.js	/shop/1	            { slug: '1' }
// app/shop/[category]/[item]/page.js	/shop/1/2	{ category: '1', item: '2' }
// app/shop/[...slug]/page.js	/shop/1/2	        { slug: ['1', '2'] }

// 查询参数示例：searchParams
// /shop?a=1	    { a: '1' }
// /shop?a=1&b=2	{ a: '1', b: '2' }
// /shop?a=1&a=2	{ a: ['1', '2'] }

export default async function Page({ params }: ParamsType) {
  // Next.js会自动在 generateMetadata, generateStaticParams, Layouts、Pages和 Server Components之间自动删除重复获取相同数据的请求。
  const { id } = await params
  const product = await getProduct(id)

  // 示例：JSON-LD is a format for structured data that can be used by search engines to understand your content
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.id,
    image: product.id,
    description: product.id,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <p className="m-8 font-bold">Product Page title: {product.title}</p>
    </>
  )
}
