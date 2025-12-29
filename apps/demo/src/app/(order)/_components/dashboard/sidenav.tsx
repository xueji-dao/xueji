import { PowerIcon } from '@heroicons/react/24/outline'
import { Link } from 'next-view-transitions'

import AcmeLogo from '../AcmeLogo'
import NavLinks from './nav-links'

export default function SideNav() {
  return (
    <div className="flex h-full flex-col px-1 py-2 md:px-1">
      <Link className="mb-2 flex h-20 items-end justify-start rounded-md bg-blue-600 p-2 md:h-20" href="/">
        <div className="w-16 text-white md:w-20">
          <AcmeLogo />
        </div>
      </Link>
      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-y-2 md:space-x-0">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
        <form>
          <button className="flex h-3 w-full grow items-center justify-center gap-1 rounded-md bg-gray-50 p-1 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-3" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  )
}
