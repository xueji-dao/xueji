import { Suspense } from 'react'
import { Metadata } from 'next'

import { fetchInvoicesPages } from '@/lib/prisma/data'
import { lusitana } from '@/styles/fonts'

import { CreateInvoice } from '../../_components/invoices/buttons'
import Pagination from '../../_components/invoices/pagination'
import Table from '../../_components/invoices/table'
import Search from '../../_components/search'
import { InvoicesTableSkeleton } from '../../_components/skeletons'

export const metadata: Metadata = {
  title: 'Invoices',
}
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string
    page?: string
  }>
}) {
  const searchParams = await props.searchParams
  const query = searchParams?.query || ''
  const currentPage = Number(searchParams?.page) || 1
  const totalPages = await fetchInvoicesPages(query)

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}>
        <Table query={query} currentPage={currentPage} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  )
}
