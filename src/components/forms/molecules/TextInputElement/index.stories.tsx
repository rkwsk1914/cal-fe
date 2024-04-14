import React from 'react'

import { action } from '@storybook/addon-actions'
import { StoryFn, Meta } from '@storybook/react'

import { INPUT_ATTRIBUTE_OPTIONS, INPUT_AUTO_COMPLETE_OPTIONS } from '@/const/form'

import { TextInputElement as StoryComponent } from '.'



export default {
  title: 'Forms/Molecules/TextInputElement',
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
  type: 'text',
  autoComplete: undefined,
  autoFocus: undefined,
  placeholder: undefined,
  minLength: undefined,
  maxLength: undefined,
  // style
  variant: undefined,
  size: 'sm',
  //control
  value: '',
  leftAddon: undefined,
  rightAddon: undefined,
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
  type: 'text',
  autoComplete: undefined,
  autoFocus: undefined,
  placeholder: undefined,
  minLength: undefined,
  maxLength: undefined,
  // style
  variant: undefined,
  size: 'sm',
  //control
  value: undefined,
  leftAddon: undefined,
  rightAddon: undefined,
}

export const Long = Template.bind({})
Long.args = {
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
  label: 'あああああああああああああああああああああああああああああああああああああ',
  disabled: false,
  required: false,
  readonly: false,
  type: 'text',
  autoComplete: undefined,
  autoFocus: undefined,
  placeholder: undefined,
  minLength: undefined,
  maxLength: undefined,
  // style
  variant: undefined,
  size: 'sm',
  //control
  value: undefined,
  leftAddon: undefined,
  rightAddon: undefined,
}

export const NoLabel = Template.bind({})
NoLabel.args = {
  // UI系
  unit: undefined,
  subText: undefined,
  // バリデーション系
  isValid: true,
  helpertext: undefined,
  // スタイル系
  isHidden: false,
  isNaked: false,
  isShowLabel: false,
  onChange: action('onChange'),
  onBlur: action('onBlur'),
  name: 'test',
  id: undefined,
  label: 'テスト',
  disabled: false,
  required: false,
  readonly: false,
  type: 'text',
  autoComplete: undefined,
  autoFocus: undefined,
  placeholder: undefined,
  minLength: undefined,
  maxLength: undefined,
  // style
  variant: undefined,
  size: 'sm',
  //control
  value: undefined,
  leftAddon: undefined,
  rightAddon: undefined,
}

export const WithUnit = Template.bind({})
WithUnit.args = {
  // UI系
  unit: '回',
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
  type: 'text',
  autoComplete: undefined,
  autoFocus: undefined,
  placeholder: undefined,
  minLength: undefined,
  maxLength: undefined,
  // style
  variant: undefined,
  size: 'sm',
  //control
  value: undefined,
  leftAddon: undefined,
  rightAddon: undefined,
}
