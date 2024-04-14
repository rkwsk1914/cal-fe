import React from 'react'

import { action } from '@storybook/addon-actions'
import { StoryFn, Meta } from '@storybook/react'

import { SearchSelect as StoryComponent } from '.'



export default {
  title: 'Forms/Molecules/SearchSelect',
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
  size: undefined ,
  //control
  value: '',
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
  ],
  absoluteMatch: false,
  leftAddon: undefined,
  rightAddon: undefined,
}

export const Default = Template.bind({})
Default.args = args

export const Match = Template.bind({})
Match.args = {
  ...args,
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
  ],
}

export const IdName = Template.bind({})
IdName.args = {
  ...args,
  //control
  value: 'April Tucker',
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
  ],
  absoluteMatch: true,
}

export const Month = Template.bind({})
Month.args = {
  ...args,
  selectItems: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12'
  ],
  absoluteMatch: true,
}
