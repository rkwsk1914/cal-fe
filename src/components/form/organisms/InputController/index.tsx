import * as React from 'react'

import { Input as ChakuraInput } from '@chakra-ui/react'
import { FieldErrors, UseFormTrigger } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { INPUT_DATA, InputDataType } from '@/const/form/TextInputData'

import { FormControl, ArrangementType } from '@/components/form/molecules/FormControl'

import type { FieldKey, ControlType } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  control: ControlType
  errors: FieldErrors<any>
  trigger: UseFormTrigger<any>
  shouldUnregister?: boolean
  arrangement?: ArrangementType
};

export const InputController: React.FC<Props> = (
  {
    name,
    control,
    errors,
    trigger,
    shouldUnregister = true
  }
): JSX.Element => {
  if (!INPUT_DATA[name]) new Error(`INPUT_DATA[${name}] no Found!`)
  const {
    label,
    inputTextArgs,
    onBlurFormat,
  } = (INPUT_DATA as InputDataType)[name]

  return (
    <FormControl label={label} isError={!!errors[name]} helperText={errors[name]?.message as string}>
      {control ? (
        <Controller
          name={name}
          control={control}
          shouldUnregister={shouldUnregister}
          render={({ field }) => (
            <ChakuraInput
              {...inputTextArgs}
              {...field}
              onBlur={(e) => {
                if (onBlurFormat) {
                  const formattedValue = onBlurFormat(e.target.value)
                  field.onChange(formattedValue)
                }
                trigger()
              }}
            />
          )}
        />
        ): (
          <ChakuraInput
            {...inputTextArgs}
          />
        )}
    </FormControl>
  )
}
