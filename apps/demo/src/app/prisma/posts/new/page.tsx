'use client'

import { useActionState } from 'react'
import Form from 'next/form'

import { createPostAction } from '../../actions'

type ActionState = {
  success?: boolean
  error?: string
  fieldErrors?: {
    title?: string
    content?: string
    authorEmail?: string
  }
}

export default function NewPost() {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(createPostAction, {})

  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-6 text-2xl font-bold">Create New Post</h1>

      {state.success && (
        <div className="mb-4 rounded-lg bg-green-100 p-4 text-green-700">Post created successfully!</div>
      )}

      {state.error && <div className="mb-4 rounded-lg bg-red-100 p-4 text-red-700">{state.error}</div>}

      <Form action={formAction} className="space-y-6">
        <div>
          <label htmlFor="title" className="mb-2 flex items-center text-lg font-medium">
            Title
            <span className="ml-2 rounded-lg bg-gray-500 px-2 py-1 text-xs font-semibold text-white">Required</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Enter your post title ..."
            className={`w-full rounded-lg border px-4 py-2 ${state.fieldErrors?.title ? 'border-red-500' : ''}`}
          />
          {state.fieldErrors?.title && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.title}</p>}
        </div>

        <div>
          <label htmlFor="content" className="mb-2 block text-lg font-medium">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            placeholder="Write your post content here ..."
            rows={6}
            className={`w-full rounded-lg border px-4 py-2 ${state.fieldErrors?.content ? 'border-red-500' : ''}`}
          />
          {state.fieldErrors?.content && <p className="mt-1 text-sm text-red-600">{state.fieldErrors.content}</p>}
        </div>

        <div>
          <label htmlFor="authorEmail" className="mb-2 block text-lg font-medium">
            Author
          </label>
          <input
            type="text"
            id="authorEmail"
            name="authorEmail"
            placeholder="Enter the email of the author here ..."
            className={`w-full rounded-lg border px-4 py-2 ${state.fieldErrors?.authorEmail ? 'border-red-500' : ''}`}
          />
          {state.fieldErrors?.authorEmail && (
            <p className="mt-1 text-sm text-red-600">{state.fieldErrors.authorEmail}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-lg bg-blue-500 py-3 text-white hover:bg-blue-600 disabled:opacity-50">
          {isPending ? 'Creating...' : 'Create Post'}
        </button>
      </Form>
    </div>
  )
}
