import { CONFIG } from '@/global-config'
import { paths } from '@/routes'

import { Iconify } from '@/components/iconify'

import type { NavMainProps } from './main/nav/types'

// ----------------------------------------------------------------------

export const navData: NavMainProps['data'] = [
  { title: 'Home', path: '/', icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" /> },
  {
    title: 'Components',
    path: paths.components,
    icon: <Iconify width={22} icon="solar:atom-bold-duotone" />,
  },
  {
    title: 'Pages',
    path: '/pages',
    icon: <Iconify width={22} icon="solar:file-bold-duotone" />,
    children: [
      {
        subheader: 'Other',
        items: [
          { title: 'About us', path: paths.about },
          { title: 'Contact us', path: paths.contact },
          { title: 'Pricing', path: paths.pricing },
          { title: 'Payment', path: paths.payment },
          { title: 'Maintenance', path: paths.maintenance },
          { title: 'Coming soon', path: paths.comingSoon },
        ],
      },
      {
        subheader: 'Concepts',
        items: [
          { title: 'Posts', path: paths.post.root },
          { title: 'Post', path: paths.post.demo.details },
        ],
      },
      {
        subheader: 'Error',
        items: [
          { title: 'Page 403', path: paths.page403 },
          { title: 'Page 404', path: paths.page404 },
          { title: 'Page 500', path: paths.page500 },
        ],
      },
      { subheader: 'Dashboard', items: [{ title: 'Dashboard', path: CONFIG.auth.redirectPath || '#' }] },
    ],
  },
]
