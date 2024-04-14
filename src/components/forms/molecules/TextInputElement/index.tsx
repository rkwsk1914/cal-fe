import * as React from 'react'

import {
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon
} from '@chakra-ui/react'


import { FormControlElement } from '@/components/forms/atoms/FormControlElement'

import type { TextInputProps, FormControlProps, InputStyleChakura } from '@/types/form'


type RefProps = TextInputProps &
  InputStyleChakura &
  FormControlProps &
  {
    leftAddon?: React.ReactNode
    rightAddon?: React.ReactNode
  }

export const TextInputElement = React.forwardRef(
    function RefComponent (
      props: RefProps,
      ref?: React.Ref<HTMLInputElement>
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
    isHidden: props.type === 'hidden' ? true : props.isHidden,
    isNaked: props.isNaked,
    isShowLabel: props.isShowLabel,
    isTest: props.isTest
  }

  return (
    <FormControlElement {...FormControlElementProps}>
      <InputGroup>
        {props.leftAddon && (
          <InputLeftAddon>
            {props.leftAddon}
          </InputLeftAddon>
        )}
        <Input
          {...props}
          type={props.isTest ? 'text' : props.type}
          ref={ref}
        />
        {props.rightAddon && (
          <InputRightAddon>
            {props.rightAddon}
          </InputRightAddon>
        )}
      </InputGroup>
    </FormControlElement>
  )
})
