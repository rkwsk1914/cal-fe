import React from 'react'

import { action } from '@storybook/addon-actions'
import { StoryFn, Meta } from '@storybook/react'

import { DateInput as StoryComponent } from '.'

export default {
  title: 'Forms/Organisms/DateInput',
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

const args: React.ComponentProps<typeof StoryComponent> = {
  // UI系
  unit: undefined,
  subText: undefined,
  // バリデーション系
  isValid: true,
  helpertext: undefined,
  // スタイル系
  isHidden: false,
  isNaked: false,
  isShowLabel: true,
  onChange: action('onChange'),
  onBlur: action('onBlur'),
  name: 'test',
  id: undefined,
  label: 'テスト',
  disabled: false,
  required: false,
  readonly: false,
  // style
  variant: undefined,
  size: undefined,
  //control
  value: '2022/3/21',
  isTest: true
}

export const Default = Template.bind({})
Default.args = args

export const DefaultSetValue = Template.bind({})
DefaultSetValue.args = args

export const Disabled = Template.bind({})
Disabled.args = {
  ...args,
  disabled: true
}

export const MissValue = Template.bind({})
MissValue.args = {
  ...args,
  value: 'aaaa',
}

export const MissValue2 = Template.bind({})
MissValue2.args = {
  ...args,
  value: '2022/2/28',
}

export const OnlyYear = Template.bind({})
OnlyYear.args = {
  ...args,
  value: '2022',
  pattern: 'yyyy',
}

export const OnlyMonth = Template.bind({})
OnlyMonth.args = {
  ...args,
  value: '12',
  pattern: 'M',
}

export const OnlyDay = Template.bind({})
OnlyDay.args = {
  ...args,
  value: '31',
  pattern: 'd',
}

export const MonthAndDay = Template.bind({})
MonthAndDay.args = {
  ...args,
  value: '3/31',
  pattern: 'M/d',
}