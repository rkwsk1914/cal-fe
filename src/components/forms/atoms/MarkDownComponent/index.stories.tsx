import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { MarkDownComponent as StoryComponent } from '.'

export default {
  title: 'Forms/Atoms/MarkDownComponent',
  component: StoryComponent,
  argTypes: {
    absoluteMatch: {
      control: 'boolean',
    },
  }
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>
) => (
  <StoryComponent {...args}></StoryComponent>
)

export const Default = Template.bind({})
Default.args = {
  children: 'aaa'
}
