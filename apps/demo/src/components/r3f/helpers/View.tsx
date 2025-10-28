'use client'

import { forwardRef, useImperativeHandle, useRef } from 'react'
import { OrbitControls, View as ViewImpl } from '@react-three/drei'
import { ToThree } from './Three'

// View 子元素会渲染到 Scene 中的 Canvas
export const View = forwardRef(({ children, orbit, ...props }: any, ref) => {
  const localRef = useRef(null)
  useImperativeHandle(ref, () => localRef.current)

  return (
    <>
      <div ref={localRef} {...props} />
      <ToThree>
        {/* @ts-ignore */}
        <ViewImpl track={localRef}>
          {children}
          {orbit && <OrbitControls />}
        </ViewImpl>
      </ToThree>
    </>
  )
})
View.displayName = '3DView'
