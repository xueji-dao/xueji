'use client'

import { useParams } from 'next/navigation'

import { usePerson } from '@/lib/api'

export default function PersonPage() {
  const query = useParams()
  const { data, error, isLoading, isValidating } = usePerson(Array.isArray(query?.id) ? query.id[0] : query?.id || null)

  if (error) return <div>{error.message}</div>
  if (isLoading) return <div>Loading...</div>
  if (!data) return null

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Height</th>
          <th>Mass</th>
          <th>Hair color</th>
          <th>Skin color</th>
          <th>Eye color</th>
          <th>Gender</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          {isValidating ? (
            <td colSpan={7} align="center">
              Validating...
            </td>
          ) : (
            <>
              <td>{data.name}</td>
              <td>{data.height}</td>
              <td>{data.mass}</td>
              <td>{data.hair_color}</td>
              <td>{data.skin_color}</td>
              <td>{data.eye_color}</td>
              <td>{data.gender}</td>
            </>
          )}
        </tr>
      </tbody>
    </table>
  )
}
