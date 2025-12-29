import { BanknotesIcon, ClockIcon, InboxIcon, UserGroupIcon } from '@heroicons/react/24/outline'

import { fetchCardData } from '@/lib/prisma/data'
import { lusitana } from '@/styles/fonts'

const iconMap = {
  collected: BanknotesIcon,
  customers: UserGroupIcon,
  pending: ClockIcon,
  invoices: InboxIcon,
}

export default async function CardWrapper() {
  const { numberOfInvoices, numberOfCustomers, totalPaidInvoices, totalPendingInvoices } = await fetchCardData()

  return (
    <>
      <Card title="Collected" value={totalPaidInvoices} type="collected" />
      <Card title="Pending" value={totalPendingInvoices} type="pending" />
      <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
      <Card title="Total Customers" value={numberOfCustomers} type="customers" />
    </>
  )
}

export function Card({
  title,
  value,
  type,
}: {
  title: string
  value: number | string
  type: 'invoices' | 'customers' | 'pending' | 'collected'
}) {
  const Icon = iconMap[type]

  return (
    <div className="rounded-xl bg-gray-50 p-1 shadow-sm">
      <div className="flex p-2">
        {Icon ? <Icon className="h-3 w-3 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-2 py-4 text-center text-2xl`}>
        {value}
      </p>
    </div>
  )
}
