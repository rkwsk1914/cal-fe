import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { LinkMenu as StoryComponent } from '.'

export default {
  component: StoryComponent,
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>,
) => <StoryComponent {...args}></StoryComponent>

export const Default = Template.bind({})
Default.args = {
  list: [
    {
      href: '',
      label: 'label1'
    },
    {
      label: 'label2',
      subList: [
        {
          href: '',
          label: 'label2-1'
        },
        {
          href: '',
          label: 'label2-2'
        }
      ]
    },
    {
      href: '',
      label: 'label3'
    }
  ]
}
