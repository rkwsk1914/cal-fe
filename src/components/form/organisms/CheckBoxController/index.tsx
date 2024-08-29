import * as React from 'react'

import { FieldErrors, useController } from 'react-hook-form'

import { useGetInputData } from '@/hooks/form/useGetInputData'

import { CheckBox } from '@/components/form/molecules/CheckBox'
import { FormControl, ArrangementType } from '@/components/form/molecules/FormControl'

import type { CheckBoxElementType, FieldKey, ControlType } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  control: ControlType
  errors: FieldErrors<any>
  data: CheckBoxElementType
  arrangement?: ArrangementType
  disabled?: boolean
  helperText?: React.ReactNode | string
};

export const CheckBoxController: React.FC<Props> = (
  {
    name,
    control,
    errors,
    data,
    arrangement,
    disabled,
    helperText,
  }
): JSX.Element => {
  const {
    label,
    suffix,
  } =  useGetInputData(name)

  const { field, fieldState } = useController({
    control,
    name,
  })

  return (
    <FormControl
      label={label}
      arrangement={arrangement}
      isError={errors[name] ? true : fieldState.error ? true : false}
      helperText={
        errors[name]?.message
          ? (errors[name]?.message as string)
          : fieldState.error?.message
          ? fieldState.error?.message
          : helperText
      }
      suffix={suffix}
    >
      <CheckBox
        data={data}
        field={field}
        disabled={disabled}
      />
    </FormControl>
  )
}
