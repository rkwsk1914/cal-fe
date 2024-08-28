import * as React from 'react'

import { FieldErrors, Controller } from 'react-hook-form'

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
  } =  useGetInputData(name)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl
          label={label}
          arrangement={arrangement}
          isError={!!errors[name]}
          helperText={errors[name]?.message ? errors[name]?.message  as string : helperText}
        >
          <CheckBox
            data={data}
            field={field}
            disabled={disabled}
          />
        </FormControl>
      )}
    />
  )
}
