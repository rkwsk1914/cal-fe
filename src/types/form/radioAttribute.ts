import * as React from 'react'

import { Control, ControllerRenderProps } from 'react-hook-form'

export type InputValue = string
export type DefaultValuesType = Record<string, InputValue>

export type RadioFiled = ControllerRenderProps<DefaultValuesType>

export type RadioElementType = {
  value: InputValue
  label: string | React.ReactNode
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
