'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma'

type ActionState = {
  success?: boolean
  error?: string
  fieldErrors?: {
    title?: string
    content?: string
    authorEmail?: string
  }
}

export async function createPostAction(prevState: ActionState, formData: FormData): Promise<ActionState> {
  const authorEmail = (formData.get('authorEmail') as string) || undefined
  const title = formData.get('title') as string
  const content = formData.get('content') as string

  // 验证必填字段
  const fieldErrors: ActionState['fieldErrors'] = {}

  if (!title?.trim()) {
    fieldErrors.title = 'Title is required'
  }

  if (!authorEmail?.trim()) {
    fieldErrors.authorEmail = 'Author email is required'
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { fieldErrors }
  }

  try {
    await prisma.post.create({
      data: {
        title,
        content,
        author: {
          connect: {
            email: authorEmail,
          },
        },
      },
    })
  } catch (error) {
    console.error('Error creating post:', error)

    if (error instanceof Error && error.message.includes('User')) {
      return {
        fieldErrors: {
          authorEmail: 'User with this email does not exist',
        },
      }
    }

    return {
      error: 'Failed to create post. Please try again.',
    }
  }

  // 成功后重定向（会抛出 NEXT_REDIRECT 异常，这是正常的）
  revalidatePath('/prisma/posts')
  redirect('/prisma/posts')
}

export async function deletePostAction(postId: number) {
  console.log('Deleting post with ID:', postId)

  try {
    const result = await prisma.post.delete({
      where: {
        id: postId,
      },
    })

    console.log('Post deleted successfully:', result)
  } catch (error) {
    console.error('Error deleting post:', error)
    throw new Error('Failed to delete post')
  }

  // 在 try-catch 外部执行重定向
  console.log('Redirecting to /prisma')
  revalidatePath('/prisma/posts')
  redirect('/prisma/posts')
}
