import * as React from 'react'

import { FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { useGetInputData } from '@/hooks/form/useGetInputData'

import { FormControl, ArrangementType } from '@/components/form/molecules/FormControl'
import { Radio } from '@/components/form/molecules/Radio'

import type { RadioElementType, FieldKey, ControlType, ControlRules } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  control: ControlType
  errors: FieldErrors<any>
  data: RadioElementType
  shouldUnregister?: boolean
  arrangement?: ArrangementType
  disabled?: boolean
  helperText?: React.ReactNode | string
  rules?: ControlRules
  required?: boolean
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
  }
): JSX.Element => {
  const {
    label,
  } = useGetInputData(name)

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
          <Radio data={data} field={field} disabled={disabled} />
        </FormControl>
      )}
    />
  )
}
