'use client'

import { useCallback, useEffect, useRef } from 'react'
import lottie, { AnimationItem } from 'lottie-web'

interface LottieIconProps {
  animationData?: object
  name?: string
  width?: number | string
  height?: number | string
  className?: string
  loop?: boolean
  autoplay?: boolean
  renderer?: 'svg' | 'canvas' | 'html'
  playOnHover?: boolean
  onComplete?: () => void
  onLoopComplete?: () => void
}

export const LottieIcon = ({
  animationData,
  name,
  width = 300,
  height = 300,
  className,
  loop = true,
  autoplay = true,
  renderer = 'svg',
  playOnHover = false,
  onComplete,
  onLoopComplete,
}: LottieIconProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<AnimationItem | null>(null)

  const stableOnComplete = useCallback(() => {
    onComplete?.()
  }, [onComplete])

  const stableOnLoopComplete = useCallback(() => {
    onLoopComplete?.()
  }, [onLoopComplete])

  useEffect(() => {
    if (!containerRef.current) return

    const path = name ? `/icons/lottie/${name}.json` : undefined

    animationRef.current = lottie.loadAnimation({
      container: containerRef.current,
      renderer,
      loop: playOnHover ? false : loop,
      autoplay: playOnHover ? false : autoplay,
      ...(animationData ? { animationData } : { path }),
    })

    const animation = animationRef.current

    if (onComplete) {
      animation.addEventListener('complete', stableOnComplete)
    }
    if (onLoopComplete) {
      animation.addEventListener('loopComplete', stableOnLoopComplete)
    }

    return () => {
      if (onComplete) {
        animation.removeEventListener('complete', stableOnComplete)
      }
      if (onLoopComplete) {
        animation.removeEventListener('loopComplete', stableOnLoopComplete)
      }
      animation.destroy()
    }
  }, [
    animationData,
    name,
    loop,
    autoplay,
    playOnHover,
    renderer,
    onComplete,
    onLoopComplete,
    stableOnComplete,
    stableOnLoopComplete,
  ])

  const handleMouseEnter = () => {
    if (playOnHover && animationRef.current) {
      animationRef.current.goToAndStop(0, true)
      animationRef.current.play()
    }
  }

  const handleMouseLeave = () => {
    if (playOnHover && animationRef.current) {
      animationRef.current.goToAndStop(0, true)
    }
  }

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ width, height }}
      onMouseEnter={playOnHover ? handleMouseEnter : undefined}
      onMouseLeave={playOnHover ? handleMouseLeave : undefined}
    />
  )
}
