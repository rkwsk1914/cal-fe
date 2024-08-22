import * as React from 'react'

import { Select as ChakuraSelect } from '@chakra-ui/react'
import { FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { INPUT_DATA } from '@/const/form/TextInputData'

import { FormControl, ArrangementType } from '@/components/form/molecules/FormControl'

import type { CheckBoxElementType, FieldKey, ControlType } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  control: ControlType
  errors: FieldErrors<any>
  data: CheckBoxElementType
  shouldUnregister?: boolean
  arrangement?: ArrangementType
  disabled?: boolean
  helperText?: React.ReactNode | string
};

export const SelectController: React.FC<Props> = (
  {
    name,
    control,
    errors,
    data,
    shouldUnregister = true,
    disabled,
    helperText
  }
): JSX.Element => {
  if (!INPUT_DATA[name]) new Error(`INPUT_DATA[${name}] no Found!`)
  const {
    label,
  } =  INPUT_DATA[name]

  const placeholder = '選択してください'

  return (
    <FormControl
      label={label}
      isError={!!errors[name]}
      helperText={errors[name]?.message ? errors[name]?.message  as string : helperText}
    >
      {control ? (
      <Controller
        name={name}
        control={control}
        shouldUnregister={shouldUnregister}
        render={({ field }) => (
          <ChakuraSelect {...field} placeholder={placeholder}>
            {data.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </ChakuraSelect>
        )}
        disabled={disabled}
      />
      ): (
        <ChakuraSelect placeholder={placeholder} disabled={disabled}>
          {data.map((item) => (
            <option key={item.value} value={item.value}>{item.label}</option>
          ))}
        </ChakuraSelect>
      )}
    </FormControl>
  )
}
