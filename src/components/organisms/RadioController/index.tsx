import * as React from 'react'

import { FieldErrors, Control } from 'react-hook-form'

import { RADIO_DATA } from '@/const/form/RadioData'

import { RadioGroup } from '@/components/molecules/RadioGroup'

import type { RadioElementType } from '@/types/form/radioAttribute'

type Props = {
  name: keyof typeof RADIO_DATA
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
  if (!RADIO_DATA[name]) new Error(`RADIO_DATA[${name}] no Found!`)
  return (
    <RadioGroup
      isError={!!errors[name]}
      helperText={errors[name]?.message as string}
      inputProps={{
        control,
        ...RADIO_DATA[name]
      }}
      data={data}
    />
  )
}
