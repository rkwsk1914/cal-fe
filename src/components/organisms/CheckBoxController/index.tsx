import * as React from 'react'

import { FieldErrors, Control } from 'react-hook-form'

import { CHECKBOX_DATA } from '@/const/form/CheckBoxData'

import { CheckBoxGroup } from '@/components/molecules/CheckBoxGroup'

import type { CheckBoxElementType } from '@/types/form/checkBoxAttribute'

type Props = {
  name: keyof typeof CHECKBOX_DATA
  control: Control<any>
  errors: FieldErrors<any>
  data: CheckBoxElementType
};

export const CheckBoxController: React.FC<Props> = (
  {
    name,
    control,
    errors,
    data
  }
): JSX.Element => {
  if (!CHECKBOX_DATA[name]) new Error(`CHECKBOX_DATA[${name}] no Found!`)
  return (
    <CheckBoxGroup
      isError={!!errors[name]}
      helperText={errors[name]?.message as string}
      inputProps={{
        control,
        ...CHECKBOX_DATA[name]
      }}
      data={data}
    />
  )
}
