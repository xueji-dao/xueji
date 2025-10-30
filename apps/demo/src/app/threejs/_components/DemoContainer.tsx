'use client'

import { ReactElement, ReactNode, useState } from 'react'

class Mesh {}
class BoxGeometry {}
class MeshStandardMaterial {}

const catalog = { mesh: Mesh, boxGeometry: BoxGeometry, meshStandardMaterial: MeshStandardMaterial }

function createInstance(type: string, props: any) {
  const Constructor = catalog[type as keyof typeof catalog]
  return Constructor ? new Constructor() : null
}

export function DemoContainer({ children }: { children?: ReactNode }) {
  const [result] = useState(() => {
    const element = Array.isArray(children) ? children[0] : children
    if (element && typeof element === 'object') {
      const instance = createInstance((element as ReactElement).type as string, (element as ReactElement).props)
      return instance ? `new THREE.${instance.constructor.name}()` : ''
    }
    return ''
  })

  return (
    <div className="rounded border-2 border-blue-500 bg-blue-50 p-4">
      <h3 className="mb-2 font-bold">📦 转换结果</h3>
      <pre className="rounded bg-black p-3 text-sm text-green-400">{result}</pre>
    </div>
  )
}
