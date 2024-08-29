import * as React from 'react'

import { Select as ChakuraSelect } from '@chakra-ui/react'
import { FieldErrors, useController } from 'react-hook-form'

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
  hidden?: boolean
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
    hidden
  }
): JSX.Element => {
  const {
    label,
    suffix,
  } =  useGetInputData(name)

  const placeholder = '選択してください'

  const { field, fieldState } = useController({
    control,
    name,
  })

  return (
    <FormControl
      label={label}
      arrangement={arrangement}
      isError={errors[name] ? true : fieldState.error ? true : false}
      helperText={
        errors[name]?.message
          ? (errors[name]?.message as string)
          : fieldState.error?.message
          ? fieldState.error?.message
          : helperText
      }
      suffix={suffix}
      hidden={hidden}
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
  )
}
