import Header from './Header'

export const metadata = {
  title: 'Superblog',
  description: 'A blog app using Next.js and Prisma',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
