import React from 'react'

import { action } from "@storybook/addon-actions"
import { StoryFn, Meta } from '@storybook/react'

import {RefComponent as StoryComponent} from '.'

export default {
  title: 'Sample/RefComponent',
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

export const Default = Template.bind({})
Default.args = {
  children: 'Sample',
  onClick: () => action('action'),
}
