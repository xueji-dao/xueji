import { CounterProvider } from './_components/Counter'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <CounterProvider>{children}</CounterProvider>
}
