'use client'

import { useEffect, useRef } from 'react'
import lottie, { AnimationItem } from 'lottie-web'

interface LottieIconProps {
  /** 动画文件路径或动画数据对象 */
  animationData?: object
  path?: string
  /** 容器样式 */
  width?: number | string
  height?: number | string
  className?: string
  /** 动画配置 */
  loop?: boolean
  autoplay?: boolean
  renderer?: 'svg' | 'canvas' | 'html'
  /** 事件回调 */
  onComplete?: () => void
  onLoopComplete?: () => void
}

export const LottieIcon = ({
  animationData,
  path,
  width = 300,
  height = 300,
  className,
  loop = true,
  autoplay = true,
  renderer = 'svg',
  onComplete,
  onLoopComplete,
}: LottieIconProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  useEffect(() => {
    if (!containerRef.current) return

    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer,
      loop,
      autoplay,
      ...(animationData ? { animationData } : { path }),
    })

    const animation = animationRef.current

    if (onComplete) {
      animation.addEventListener('complete', onComplete)
    }
    if (onLoopComplete) {
      animation.addEventListener('loopComplete', onLoopComplete)
    }

    return () => {
      if (onComplete) {
        animation.removeEventListener('complete', onComplete)
      }
      if (onLoopComplete) {
        animation.removeEventListener('loopComplete', onLoopComplete)
      }
      animation.destroy()
    }
  }, [animationData, path, loop, autoplay, renderer, onComplete, onLoopComplete])

  return <div ref={containerRef} className={className} style={{ width, height }} />
}
