import * as React from 'react'

import {
  Textarea
} from '@chakra-ui/react'

import { FormControlElement } from '@/components/forms/atoms/FormControlElement'

import type { FormControlProps, InputProps, InputStyleChakura } from '@/types/form'

export const TextAreaElement = React.forwardRef(
    function RefComponent (
      props: InputProps & FormControlProps & InputStyleChakura & {
        autoFocus?: boolean
        placeholder?: string
        minLength?: number
        maxLength?: number
        onChange?: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void
        onBlur?: (_e: React.FocusEvent<HTMLTextAreaElement>) => void
      },
      ref?: React.Ref<HTMLTextAreaElement>
    ): JSX.Element {

    const FormControlElementProps: FormControlProps = {
        // UI系
        label: props.label,
        unit: props.unit,
        subText: props.subText,
        // バリデーション系
        isValid: props.isValid,
        helpertext: props.helpertext,
        required: props.required,
        // スタイル系
        isNaked: props.isNaked,
        isShowLabel: props.isShowLabel,
        isTest: props.isTest
      }

  return (
    <FormControlElement {...FormControlElementProps}>
      <Textarea
        {...props}
        ref={ref}
      />
    </FormControlElement>
  )
})
