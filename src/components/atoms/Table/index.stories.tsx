import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { Table as StoryComponent } from '.'

export default {
  component: StoryComponent,
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>,
) => <StoryComponent {...args}></StoryComponent>

export const Default = Template.bind({})
Default.args = {
  thRow: 3,
  thCol: 3,
  data: [
    ...[...Array(12)].map((_item, keyIndex) => (
      [`${keyIndex + 1}行`, <a key={keyIndex} href=''>リンク</a>, 'content', 'content', 'content', 'content', 'content', 'content', 'content', 'content', 'content']
    )),
    ...[...Array(12)].map((_item, keyIndex) => (
      [`${keyIndex + 12}行`, <a key={keyIndex} href=''>リンク</a>, 'content', 'content']
    )),
    ...[...Array(12)].map((_item, keyIndex) => (
      [`${keyIndex + 24}行`, <a key={keyIndex} href=''>リンク</a>, 'content', 'content', 'content', 'content', 'content', 'content', 'content', 'content', 'content']
    )),
  ]
}
