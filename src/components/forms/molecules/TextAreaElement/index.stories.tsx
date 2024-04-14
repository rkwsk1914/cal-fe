import React from 'react'

import { action } from '@storybook/addon-actions'
import { StoryFn, Meta } from '@storybook/react'

import { INPUT_ATTRIBUTE_OPTIONS, INPUT_AUTO_COMPLETE_OPTIONS } from '@/const/form'

import { TextAreaElement as StoryComponent } from '.'



export default {
  title: 'Forms/Molecules/TextAreaElement',
  component: StoryComponent,
  argTypes: {
    ...INPUT_ATTRIBUTE_OPTIONS,
    ...INPUT_AUTO_COMPLETE_OPTIONS,
    type:{
      control: 'select', options: ['text','tel','email','number','password','search','url'],
    },
    autoFocus: {
      control: 'boolean',
    },
  }
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>
) => (
  <StoryComponent {...args}></StoryComponent>
)

export const Default = Template.bind({})
Default.args = {
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
  autoFocus: undefined,
  placeholder: undefined,
  minLength: undefined,
  maxLength: undefined,
  // style
  variant: undefined,
  size: 'sm',
  //control
  value: '',
}

export const Uncontrolled = Template.bind({})
Uncontrolled.args = {
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
  autoFocus: undefined,
  placeholder: undefined,
  minLength: undefined,
  maxLength: undefined,
  // style
  variant: undefined,
  size: 'sm',
  //control
  value: undefined,
}

