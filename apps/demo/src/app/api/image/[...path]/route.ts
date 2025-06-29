// TODO: set origin here
const SOURCE_IMAGE_ORIGIN = 'https://xuejiai.oss-cn-beijing.aliyuncs.com'

export async function GET(req: Request) {
  if (!req.headers.get('user-agent')) {
    // TODO: add any other checks here
    return new Response('Forbidden', { status: 403 })
  }
  const path = new URL(req.url).pathname.slice('/api/image'.length)
  if (!path) {
    return new Response('Bad Request', { status: 400 })
  }
  const res = await fetch(new URL(path, SOURCE_IMAGE_ORIGIN))
  console.log(new URL(path, SOURCE_IMAGE_ORIGIN))
  const { status, headers, body } = res
  return new Response(body, { status, headers })
}
