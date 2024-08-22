
import { Control, ControllerRenderProps } from 'react-hook-form'

import { AUTO_COMPLETE_OPTIONS } from '@/const/form/AutoCompleteOptions'
import { INPUT_DATA } from '@/const/form/TextInputData'

import type { TextInputTypeOptionType } from './TextInputTypeOptionType'

type AutoCompleteType = typeof AUTO_COMPLETE_OPTIONS[number]

export type FieldKey = keyof typeof INPUT_DATA

//  | number | boolean | nullは許容しない
export type InputValue = string | string[] | undefined
export type DefaultValuesType = Partial<Record<FieldKey, InputValue>>

// checkBoxやRadioのReact Hook Formのcontrolから受け取るfield型情報
export type ControllerFiled = ControllerRenderProps<DefaultValuesType>

export type ControlType = Control<DefaultValuesType, any>
interface InputTextArgs {
  type?: TextInputTypeOptionType
  autoComplete?: AutoCompleteType
  autoFocus?: boolean
  placeholder?: string
  minLength?: number
  maxLength?: number
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