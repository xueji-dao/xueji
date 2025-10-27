import { revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { tag } = await request.json()

    if (!tag) {
      return Response.json({ error: 'Tag is required' }, { status: 400 })
    }

    // 使缓存标签失效
    revalidateTag(tag, 'default')

    return Response.json({
      success: true,
      message: `Cache invalidated for tag: ${tag}`,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    return Response.json(
      {
        error: 'Failed to invalidate cache',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
