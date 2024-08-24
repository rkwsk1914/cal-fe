import * as React from 'react'

import { FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { INPUT_DATA } from '@/const/form/InputData'

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
  if (!INPUT_DATA[name]) new Error(`INPUT_DATA[${name}] no Found!`)
  const {
    label,
  } =  INPUT_DATA[name]

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
