import { Control, ControllerRenderProps } from 'react-hook-form'

import { CHECKBOX_DATA } from '@/const/form/CheckBoxData'

type InputValueType = string | number
export type InputValue = InputValueType[]
export type DefaultValuesType = Record<keyof typeof CHECKBOX_DATA, InputValue>

export type CheckBoxFiled = ControllerRenderProps<DefaultValuesType>

export type CheckBoxElementType = {
  value: InputValueType
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
