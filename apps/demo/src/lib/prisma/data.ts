import { formatCurrency } from '@/lib/utils'

import prisma from './index'

export async function fetchRevenue() {
  try {
    console.log('Fetching revenue data...', process.env.DATABASE_URL)
    // 模拟延时
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const data = await prisma.revenue.findMany({
      orderBy: {
        month: 'asc',
      },
    })

    console.log('Data fetch completed after 3 seconds.')
    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch revenue data.')
  }
}

export async function fetchCardData() {
  try {
    // 并行查询
    const invoiceCountPromise = prisma.invoice.count()
    const customerCountPromise = prisma.customer.count()
    const invoiceStatusPromise = prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'paid',
      },
    })
    const pendingStatusPromise = prisma.invoice.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        status: 'pending',
      },
    })

    // 模拟延时
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log('Fetching card data...')

    const [numberOfInvoices, numberOfCustomers, paidData, pendingData] = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
      pendingStatusPromise,
    ])

    const totalPaidInvoices = formatCurrency(paidData._sum.amount ?? 0)
    const totalPendingInvoices = formatCurrency(pendingData._sum.amount ?? 0)

    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch card data.')
  }
}

export async function fetchLatestInvoices() {
  try {
    const data = await prisma.invoice.findMany({
      take: 5,
      orderBy: {
        date: 'desc',
      },
      select: {
        id: true,
        amount: true,
        customer: {
          select: {
            name: true,
            email: true,
            image_url: true,
          },
        },
      },
    })

    const latestInvoices = data.map((invoice) => ({
      id: invoice.id,
      amount: formatCurrency(invoice.amount),
      name: invoice.customer.name,
      email: invoice.customer.email,
      image_url: invoice.customer.image_url,
    }))

    return latestInvoices
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch the latest invoices.')
  }
}

const ITEMS_PER_PAGE = 6

export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE

  try {
    const invoices = await prisma.invoice.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          {
            customer: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            customer: {
              email: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            amount: {
              equals: isNaN(Number(query)) ? undefined : Number(query) * 100,
            },
          },
          {
            status: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        amount: true,
        date: true,
        status: true,
        customer: {
          select: {
            name: true,
            email: true,
            image_url: true,
          },
        },
      },
      orderBy: {
        date: 'desc',
      },
    })

    return invoices.map((invoice) => ({
      id: invoice.id,
      amount: invoice.amount,
      date: invoice.date,
      status: invoice.status,
      name: invoice.customer.name,
      email: invoice.customer.email,
      image_url: invoice.customer.image_url,
    }))
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoices.')
  }
}

export async function fetchInvoicesPages(query: string) {
  try {
    const count = await prisma.invoice.count({
      where: {
        OR: [
          {
            customer: {
              name: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            customer: {
              email: {
                contains: query,
                mode: 'insensitive',
              },
            },
          },
          {
            amount: {
              equals: isNaN(Number(query)) ? undefined : Number(query) * 100,
            },
          },
          {
            status: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
    })

    const totalPages = Math.ceil(count / ITEMS_PER_PAGE)
    return totalPages
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch total number of invoices.')
  }
}

export async function fetchInvoiceById(id: string) {
  try {
    console.log(id)
    const invoice = await prisma.invoice.findUnique({
      where: {
        id: id,
      },
      select: {
        id: true,
        customer_id: true,
        amount: true,
        status: true,
      },
    })

    if (!invoice) {
      throw new Error('Invoice not found')
    }

    return {
      ...invoice,
      amount: invoice.amount / 100,
    }
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch invoice.')
  }
}

export async function fetchCustomers() {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        id: true,
        name: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    return customers
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch all customers.')
  }
}

export async function fetchFilteredCustomers(query: string) {
  try {
    const customers = await prisma.customer.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query,
              mode: 'insensitive',
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        email: true,
        image_url: true,
        invoices: {
          select: {
            id: true,
            amount: true,
            status: true,
          },
        },
      },
      orderBy: {
        name: 'asc',
      },
    })

    return customers.map((customer) => {
      const totalInvoices = customer.invoices.length
      const totalPending = customer.invoices
        .filter((invoice) => invoice.status === 'pending')
        .reduce((sum, invoice) => sum + invoice.amount, 0)
      const totalPaid = customer.invoices
        .filter((invoice) => invoice.status === 'paid')
        .reduce((sum, invoice) => sum + invoice.amount, 0)

      return {
        id: customer.id,
        name: customer.name,
        email: customer.email,
        image_url: customer.image_url,
        total_invoices: totalInvoices,
        total_pending: formatCurrency(totalPending),
        total_paid: formatCurrency(totalPaid),
      }
    })
  } catch (err) {
    console.error('Database Error:', err)
    throw new Error('Failed to fetch customer table.')
  }
}
