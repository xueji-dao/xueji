'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import prisma from '@/lib/prisma'

export async function createTodo(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    todo: z.string().min(1),
  })
  const parse = schema.safeParse({
    todo: formData.get('todo'),
  })

  if (!parse.success) {
    return { message: 'Failed to create todo' }
  }

  const data = parse.data

  try {
    await prisma.todo.create({
      data: {
        title: data.todo,
      },
    })

    revalidatePath('/demo/action')
    return { message: `Added todo ${data.todo}` }
  } catch (e) {
    return { message: 'Failed to create todo' }
  }
}

export async function deleteTodo(
  prevState: {
    message: string
  },
  formData: FormData,
) {
  const schema = z.object({
    id: z.string().min(1),
    todo: z.string().min(1),
  })
  const data = schema.parse({
    id: formData.get('id'),
    todo: formData.get('todo'),
  })

  try {
    await prisma.todo.delete({
      where: {
        id: parseInt(data.id),
      },
    })

    revalidatePath('/demo/action')
    return { message: `Deleted todo ${data.todo}` }
  } catch (e) {
    return { message: 'Failed to delete todo' }
  }
}
