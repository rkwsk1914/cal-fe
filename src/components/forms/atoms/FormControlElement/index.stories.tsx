import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { FormControlElement as StoryComponent } from '.'

export default {
  title: 'Forms/Atoms/FormControlElement',
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
  children: <input type='text'/>,
  label: 'ラベル',
  isValid: false,
  helpertext: 'エラーです',
  required: true,
  unit: '円',
  subText: 'サブテキスト',
}

export const WithoutLabel = Template.bind({})
WithoutLabel.args = {
  children: <input type='text'/>,
  label: 'ラベル',
  isShowLabel: false,
  isValid: false,
  helpertext: 'エラーです',
  required: true,
  unit: '円',
  subText: 'サブテキスト',
}

