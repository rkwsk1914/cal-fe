import * as React from 'react'

import { FieldErrors, UseFormTrigger, Control } from 'react-hook-form'

import { INPUT_DATA } from '@/const/form/TextInputData'

import { InputText } from '@/components/molecules/InputText'

import type { FieldKey } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  control: Control<any>
  trigger: UseFormTrigger<any>
  errors: FieldErrors<any>
};

export const InputController: React.FC<Props> = (
  {
    name,
    control,
    trigger,
    errors
  }
): JSX.Element => {
  return (
    <InputText
      name={name}
      isError={!!errors[name]}
      helperText={errors[name]?.message as string}
      inputProps={{
        control,
        ...INPUT_DATA[name]
      }}
      trigger={() => trigger(name)}
    />
  )
}
