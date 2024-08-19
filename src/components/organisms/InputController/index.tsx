import * as React from 'react'

import { FieldErrors, UseFormTrigger, Control } from 'react-hook-form'

import { TEXT_INPUT_DATA } from '@/const/form/TextInputData'

import { InputText } from '@/components/molecules/InputText'

type Props = {
  name: string
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
      isError={!!errors[name]}
      helperText={errors[name]?.message as string}
      inputProps={{
        control,
        ...TEXT_INPUT_DATA[name]
      }}
      trigger={() => trigger(name)}
    />
  )
}
