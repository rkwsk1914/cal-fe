  import * as React from 'react'

  import { Input as ChakuraInput } from '@chakra-ui/react'
  import { FieldErrors, UseFormTrigger, Controller } from 'react-hook-form'
  import MaskedInput from 'react-text-mask'

  import { INPUT_DATA, InputDataType } from '@/const/form/InputData'

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
  if (!INPUT_DATA[name]) new Error(`INPUT_DATA[${name}] no Found!`)
  const {
    label,
    inputTextArgs,
    onBlurFormat,
  } = (INPUT_DATA as InputDataType)[name]

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
            as={MaskedInput}
            mask={inputTextArgs?.mask ?? false}
            {...inputTextArgs}
            {...field}
            onBlur={(e) => {
              if (onBlurFormat) {
                const formattedValue = onBlurFormat(e.target.value)
                field.onChange(formattedValue)
              }
              trigger()
            }}
            isDisabled={disabled}
          />
        </FormControl>
      )}
    />
  )
}
