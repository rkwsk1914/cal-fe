import { AutoCompleteType } from './AutoCompleteType'
import { TextInputTypeOptionType } from './TextInputTypeOptionTyped'

//  | number | boolean | nullは許容しない
type InputValue = string | number | undefined
interface ReactHookFormType {
  onChange?: (_e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onBlur?: (_e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void
}
interface BaseProps extends ReactHookFormType {
  name: string
  id?: string
  label?: string
  disabled?: boolean
  required?: boolean
  readonly? :boolean
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
  type?: TextInputTypeOptionType
  autoComplete?: AutoCompleteType
  autoFocus?: boolean
  placeholder?: string
  minLength?: number
  maxLength?: number
}

export type ChakuraUISizeTypes = 'xs' | 'sm' | 'md' | 'lg'
export type ChakuraUIVariantTypes = 'outline' | 'filled' | 'flushed' | 'unstyled'

export type InputStyleChakura = {
  variant?: ChakuraUIVariantTypes,
  size?: ChakuraUISizeTypes
}
