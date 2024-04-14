import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { RateSlider as StoryComponent } from '.'


export default {
  title: 'Forms/Molecules/RateSlider',
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
  helpertext: 'this error',
  isValid: false,
  disabled: false,
  required: true,
  id: 'uncontrolled',
  label: '支払い方法',
  value: 40,
  isTest: true
}

