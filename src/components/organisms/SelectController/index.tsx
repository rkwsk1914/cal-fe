import * as React from 'react'

import { FieldErrors, Control } from 'react-hook-form'

import { SELECT_DATA } from '@/const/form/SelectData'

import { Select } from '@/components/molecules/Select'

import type { SelectOptionType } from '@/types/form/InputAttribute'

type Props = {
  name: keyof typeof SELECT_DATA
  control: Control<any>
  errors: FieldErrors<any>
  data: SelectOptionType
};

export const SelectController: React.FC<Props> = (
  {
    name,
    control,
    errors,
    data
  }
): JSX.Element => {
  if (!SELECT_DATA[name]) new Error(`SELECT_DATA[${name}] no Found!`)
  return (
    <Select
      isError={!!errors[name]}
      helperText={errors[name]?.message as string}
      inputProps={{
        control,
        ...SELECT_DATA[name]
      }}
      data={data}
    />
  )
}
