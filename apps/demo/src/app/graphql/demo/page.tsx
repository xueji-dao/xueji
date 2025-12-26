'use client'

import { useQuery } from '@tanstack/react-query'

import { graphql } from '@/lib/graphql/codegen'
import { execute } from '@/lib/graphql/execute'

const PeopleCountQuery = graphql(`
  query PeopleCount {
    allPeople {
      totalCount
    }
  }
`)

// execute(PeopleCountQuery).then((data) => {
//   console.log(data)
// })

export default function Page() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['people'],
    queryFn: () => execute(PeopleCountQuery),
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  console.log(data)
  return <div>There are {data?.allPeople?.totalCount} people</div>
}
