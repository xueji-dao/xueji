import type { Components, Theme } from '@mui/material/styles'

import { appBar } from './appbar'
import { avatar } from './avatar'
import { checkbox } from './checkbox'
import { link } from './link'

// ----------------------------------------------------------------------

export const components: Components<Theme> = {
  ...appBar,
  ...avatar,
  ...checkbox,
  ...link,
}
