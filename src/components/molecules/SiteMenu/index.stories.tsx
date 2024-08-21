import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { SITE_MENU_DATA } from '@/const/SiteMenuData'

import { SiteMenu as StoryComponent } from '.'


export default {
  component: StoryComponent,
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>,
) => <StoryComponent {...args}></StoryComponent>

export const Default = Template.bind({})
Default.args = {
  list: SITE_MENU_DATA
}
