import GuestbookPage from './guestbook-page'

export type EntryType = {
  id: string
  name: string
  message: string
  createdAt: {
    isoString: string
  }
}

export default async function Page() {
  const entries = [{ id: '1', name: 'Aaron', message: 'Message', createdAt: { isoString: '2025-7-1' } }] as EntryType[]
  return <GuestbookPage entries={entries} />
}
