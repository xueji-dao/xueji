import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import Image from 'next/image'
// drei: React Three Fiber 的实用工具库
import { Plane, useAspect, useTexture } from '@react-three/drei'
// fiber: React Three.js 渲染器
import { Canvas, useFrame } from '@react-three/fiber'
// postprocessing: 后处理效果库
import { DepthOfField, EffectComposer, Vignette } from '@react-three/postprocessing'
import { MaskFunction } from 'postprocessing'
import { ErrorBoundary } from 'react-error-boundary'
import { MathUtils, SRGBColorSpace, Vector3 } from 'three'

// 导入场景资源图片
import bearUrl from '../resources/bear.png'
import bgUrl from '../resources/bg.jpg'
import groundUrl from '../resources/ground.png'
import leaves1Url from '../resources/leaves1.png'
import leaves2Url from '../resources/leaves2.png'
import starsUrl from '../resources/stars.png'
import Fireflies from './Fireflies'
// 导入自定义材质
import '@/lib/materials/layerMaterial'

/**
 * 主要的 3D 场景体验组件
 * 创建多层视差效果的森林场景，包含背景、星空、地面、熊、树叶等层次
 */
function Experience() {
  // 计算不同宽高比的缩放比例
  // scaleN: 窄屏比例 (1600x1000)，scaleW: 宽屏比例 (2200x1000)
  const scaleN = useAspect(1600, 1000, 1.05)
  const scaleW = useAspect(2200, 1000, 1.05)

  console.log(bgUrl.src)

  // 批量加载所有纹理资源，提高性能
  const textures = useTexture([bgUrl.src, starsUrl.src, groundUrl.src, bearUrl.src, leaves1Url.src, leaves2Url.src])

  // 设置纹理颜色空间为 sRGB，避免图片发白
  // Three.js r152+ 默认使用线性颜色空间进行渲染
  // 图片文件（PNG/JPG）通常是 sRGB 编码的
  // 如果不设置 colorSpace = SRGBColorSpace，Three.js 会将 sRGB 图片当作线性数据处理，导致颜色变淡发白
  // 设置后，Three.js 会自动进行 sRGB → 线性的转换，保证颜色正确
  textures.forEach((texture) => {
    texture.colorSpace = SRGBColorSpace
  })

  // 场景组的引用，用于整体变换
  const group = useRef()
  // 各层材质的引用数组，用于动画更新
  const layersRef = useRef([])
  // 鼠标移动向量，用于视差效果
  const [movement] = useState(() => new Vector3())
  // 临时向量，避免每帧创建新对象
  const [temp] = useState(() => new Vector3())

  // 定义场景的各个层次，从后到前排列
  const layers = [
    // 0: 背景层 (最远)
    { texture: textures[0], x: 0, y: 0, z: 0, factor: 0.005, scale: scaleW },
    // 1: 星空层
    { texture: textures[1], x: 0, y: 0, z: 10, factor: 0.005, scale: scaleW },
    // 2: 地面层
    { texture: textures[2], x: 0, y: 0, z: 20, scale: scaleW },
    // 3: 熊层 (主角)
    {
      texture: textures[3],
      x: 0,
      y: 0,
      z: 30,
      scaleFactor: 0.83, // 缩小熊的尺寸
      scale: scaleN,
    },
    // 4: 前景树叶层 1
    {
      texture: textures[4],
      x: 0,
      y: 0,
      z: 40,
      factor: 0.03, // 视差因子
      scaleFactor: 1,
      wiggle: 0.6, // 摆动效果强度
      scale: scaleW,
    },
    // 5: 前景树叶层 2 (最前)
    {
      texture: textures[5],
      x: -20,
      y: -20,
      z: 49,
      factor: 0.04,
      scaleFactor: 1.3, // 放大前景
      wiggle: 1, // 最强摆动效果
      scale: scaleW,
    },
  ]

  // 每帧更新动画
  useFrame((state, delta) => {
    // 平滑插值鼠标位置，创建视差移动效果
    movement.lerp(temp.set(state.pointer.x, state.pointer.y * 0.2, 0), 0.2)

    // 根据鼠标位置调整整个场景的位置和旋转
    group.current.position.x = MathUtils.lerp(group.current.position.x, state.pointer.x * 20, 0.05)
    group.current.rotation.x = MathUtils.lerp(group.current.rotation.x, state.pointer.y / 20, 0.05)
    group.current.rotation.y = MathUtils.lerp(group.current.rotation.y, -state.pointer.x / 2, 0.05)

    // 更新前景树叶层的时间 uniform，用于摆动动画
    layersRef.current[4].uniforms.time.value = layersRef.current[5].uniforms.time.value += delta
  }, 1) // 优先级设为 1

  return (
    <group ref={group}>
      {/* 萤火虫效果：20只橙色萤火虫，飞行半径80 */}
      <Fireflies count={20} radius={80} colors={['orange']} />

      {/* 渲染所有图层 */}
      {layers.map(({ scale, texture, ref, factor = 0, scaleFactor = 1, wiggle = 0, x, y, z }, i) => (
        <Plane
          scale={scale}
          // 如果有摆动效果，增加几何体细分度以支持顶点动画
          args={[1, 1, wiggle ? 10 : 1, wiggle ? 10 : 1]}
          position={[x, y, z]}
          key={i}
          ref={ref}>
          {/* 自定义层材质，支持视差、摆动、纹理等效果 */}
          <layerMaterial
            movement={movement} // 鼠标移动向量
            textr={texture} // 纹理
            factor={factor} // 视差因子
            ref={(el) => (layersRef.current[i] = el)}
            wiggle={wiggle} // 摆动强度
            scale={scaleFactor} // 缩放因子
          />
        </Plane>
      ))}
    </group>
  )
}

