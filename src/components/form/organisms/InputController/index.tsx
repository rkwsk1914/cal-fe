import * as React from 'react'

import { Input as ChakraInput } from '@chakra-ui/react'
import { FieldErrors, UseFormTrigger, useController } from 'react-hook-form'
import MaskedInput from 'react-text-mask'

import { useGetInputData } from '@/hooks/form/useGetInputData'

import { FormControl, ArrangementType } from '@/components/form/molecules/FormControl'

import type { FieldKey, ControlType } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey;
  control: ControlType;
  errors: FieldErrors<any>;
  trigger: UseFormTrigger<any>;
  arrangement?: ArrangementType;
  disabled?: boolean;
  helperText?: React.ReactNode | string;
  hidden?: boolean;
};

export const InputController: React.FC<Props> = ({
  name,
  control,
  errors,
  trigger,
  arrangement,
  disabled,
  helperText,
  hidden
}): JSX.Element => {
  const { label, inputTextArgs, suffix, onBlurFormat } = useGetInputData(name)

  const { field, fieldState } = useController({
    control,
    name,
  })

  return (
    <FormControl
      label={label}
      suffix={suffix}
      hidden={hidden}
      arrangement={arrangement}
      isError={errors[name] ? true : fieldState.error ? true : false}
      helperText={
        errors[name]?.message
          ? (errors[name]?.message as string)
          : fieldState.error?.message
          ? fieldState.error?.message
          : helperText
      }
    >
      {inputTextArgs?.mask ? (
        <MaskedInput
          mask={inputTextArgs.mask}
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
          render={(ref, props) => (
            <ChakraInput {...props} isDisabled={disabled} ref={ref as React.Ref<any>} />
          )}
        />
      ) : (
        <ChakraInput
          {...inputTextArgs}
          {...field}
          ref={field.ref}
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
      )}
    </FormControl>
  )
}