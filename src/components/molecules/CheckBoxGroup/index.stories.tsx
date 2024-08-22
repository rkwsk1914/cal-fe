import React from 'react'

import { Input } from '@chakra-ui/react'

import { StoryFn, Meta } from '@storybook/react'

import { CheckBoxGroup as StoryComponent } from '.'

export default {
  component: StoryComponent,
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>,
) => (
  <StoryComponent {...args}>
    <Input type="email" />
  </StoryComponent>
)

export const Default = Template.bind({})
Default.args = {
  isError: true,
  helperText: 'いろいろ間違ってます',
  inputProps: {
    label: 'Email',
  },
  data: [
    { value: '1', label: 'itemA' },
    { value: '2', label: 'itemB' },
    { value: '3', label: 'itemC' },
    { value: '4', label: 'itemD' },
    { value: '5', label: 'itemE' },
    { value: '6', label: 'itemAF' },
  ]
}

export const Vertically = Template.bind({})
Vertically.args = {
  isError: true,
  helperText: 'いろいろ間違ってます',
  arrangement: 'vertically',
  inputProps: {
    label: 'Email',
  },
  data: [
    { value: '1', label: 'itemA' },
    { value: '2', label: 'itemB' },
    { value: '3', label: 'itemC' },
    { value: '4', label: 'itemD' },
    { value: '5', label: 'itemE' },
    { value: '6', label: 'itemAF' },
  ]
}
