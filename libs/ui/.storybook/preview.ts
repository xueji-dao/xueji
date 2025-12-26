// eslint-disable-next-line @nx/enforce-module-boundaries
import type { Preview } from '@storybook/nextjs'

// eslint-disable-next-line @nx/enforce-module-boundaries
import '../../../apps/webui/src/styles/global.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
