import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { CheckBox as StoryComponent } from '.'

export default {
  component: StoryComponent,
  argTypes: {
    option: { control: 'some option' },
  },
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>,
) => <StoryComponent {...args}></StoryComponent>

export const Default = Template.bind({})
Default.args = {
  data: [
    { value: '1', label: 'itemA' },
    { value: '2', label: 'itemB' },
    { value: '3', label: 'itemC' },
    { value: '4', label: 'itemD' },
    { value: '5', label: 'itemE' },
    { value: '6', label: 'itemAF' },
  ]
}