/**
 * 后处理效果组件
 * 添加景深和晕影效果，增强视觉层次感
 */
function Effects() {
  const ref = useRef()

  // 在组件挂载后配置景深效果的遮罩
  useLayoutEffect(() => {
    const maskMaterial = ref.current.maskPass.getFullscreenMaterial()
    // 设置遮罩混合模式：乘法混合并设置 Alpha
    maskMaterial.maskFunction = MaskFunction.MULTIPLY_RGB_SET_ALPHA
  })

  return (
    <EffectComposer disableNormalPass multisampling={0}>
      {/* 景深效果：焦点在 z=30 (熊的位置)，模糊强度8 */}
      <DepthOfField ref={ref} target={[0, 0, 30]} bokehScale={8} focalLength={0.1} width={1024} />
      {/* 晕影效果：边缘变暗 */}
      <Vignette />
    </EffectComposer>
  )
}

/**
 * 降级场景组件
 * 当 WebGL 不可用或出错时显示的静态图片
 */
function FallbackScene() {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#010101',
      }}>
      <Image
        src="/images/ogimage.jpg"
        alt="Zustand Bear"
        fill
        style={{
          objectFit: 'cover',
        }}
      />
    </div>
  )
}

/**
 * 主场景组件
 * 整合 3D Canvas、错误边界、Suspense 等功能
 */
export default function Scene() {
  return (
    <ErrorBoundary FallbackComponent={FallbackScene}>
      <Canvas
        orthographic // 使用正交投影，避免透视变形
        gl={{
          antialias: false, // 关闭抗锯齿以提高性能
        }}
        camera={{
          zoom: 5, // 相机缩放
          position: [0, 0, 200], // 相机位置
          far: 300, // 远裁剪面
          near: 50, // 近裁剪面
        }}
        onCreated={(state) => {
          // 将事件连接到根元素，确保鼠标交互正常工作
          state.events.connect?.(document.getElementById('root'))
        }}
        fallback={<FallbackScene />}>
        <Suspense fallback={null}>
          {/* Suspense 防止 React Strict Mode 在开发环境下的双重挂载导致纹理加载器重复工作，避免 GPU 资源冲突和 WebGL 上下文丢失 */}
          <Experience />
        </Suspense>

        {/* 后处理效果 */}
        <Effects />
      </Canvas>
    </ErrorBoundary>
  )
}
