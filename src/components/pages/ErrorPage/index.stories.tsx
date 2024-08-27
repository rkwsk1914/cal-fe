import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { ErrorPage as StoryComponent } from '.'

export default {
  title: 'Page/ErrorPage',
  component: StoryComponent,
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>
) => (
  <StoryComponent {...args}></StoryComponent>
)

export const NotFound404 = Template.bind({})
NotFound404.args = {
  errorId: 404
}

export const ServerSideError500 = Template.bind({})
ServerSideError500.args = {
  errorId: 500
}
