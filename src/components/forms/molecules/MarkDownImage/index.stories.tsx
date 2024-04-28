import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { MarkDownImage as StoryComponent } from '.'

export default {
  title: 'Forms/molecules/MarkDownImage',
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
  markdown: 'こんなもの**ポップ**です。',
  type: 'welcome'
}
