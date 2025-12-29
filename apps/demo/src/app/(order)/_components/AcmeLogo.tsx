import { GlobeAltIcon } from '@heroicons/react/24/outline'

import { lusitana } from '@/styles/fonts'

export default function AcmeLogo() {
  return (
    <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
      <GlobeAltIcon className="h-6 w-6 rotate-15" />
      <p className="text-[44px]">Acme</p>
    </div>
  )
}
