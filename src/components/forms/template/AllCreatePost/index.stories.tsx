import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { AllCreatePost as StoryComponent } from '.'

export default {
  title: 'Forms/template/AllCreatePost',
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
Create.args = {}
