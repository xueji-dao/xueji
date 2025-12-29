import { connection } from 'next/server'
import { CalendarIcon } from '@heroicons/react/24/outline'

import { fetchRevenue } from '@/lib/prisma/data'
import { generateYAxis } from '@/lib/utils'
import { lusitana } from '@/styles/fonts'

export default async function RevenueChart() {
  await connection() // 指示强制变为动态组件，希望它在运行时动态呈现，而不是在构建时静态呈现。
  const revenue = await fetchRevenue()
  const chartHeight = 350

  const { yAxisLabels, topLabel } = generateYAxis(revenue)

  if (!revenue || revenue.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>
  }

  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>Recent Revenue</h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 sm:grid-cols-13 md:gap-4">
          <div
            className="mb-6 hidden flex-col justify-between text-sm text-gray-400 sm:flex"
            style={{ height: `${chartHeight}px` }}>
            {yAxisLabels.map((label) => (
              <p key={label}>{label}</p>
            ))}
          </div>

          {revenue.map((month) => (
            <div key={month.month} className="flex flex-col items-center gap-2">
              <div
                className="w-full rounded-md bg-blue-300"
                style={{
                  height: `${(chartHeight / topLabel) * month.revenue}px`,
                }}></div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">{month.month}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center pt-3 pb-2">
          <CalendarIcon className="h-3 w-3 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  )
}
