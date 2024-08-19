import { Control, ControllerRenderProps } from 'react-hook-form'

import { RADIO_DATA } from '@/const/form/RadioData'

export type InputValue = string
export type DefaultValuesType = Record<keyof typeof RADIO_DATA, InputValue>

export type RadioFiled = ControllerRenderProps<DefaultValuesType>

export type RadioElementType = {
  value: InputValue
  label: string
}[]

interface BaseProps {
  id: string
  label?: string
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

