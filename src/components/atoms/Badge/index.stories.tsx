import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { Badge as StoryComponent, BadgeColorOptions } from '.'

export default {
  component: StoryComponent,
  argTypes: {
    colorScheme: {
      control: 'select', options: BadgeColorOptions
    },
  },
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>,
) => <StoryComponent {...args}></StoryComponent>

export const Default = Template.bind({})
Default.args = {
  children: 'Sample',
}
