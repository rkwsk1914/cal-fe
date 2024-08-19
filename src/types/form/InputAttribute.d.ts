
import { Control } from 'react-hook-form'

import { TEXT_INPUT_DATA } from '@/const/form/TextInputData'

import type { AutoCompleteType } from './AutoCompleteType'
import type { TextInputTypeOptionType } from './TextInputTypeOptionType'

//  | number | boolean | nullは許容しない
type InputValue = string | number | readonly string[] | undefined

export type DefaultValuesType = Record<keyof typeof TEXT_INPUT_DATA, InputValue>

interface BaseProps {
  id?: string
  label?: string
  readonly? :boolean
  control?: Control<DefaultValuesType, any>
}
interface ControlledProps extends BaseProps {
  value?: InputValue
  defaultValue?: never
}

interface UncontrolledProps extends BaseProps { // eslint-disable-line no-unused-vars
  value?: never
  defaultValue?: InputValue
}

export type InputProps = ControlledProps //  | UncontrolledProps

type reactInputMaskType = string

export type TextInputProps = InputProps & {
  inputTextArgs: {
    mask?: reactInputMaskType
    type?: TextInputTypeOptionType
    autoComplete?: AutoCompleteType
    autoFocus?: boolean
    placeholder?: string
    minLength?: number
    maxLength?: number
  }
}

export type ChakuraUISizeTypes = 'xs' | 'sm' | 'md' | 'lg'
export type ChakuraUIVariantTypes = 'outline' | 'filled' | 'flushed' | 'unstyled'

export type InputStyleChakura = {
  variant?: ChakuraUIVariantTypes,
  size?: ChakuraUISizeTypes
}
