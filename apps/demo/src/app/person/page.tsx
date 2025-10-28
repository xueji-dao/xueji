'use client'

import Link from 'next/link'
import { usePersonList } from '@/api'

import type { Person } from '@/types/person'
import { AppErrorBoundary } from '@/components/ErrorBoundary'

import { DedupeManualTest } from './_components/DedupeManualTest'
import { DedupeTest } from './_components/DedupeTest'
import { ErrorTestComponent } from './_components/ErrorTestComponent'

type PersonProps = {
  person: Person
}

export default function Index() {
  const { data, error, isLoading } = usePersonList()
  if (error) return <div>Failed to load</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  function PersonComponent({ person }: PersonProps) {
    return (
      <li>
        <Link href={`/person/${person.id}`}>{person.name}</Link>
      </li>
    )
  }

  return (
    <div>
      <AppErrorBoundary>
        <ErrorTestComponent />
      </AppErrorBoundary>

      <DedupeTest />
      <DedupeManualTest />

      <h2 className="mt-6 text-xl font-bold">人员列表</h2>
      <ul>
        {data.map((p) => (
          <PersonComponent key={p.id} person={p} />
        ))}
      </ul>
    </div>
  )
}
