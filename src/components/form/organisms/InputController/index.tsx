  import * as React from 'react'

  import { Input as ChakuraInput } from '@chakra-ui/react'
  import { FieldErrors, UseFormTrigger, Controller } from 'react-hook-form'
  import MaskedInput from 'react-text-mask'

  import { useGetInputData } from '@/hooks/form/useGetInputData'



import { FormControl, ArrangementType } from '@/components/form/molecules/FormControl'

  import type { FieldKey, ControlType } from '@/types/form/InputAttribute'


type Props = {
  name: FieldKey
  control: ControlType
  errors: FieldErrors<any>
  trigger: UseFormTrigger<any>
  arrangement?: ArrangementType
  disabled?: boolean
  helperText?: React.ReactNode | string
};

export const InputController: React.FC<Props> = (
  {
    name,
    control,
    errors,
    trigger,
    arrangement,
    disabled,
    helperText,
  }
): JSX.Element => {
  const {
    label,
    inputTextArgs,
    onBlurFormat,
  } =  useGetInputData(name)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <FormControl
          label={label}
          arrangement={arrangement}
          isError={errors[name] ? true : fieldState.error ? true:  false}
          helperText={
            errors[name]?.message ?
            errors[name]?.message  as string :
            helperText
          }
        >
          <ChakuraInput
            as={inputTextArgs?.mask ? MaskedInput : undefined}
            mask={inputTextArgs?.mask ?? undefined}
            {...inputTextArgs}
            {...field}
            value={field.value as string}
            onBlur={(e) => {
              if (onBlurFormat) {
                const formattedValue = onBlurFormat(e.target.value)
                field.onChange(formattedValue)
              }
              trigger(name)
            }}
            isDisabled={disabled}
          />
        </FormControl>
      )}
    />
  )
}
