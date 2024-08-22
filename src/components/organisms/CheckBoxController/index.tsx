import * as React from 'react'

import { FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { INPUT_DATA } from '@/const/form/TextInputData'

import { CheckBox } from '@/components/atoms/CheckBox'
import { FormControl, ArrangementType } from '@/components/molecules/FormControl'

import type { CheckBoxElementType, FieldKey, ControlType } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  control: ControlType
  errors: FieldErrors<any>
  data: CheckBoxElementType
  shouldUnregister?: boolean
  arrangement?: ArrangementType
};

export const CheckBoxController: React.FC<Props> = (
  {
    name,
    control,
    errors,
    data,
    shouldUnregister = true
  }
): JSX.Element => {
  if (!INPUT_DATA[name]) new Error(`INPUT_DATA[${name}] no Found!`)
  const {
    label,
  } =  INPUT_DATA[name]

  return (
    <FormControl label={label} isError={!!errors[name]} helperText={errors[name]?.message as string}>
      {control ? (
      <Controller
        name={name}
        control={control}
        shouldUnregister={shouldUnregister}
        render={({ field }) => (
          <CheckBox data={data} field={field} />
        )}
      />
      ): (
        <CheckBox data={data} />
      )}
    </FormControl>
  )
}
