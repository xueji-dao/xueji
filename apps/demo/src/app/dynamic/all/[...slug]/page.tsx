// 示例
// [...folder], 捕获全部子路由
// 例如，app/shop/[…slug]/page.js 会匹配/shop/clothes，还会匹配/shop/clothes/tops， /shop/clothes/tops/t-shirts 等。
// [[...folder]], 全捕获, 除了本级及子路由也捕获父路由段，例如，app/shop/[[…slug]]/page.js 也会匹配/shop
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = await params
  return <p className="m-8 font-bold">Catch-all Segments {slug}</p>
}
