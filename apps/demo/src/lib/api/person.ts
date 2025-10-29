import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'

import type { Person, ResponseError } from '@/types/person'
import api from '@/lib/axios-config'

export function usePerson(id: string | null) {
  return useSWR<Person, ResponseError>(id ? `/people/${id}` : null)
}

export function usePersonList() {
  return useSWR('/people')
}

export function usePersonListPaginated(page: number, limit: number) {
  return useSWR(`/people?page=${page}&limit=${limit}`)
}

export function usePersonSearch(query: string) {
  return useSWR(query ? `/people/search?q=${query}` : null)
}

async function updatePerson(url: string, { arg }: { arg: { id: string; data: any } }) {
  return api.put(`${url}/${arg.id}`, arg.data)
}

export function useUpdatePerson() {
  return useSWRMutation('/people', updatePerson)
}
