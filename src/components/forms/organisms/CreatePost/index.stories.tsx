import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { CreatePost as StoryComponent } from '.'

export default {
  title: 'Forms/Organisms/CreatePost',
  component: StoryComponent,
  argTypes: {
    option: { control: 'some option' },
  }
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>
) => (
  <StoryComponent {...args}></StoryComponent>
)


export const Create = Template.bind({})
Create.args = {
  color: 'red',
  type: 'question'
}
