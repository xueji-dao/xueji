import { CounterStoreProvider } from '@/providers'

export default function CounterLayout({ children }: { children: React.ReactNode }) {
  return <CounterStoreProvider count={0}>{children}</CounterStoreProvider>
}
