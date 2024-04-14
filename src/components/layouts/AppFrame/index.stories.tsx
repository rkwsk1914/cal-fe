import React from 'react'

import { Box } from '@chakra-ui/react'

import { StoryFn, Meta } from '@storybook/react'

import { AppFrame as StoryComponent } from '.'

export default {
  title: 'layout/AppFrame',
  component: StoryComponent,
  argTypes: {},
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>
) => (
  <StoryComponent {...args}></StoryComponent>
)

export const Default = Template.bind({})
Default.args = {
  children: <>contents</>
}

export const LongContent = Template.bind({})
LongContent.args = {
  children: <Box height={'2500px'} backgroundColor={'tomato'}>contents</Box>
}

