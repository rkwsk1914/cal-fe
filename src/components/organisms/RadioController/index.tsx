import * as React from 'react'

import { FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { INPUT_DATA } from '@/const/form/TextInputData'

import { Radio } from '@/components/atoms/Radio'
import { FormControl, ArrangementType } from '@/components/molecules/FormControl'

import type { RadioElementType, FieldKey, ControlType } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  control: ControlType
  errors: FieldErrors<any>
  data: RadioElementType
  shouldUnregister?: boolean
  arrangement?: ArrangementType
};

export const RadioController: React.FC<Props> = (
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
          <Radio data={data} field={field} />
        )}
      />
      ): (
        <Radio data={data} />
      )}
    </FormControl>
  )
}
