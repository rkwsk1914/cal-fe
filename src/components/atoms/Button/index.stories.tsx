import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { INPUT_ATTRIBUTE_OPTIONS } from '@/const/OptionStorybook'

import { Button as StoryComponent } from '.'

export default {
  title: 'atoms/Button',
  component: StoryComponent,
  argTypes: {
    size: INPUT_ATTRIBUTE_OPTIONS.size,
    onClick: { action: 'clicked' },
  },
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>,
) => <StoryComponent {...args}></StoryComponent>

export const Default = Template.bind({})
Default.args = {
  children: 'button',
  type: 'standard',
  disabled: false,
}

export const LinkType = Template.bind({})
LinkType.args = {
  children: 'button',
  type: 'standard',
  href: './',
  disabled: false,
}

export const ScrollType = Template.bind({})
ScrollType.args = {
  children: 'button',
  type: 'standard',
  toId: 'test',
  disabled: false,
}

export const SubmitType = Template.bind({})
SubmitType.args = {
  children: 'button',
  type: 'standard',
  submit: true,
  disabled: false,
}
