import type { Meta, StoryObj } from '@storybook/react'
import { expect, within } from '@storybook/test'

import { Button } from './Button'

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    intent: 'primary',
    underline: false,
    children: 'Button',
    size: 'lg',
  },
  argTypes: {
    intent: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
    size: {
      options: ['sm', 'lg'],
      control: { type: 'select' },
    },
  },
}

type Story = StoryObj<typeof Button>

export const Default: Story = {
  render: (args) => <Button {...args} />,
}

export default meta

// export const Primary = {
//   args: {
//     intent: 'primary',
//     underline: false,
//     children: 'Button',
//     size: 'lg',
//   },
// }

export const Heading: Story = {
  args: {
    intent: 'primary',
    underline: false,
    children: 'Button',
    size: 'lg',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    expect(canvas.getByText(/Welcome to MyButton!/gi)).toBeTruthy()
  },
}
