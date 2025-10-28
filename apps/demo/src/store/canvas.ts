/**
 * Canvas 领域 - 完整状态管理
 *
 * 生产环境 Jotai 原子组织规范：
 * 1. 按领域(domain)创建单个文件：canvas.ts, user.ts, theme.ts
 * 2. 文件内按类型分组：基础原子 → 派生原子 → 动作原子
 * 3. 统一导入：import { dotsAtom } from '@/store'
 */

import { atom } from 'jotai'

export type Point = [number, number]

// ============ 基础原子 ============
// 存储原始状态，不依赖其他原子

// 基础原子：存储画布上的点
export const dotsAtom = atom<Point[]>([])

// 基础原子：绘制状态
export const drawingAtom = atom<boolean>(false)

// ============ 派生原子 ============
// 基于基础原子计算新值，只读或读写

// 派生读写原子：处理鼠标移动逻辑
// 等价于：
// const [dots] = useAtom(dotsAtom)
// const [drawing] = useAtom(drawingAtom)
// const [, setDots] = useAtom(dotsAtom)
// const handleMouseMove = (point: Point) => {
//   if (drawing) {
//     setDots(prev => [...prev, point])
//   }
// }
export const handleMouseMoveAtom = atom(
  (get) => get(dotsAtom),
  (get, set, update: Point) => {
    if (get(drawingAtom)) {
      set(dotsAtom, (prev) => [...prev, update])
    }
  },
)

// ============ 动作原子 ============
// 只写原子，封装业务逻辑，等价于 Redux action creators

// 只写原子：开始绘制
// 等价于：const [, setDrawing] = useAtom(drawingAtom); setDrawing(true)
export const handleMouseDownAtom = atom(null, (get, set) => {
  set(drawingAtom, true)
})

// 只写原子：停止绘制
// 等价于：const [, setDrawing] = useAtom(drawingAtom); setDrawing(false)
export const handleMouseUpAtom = atom(null, (get, set) => {
  set(drawingAtom, false)
})
