
import { UseFormRegisterReturn } from 'react-hook-form'

import { AutoCompleteType } from './AutoCompleteType'
import { TextInputTypeOptionType } from './TextInputTypeOptionType'

//  | number | boolean | nullは許容しない
type InputValue = string | number | undefined | boolean

interface BaseProps {
  id?: string
  label?: string
  readonly? :boolean
  helperText: string
  register?: UseFormRegisterReturn;
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

export type TextInputProps = InputProps & {
  inputTextArgs: {
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
