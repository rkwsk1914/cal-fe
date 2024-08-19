import * as React from 'react'

import { FieldErrors, Control } from 'react-hook-form'

import { RADIO_DATA } from '@/const/form/RadioData'

import { RadioGroup } from '@/components/molecules/RadioGroup'

type Props = {
  name: keyof typeof RADIO_DATA
  control: Control<any>
  errors: FieldErrors<any>
  data: any
};

export const RadioController: React.FC<Props> = (
  {
    name,
    control,
    errors,
    data
  }
): JSX.Element => {
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
