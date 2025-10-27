/**
 * Next.js 并行路由默认组件
 *
 * 何时使用：
 * 1. 初始访问 /photos 时 - @modal 插槽显示此组件（null = 不显示模态）
 * 2. 从 /photos/[id] 返回 /photos 时 - 模态关闭，显示此默认状态
 * 3. 直接刷新 /photos 页面时 - 确保 @modal 插槽有回退内容
 *
 * 测试方法：
 * 1. 访问 /photos → 应该只看到照片列表，无模态
 * 2. 点击照片 → 模态打开显示详情
 * 3. 按 ESC 或点击背景 → 模态关闭，回到此默认状态
 * 4. 在 /photos 页面刷新 → 不应该报错，@modal 插槽为空
 *
 * 注意：此组件返回 null 是正确的，表示 @modal 插槽不渲染任何内容
 */
export default function Default() {
  return null
}
