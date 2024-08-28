import { Control, ControllerRenderProps, UseControllerProps } from 'react-hook-form'
import { Mask } from 'react-text-mask'

import { AUTO_COMPLETE_OPTIONS } from '@/const/form/AutoCompleteOptions'
import { INPUT_DATA, INPUT_ARRAY_DATA } from '@/const/form/InputData'

import type { TextInputTypeOptionType } from './TextInputTypeOptionType'

type AutoCompleteType = typeof AUTO_COMPLETE_OPTIONS[number]

export type FieldKey =
  | keyof typeof INPUT_DATA
  | keyof typeof INPUT_ARRAY_DATA
  | {
      [K in keyof typeof INPUT_ARRAY_DATA]: `${K}.${number}.${Extract<keyof typeof INPUT_ARRAY_DATA[K], string | number | bigint | boolean | null | undefined>}`;
    }[keyof typeof INPUT_ARRAY_DATA]

//  | number | boolean | nullは許容しない
export type InputValue = string | string[] | undefined
export type DefaultValuesType = Partial<
  Record<keyof typeof INPUT_DATA, InputValue> &
  {
    [key in keyof typeof INPUT_ARRAY_DATA]: Array<
      Record<keyof typeof INPUT_ARRAY_DATA[key], InputValue>
    >
  }
>

// checkBoxやRadioのReact Hook Formのcontrolから受け取るfield型情報
export type ControllerFiled = ControllerRenderProps<DefaultValuesType>

export type ControlType = Control<DefaultValuesType>

export type ControlRules = UseControllerProps<DefaultValuesType>['rules']
interface InputTextArgs {
  type?: TextInputTypeOptionType
  autoComplete?: AutoCompleteType
  autoFocus?: boolean
  placeholder?: string
  minLength?: number
  maxLength?: number
  inputMode?: 'text' | 'tel' | 'email' | 'search' | 'url' | 'numeric' | 'none' | 'decimal' | undefined

  mask?: Mask | ((_value: string) => Mask)
}

interface CommonProps {
  // id: string
  label?: string
  readonly? :boolean
  control?: ControlType
}

interface NotOtherTextInputProps extends CommonProps {
  onBlurFormat?: never
  inputTextArgs?: never
}

interface TextInputProps extends CommonProps {
  onBlurFormat?: (_value: string) => string
  inputTextArgs?: InputTextArgs
}

type BaseProps = NotOtherTextInputProps | TextInputProps

type ControlledProps = {
  value?: InputValue
  defaultValue?: never
} & BaseProps

type UncontrolledProps = { // eslint-disable-line no-unused-vars
  value?: never
  defaultValue?: InputValue
} & BaseProps

export type InputProps = ControlledProps //  | UncontrolledProps


// 選択要素の型
export type RadioElementType = {
  value: string
  label: string | React.ReactNode
}[]

export type CheckBoxElementType = RadioElementType

export type SelectOptionType = {
  value: string
  label: string
}[]