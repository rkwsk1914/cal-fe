import React from 'react'

import { Box } from '@chakra-ui/react'

import { action } from '@storybook/addon-actions'
import { StoryFn, Meta } from '@storybook/react'


import { SwipeComponent as StoryComponent } from '.'

export default {
  title: 'Atoms/SwipeComponent',
  component: StoryComponent,
  argTypes: {}
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>
) => (
  <StoryComponent {...args}></StoryComponent>
)

export const Default = Template.bind({})
Default.args = {
  children: [
    <Box key={1} bg='skyBlue' w='100%' p={4} color='white'>
      This is the Box1
    </Box>,
    <Box key={2} bg='tomato' w='100%' p={4} color='white'>
      This is the Box2
    </Box>,
    <Box key={3} bg='yellowGreen' w='100%' p={4} color='white'>
      This is the Box3
    </Box>
  ],
  initialSlide: 1,
  onSlideChange: () => action('onSlideChange'),
  onSwiper: (swiper) => action('onSwiper')(swiper),
  onReachEnd: (swiper) => action('onReachEnd')(swiper),
  onReachBeginning: (swiper) => action('onReachBeginning')(swiper),
}
