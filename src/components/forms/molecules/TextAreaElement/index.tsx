import * as React from 'react'

import {
  Textarea
} from '@chakra-ui/react'

import { FormControlElement } from '@/components/forms/atoms/FormControlElement'

import type { FormControlProps, InputProps, InputStyleChakura } from '@/types/form'

type Props = InputProps & InputStyleChakura & FormControlProps & {
  autoFocus?: boolean
  placeholder?: string
  minLength?: number
  maxLength?: number
  onChange?: (_e: React.ChangeEvent<HTMLTextAreaElement>) => void
  onBlur?: (_e: React.FocusEvent<HTMLTextAreaElement>) => void
}

export const TextAreaElement = React.forwardRef(
    function RefComponent (
      props: Props,
      ref?: React.Ref<HTMLTextAreaElement>
    ): JSX.Element {

    const { label, unit, subText, isValid, helpertext, required, isNaked, isShowLabel, isTest, ...inputProps } = props

    const FormControlElementProps: FormControlProps = {
      // UI系
      label,
      unit,
      subText,
      // バリデーション系
      isValid,
      helpertext,
      required,
      // スタイル系
      isNaked,
      isShowLabel,
      isTest
    }

  return (
    <FormControlElement {...FormControlElementProps}>
      <Textarea
        {...inputProps}
        rows={3}
        ref={ref}
      />
    </FormControlElement>
  )
})
