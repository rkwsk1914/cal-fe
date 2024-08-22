import * as React from 'react'

import { FieldErrors, Control } from 'react-hook-form'

import { INPUT_DATA } from '@/const/form/TextInputData'

import { Select } from '@/components/molecules/Select'

import type { FieldKey } from '@/types/form/InputAttribute'
import type { SelectOptionType } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  control: Control<any>
  errors: FieldErrors<any>
  data: SelectOptionType
};

export const SelectController: React.FC<Props> = (
  {
    control,
    errors,
    data,
    name
  }
): JSX.Element => {
  if (!INPUT_DATA[name]) new Error(`INPUT_DATA[${name}] no Found!`)
  return (
    <Select
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
