import { ClockStoreProvider } from '@/providers'

export default function ClockLayout({ children }: { children: React.ReactNode }) {
  return <ClockStoreProvider lastUpdate={new Date().getTime()}>{children}</ClockStoreProvider>
}
