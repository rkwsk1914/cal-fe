import * as React from 'react'

import { Select as ChakuraSelect } from '@chakra-ui/react'
import { FieldErrors } from 'react-hook-form'
import { Controller } from 'react-hook-form'

import { useGetInputData } from '@/hooks/form/useGetInputData'

import { FormControl, ArrangementType } from '@/components/form/molecules/FormControl'

import type { CheckBoxElementType, FieldKey, ControlType } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  control: ControlType
  errors: FieldErrors<any>
  data: CheckBoxElementType
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
    arrangement,
    disabled,
    helperText,
  }
): JSX.Element => {
  const {
    label,
  } =  useGetInputData(name)

  const placeholder = '選択してください'

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl
          label={label}
          arrangement={arrangement}
          isError={!!errors[name]}
          helperText={errors[name]?.message ? errors[name]?.message  as string : helperText}
        >
          <ChakuraSelect
            {...field}
            value={field.value as string}
            isDisabled={disabled}
            placeholder={placeholder}
            isReadOnly={disabled}
          >
            {data.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </ChakuraSelect>
        </FormControl>
      )}
    />
  )
}
