'use client'

import { SimpleLayout } from '@/layouts/simple'
import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { useTabs } from 'minimal-shared/hooks'

import { AnimateBackground } from './background'
import { AnimateDialog } from './dialog'
import { AnimateInview } from './inview'
import { AnimateOther } from './other'
import { AnimateScroll } from './scroll'
import { backgroundOptions, inviewOptions, scrollOptions } from './variant-keys'

// ----------------------------------------------------------------------

const TABS = [
  { value: 'inview', label: 'In View', component: <AnimateInview options={inviewOptions} /> },
  { value: 'scroll', label: 'Scroll', component: <AnimateScroll options={scrollOptions} /> },
  { value: 'dialog', label: 'Dialog', component: <AnimateDialog options={scrollOptions} /> },
  {
    value: 'background',
    label: 'Background',
    component: <AnimateBackground options={backgroundOptions} />,
  },
  { value: 'other', label: 'Other', component: <AnimateOther /> },
]

// ----------------------------------------------------------------------

export function AnimateView() {
  const tabs = useTabs('inview')

  return (
    <div className="flex w-full flex-col items-center p-3">
      <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: 5 }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} value={tab.value} label={tab.label} />
        ))}
      </Tabs>

      {TABS.map(
        (tab) =>
          tab.value === tabs.value && (
            <Box sx={{ width: '100%' }} key={tab.value}>
              {tab.component}
            </Box>
          ),
      )}
    </div>
  )
}
