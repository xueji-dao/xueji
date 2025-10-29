import type { AddModuleExports } from '@/lib/wasm/wasm'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import addWasm from '../../../../public/add.wasm?module'

const module$ = WebAssembly.instantiate(addWasm)

export async function GET() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const instance = (await module$) as any
  const exports = instance.exports as AddModuleExports
  const { add_one: addOne } = exports
  const number = addOne(11)

  return new Response(`got: ${number}`)
}

export const runtime = 'edge'
