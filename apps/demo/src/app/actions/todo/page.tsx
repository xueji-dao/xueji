import prisma from '@/lib/prisma'

import { AddForm } from './add-form'
import { DeleteForm } from './delete-form'

export default async function Home() {
  const todos = await prisma.todo.findMany()

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-2xl px-4">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">Todo List</h1>

        <div className="mb-8">
          <AddForm />
        </div>

        {todos.length === 0 ? (
          <div className="rounded-lg bg-white p-8 text-center shadow-sm">
            <p className="text-gray-500">No todos yet. Add one above!</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {todos.map((todo) => (
              <li key={todo.id} className="flex items-center justify-between rounded-lg bg-white p-4 shadow-sm">
                <span className="text-gray-900">{todo.title}</span>
                <DeleteForm id={todo.id} todo={todo.title} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
