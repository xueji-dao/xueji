import { ThemeSwitcher } from '../blog/_components/theme-switcher'

export const metadata = {
  title: 'Image Component with Next.js',
  description:
    'This page demonstrates the usage of the next/image component with live examples. This component is designed to automatically optimize images on-demand as the browser requests them.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="dark:bg-slate-900 dark:text-slate-400">
      <ThemeSwitcher />
      {children}
    </div>
  )
}
