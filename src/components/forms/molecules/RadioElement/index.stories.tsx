import React from 'react'

import { action } from '@storybook/addon-actions'
import { StoryFn, Meta } from '@storybook/react'

import { INPUT_ATTRIBUTE_OPTIONS } from '@/const/form/OptionStorybook'

import { RadioElement as StoryComponent } from '.'


export default {
  title: 'Forms/Molecules/RadioElement',
  component: StoryComponent,
  argTypes: {
    ...INPUT_ATTRIBUTE_OPTIONS
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
  size: 'sm',
  //control
  value: undefined,
  selectItems: [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ]
}

export const Default = Template.bind({})
Default.args = args

export const DefaultSelect = Template.bind({})
DefaultSelect.args = {
  ...args,
  value: 'April Tucker',
  selectItems: [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ]
}

export const IdName = Template.bind({})
IdName.args = {
  ...args,
  value: 'j',
  selectItems: [
    { id: 'a', name: 'Oliver Hansen' },
    { id: 'b', name: 'Van Henry' },
    { id: 'c', name: 'April Tucker' },
    { id: 'd', name: 'Ralph Hubbard' },
    { id: 'e', name: 'Omar Alexander' },
    { id: 'f', name: 'Carlos Abbott' },
    { id: 'g', name: 'Miriam Wagner' },
    { id: 'h', name: 'Bradley Wilkerson' },
    { id: 'i', name: 'Virginia Andrews' },
    { id: 'j', name: 'Kelly Snyder' },
  ]
}
