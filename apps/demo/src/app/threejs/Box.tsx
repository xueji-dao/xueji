'use client'

import { useRef, useState } from 'react'
import { Box as NativeBox } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export default function Box(props: any) {
  const mesh = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01))

  return (
    <NativeBox
      args={[1, 1, 1]}
      {...props}
      ref={mesh}
      scale={active ? [6, 6, 6] : [5, 5, 5]}
      onClick={() => setActive(!active)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}>
      <meshStandardMaterial attach="material" color={hovered ? 'hotpink' : '#2f74c0'} />
    </NativeBox>
  )
}
