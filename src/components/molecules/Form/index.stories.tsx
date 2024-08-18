import React from 'react'

import {
  Input
} from '@chakra-ui/react'

import { StoryFn, Meta } from '@storybook/react'

import { Form as StoryComponent } from '.'

export default {
  title: 'molecules/Form',
  component: StoryComponent,
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>
) => (
  <StoryComponent {...args}><Input type='email' /></StoryComponent>
)

export const Default = Template.bind({})
Default.args = {
  isError: true,
  helperText: 'いろいろ間違ってます',
  label: 'Email'
}

export const Vertically = Template.bind({})
Vertically.args = {
  isError: true,
  helperText: 'いろいろ間違ってます',
  arrangement: 'vertically',
  label: 'Email'
}
