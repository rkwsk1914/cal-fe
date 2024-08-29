import * as React from 'react'

import { FieldErrors, useController } from 'react-hook-form'

import { useGetInputData } from '@/hooks/form/useGetInputData'

import { FormControl, ArrangementType } from '@/components/form/molecules/FormControl'
import { Radio } from '@/components/form/molecules/Radio'

import type { RadioElementType, FieldKey, ControlType } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  control: ControlType
  errors: FieldErrors<any>
  data: RadioElementType
  arrangement?: ArrangementType
  disabled?: boolean
  helperText?: React.ReactNode | string
  hidden?: boolean
};

export const RadioController: React.FC<Props> = (
  {
    name,
    control,
    errors,
    arrangement,
    data,
    disabled,
    helperText,
    hidden,
  }
): JSX.Element => {
  const {
    label,
    suffix,
  } = useGetInputData(name)

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
      hidden={hidden}
    >
      <Radio data={data} field={field} disabled={disabled} />
    </FormControl>
  )
}
