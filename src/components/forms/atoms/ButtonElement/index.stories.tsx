import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { ButtonElement as StoryComponent } from '.'



export default {
  title: 'Forms/Atoms/ButtonElement',
  component: StoryComponent,
  argTypes: {}
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args?: React.ComponentProps<typeof StoryComponent>
) => (
  <StoryComponent {...args}></StoryComponent>
)

export const Default = Template.bind({})
Default.args = {
  children: 'Sample',
}
