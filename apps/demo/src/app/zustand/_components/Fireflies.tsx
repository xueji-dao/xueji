import { useMemo, useRef } from 'react'
// extend: 扩展 Three.js 对象到 JSX 元素，useFrame: 每帧执行的钩子函数
import { extend, useFrame } from '@react-three/fiber'
// meshline: 用于创建可变宽度线条的 Three.js 扩展库
import * as meshline from 'meshline'
import { CatmullRomCurve3, Vector3 } from 'three'

// 将 meshline 库的组件扩展到 react-three-fiber 中，使其可以在 JSX 中使用
extend(meshline)

// 生成随机数的辅助函数，确保最小值为 0.2，用于控制萤火虫轨迹的随机性
const r = () => Math.max(0.2, Math.random())

/**
 * 单条萤火虫轨迹组件
 * @param curve - 萤火虫飞行的曲线路径点数组
 * @param color - 萤火虫的颜色
 */
function Fatline({ curve, color }) {
  // 引用材质对象，用于动画更新
  const material = useRef()

  // 每帧更新虚线偏移，创建流动效果
  // delta 是帧间时间差，除以 100 控制流动速度
  useFrame((state, delta) => (material.current.uniforms.dashOffset.value -= delta / 100))

  return (
    <mesh>
      {/* 使用 meshline 几何体，传入曲线点数组 */}
      <meshLineGeometry points={curve} />
      {/* meshline 材质配置:
          - transparent: 启用透明度
          - lineWidth: 线条宽度 0.01
          - dashArray: 虚线间隔 0.1
          - dashRatio: 虚线比例 0.99 (几乎全是虚线) */}
      <meshLineMaterial ref={material} transparent lineWidth={0.01} color={color} dashArray={0.1} dashRatio={0.99} />
    </mesh>
  )
}

/**
 * 萤火虫群组件 - 创建多条随机飞行轨迹模拟萤火虫效果
 * @param count - 萤火虫数量
 * @param colors - 可选颜色数组，随机选择
 * @param radius - 飞行半径范围，默认 10
 */
export default function Fireflies({ count, colors, radius = 10 }) {
  // 使用 useMemo 缓存萤火虫轨迹数据，避免每次渲染重新计算
  const lines = useMemo(
    () =>
      // 创建指定数量的萤火虫轨迹
      new Array(count).fill().map(() => {
        // 初始位置：在半径范围内的随机点
        const pos = new Vector3(Math.sin(0) * radius * r(), Math.cos(0) * radius * r(), 0)

        // 生成 30 个控制点，构成螺旋或圆形轨迹
        const points = new Array(30).fill().map((_, index) => {
          // 计算角度：每个点间隔 2π/20，形成螺旋
          const angle = (index / 20) * Math.PI * 2
          // 在当前位置基础上添加螺旋偏移，clone() 避免修改原始位置
          return pos.add(new Vector3(Math.sin(angle) * radius * r(), Math.cos(angle) * radius * r(), 0)).clone()
        })

        // 使用 Catmull-Rom 样条曲线平滑连接控制点，生成 100 个插值点
        const curve = new CatmullRomCurve3(points).getPoints(100)

        return {
          // 从颜色数组中随机选择一个颜色
          color: colors[parseInt(colors.length * Math.random())],
          curve,
        }
      }),
    [count, radius, colors], // 依赖项：当这些值变化时重新计算
  )

  return (
    // 将整个萤火虫群组定位到场景中的特定位置
    <group position={[-radius * 2, -radius, 0]}>
      {/* 渲染每条萤火虫轨迹 */}
      {lines.map((props, index) => (
        <Fatline key={index} {...props} />
      ))}
    </group>
  )
}

// 运行时转换为：
// const group = new THREE.Group()
// group.position.set(-radius * 2, -radius, 0)

// const mesh = new THREE.Mesh()
// const geometry = new meshline.MeshLineGeometry()
// geometry.setPoints(curve)

// const material = new meshline.MeshLineMaterial({ color })

// mesh.geometry = geometry
// mesh.material = material
// group.add(mesh)
// scene.add(group)
