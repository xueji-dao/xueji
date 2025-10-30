'use client'

import { useAtom } from 'jotai'

import { handleMouseDownAtom, handleMouseMoveAtom, handleMouseUpAtom, type Point } from '@/lib/store'

/**
 * 生产环境 Jotai 原子组织规范：
 *
 * 目录结构：
 * store/
 * ├── canvas.ts        # Canvas 领域完整状态
 * ├── user.ts          # User 领域完整状态
 * └── theme.ts         # Theme 领域完整状态
 *
 * 文件内分组：
 * 1. 基础原子 - 存储原始状态，不依赖其他原子
 * 2. 派生原子 - 基于基础原子计算，只读或读写
 * 3. 动作原子 - 只写原子，封装业务逻辑
 * 4. 组件级原子 - 仅该组件使用的可写在组件内
 *
 * 导入规范：
 * ✅ import { dotsAtom } from '@/lib/store'
 * ❌ import { dotsAtom } from '@/lib/store/canvas'
 */

const SvgDots = () => {
  const [dots] = useAtom(handleMouseMoveAtom)
  return (
    <g>
      {dots.map(([x, y], index) => (
        <circle cx={x} cy={y} r="2" fill="#aaa" key={index} />
      ))}
    </g>
  )
}

export default function Canvas() {
  // 使用派生原子
  const [, handleMouseUp] = useAtom(handleMouseUpAtom)
  const [, handleMouseDown] = useAtom(handleMouseDownAtom)
  const [, handleMouseMove] = useAtom(handleMouseMoveAtom)

  // 等价模式：直接使用基础原子
  // const [, setDrawing] = useAtom(drawingAtom)
  // const handleMouseDown = () => setDrawing(true)
  // const handleMouseUp = () => setDrawing(false)
  return (
    <svg
      width="100vw"
      height="100vh"
      viewBox="0 0 100vw 100vh"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={(e) => {
        handleMouseMove([e.clientX, e.clientY - 104])
      }}>
      <rect width="100vw" height="100vh" fill="#eee" />
      <SvgDots />
    </svg>
  )
}
