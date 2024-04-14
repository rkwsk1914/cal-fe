import React from 'react'

import { StoryFn, Meta } from '@storybook/react'

import { AccordionWrap } from '@/components/atoms/AccordionWrap'

import { DataAccordion as StoryComponent } from '.'


export default {
  title: 'Atoms/DataAccordion',
  component: StoryComponent,
  argTypes: {}
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>
) => (
  <AccordionWrap>
    <StoryComponent {...args}></StoryComponent>
    <StoryComponent {...args}></StoryComponent>
    <StoryComponent {...args}></StoryComponent>
    <StoryComponent {...args}></StoryComponent>
    <StoryComponent {...args}></StoryComponent>
    <StoryComponent {...args}></StoryComponent>
    <StoryComponent {...args}></StoryComponent>
    <StoryComponent {...args}></StoryComponent>
    <StoryComponent {...args}></StoryComponent>
  </AccordionWrap>
)

export const Default = Template.bind({})
Default.args = {
  top: (
    <div>電気（3ヶ月前分）90001</div>
  ),
  bottom: (
    <>au PAY 電気</>
  )
}

export const TitleCell = Template.bind({})
TitleCell.args = {
  top: (
    <div>電気（3ヶ月前分）90001</div>
  ),
  bottom: (
    <>au PAY 電気</>
  ),
  isTitleCell: true
}


export const NoBottom = Template.bind({})
NoBottom.args = {
  top: (
    <div>電気（3ヶ月前分）90001</div>
  ),
}