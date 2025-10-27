import Photo from '../../../_components/frame'
import Modal from '../../../_components/modal'
import swagPhotos from '../../../photos'

/**
 * Next.js 路由拦截示例：Intercepting Routes
 *
 * (.)photo 语法说明：
 * - (.) = 拦截同级路由
 * - (..) = 拦截上一级路由
 * - (..)(..) = 拦截上两级路由
 * - (...) = 拦截根级路由
 *
 * 场景：
 * - 客户端导航 /photos → /photos/photo/123
 *   被 (.)photo/[id] 拦截，在 @modal 插槽中显示模态框
 *
 * - 直接访问 /photos/photo/123
 *   不被拦截，显示完整页面 photo/[id]/page.tsx
 *
 * - 刷新页面在 /photos/photo/123
 *   不被拦截，显示完整页面
 *
 * 用户体验：
 * - 点击照片 → 模态框打开（快速）
 * - 分享链接 → 完整页面（SEO 友好）
 * - 刷新页面 → 完整页面（不丢失内容）
 */
export default async function PhotoModal({ params }: { params: Promise<{ id: string }> }) {
  const { id: photoId } = await params
  const photos = swagPhotos
  const photo = photoId && photos.find((p) => p.id === photoId)

  return (
    <Modal>
      <Photo photo={photo} />
    </Modal>
  )
}
