import { NextResponse } from 'next/server'

import { Person } from '@/types/person'

import { people } from './data'

export async function GET(): Promise<NextResponse<Person[]>> {
  return NextResponse.json(people)
}
