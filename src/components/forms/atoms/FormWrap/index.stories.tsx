import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { FormWrap as StoryComponent } from '.'

export default {
  title: 'Forms/Atoms/FormWrap',
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

const args = {
  children: <input type='text'/>,
  onSubmit: () => console.info('submit')
}

export const Create = Template.bind({})
Create.args = {
  ...args,
  phase: 'create'
}

export const Update = Template.bind({})
Update.args = {
  ...args,
  phase: 'update',
  onDelete: undefined
}

export const WithDelete = Template.bind({})
WithDelete.args = {
  ...args,
  phase: 'update',
  onDelete: () => console.info('delete')
}

export const SubText = Template.bind({})
SubText.args = {
  ...args,
  phase: 'create',
  submitButtonText: '入力する'
}
