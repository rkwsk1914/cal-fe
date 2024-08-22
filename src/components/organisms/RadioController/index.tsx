import * as React from 'react'

import { FieldErrors, Control } from 'react-hook-form'

import { INPUT_DATA } from '@/const/form/TextInputData'

import { RadioGroup } from '@/components/molecules/RadioGroup'

import type { FieldKey, RadioElementType } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  control: Control<any>
  errors: FieldErrors<any>
  data: RadioElementType
};

export const RadioController: React.FC<Props> = (
  {
    name,
    control,
    errors,
    data
  }
): JSX.Element => {
  if (!INPUT_DATA[name]) new Error(`INPUT_DATA[${name}] no Found!`)
  return (
    <RadioGroup
      name={name}
      isError={!!errors[name]}
      helperText={errors[name]?.message as string}
      inputProps={{
        control,
        ...INPUT_DATA[name]
      }}
      data={data}
    />
  )
}
