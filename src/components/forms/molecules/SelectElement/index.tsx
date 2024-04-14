import * as React from 'react'

import {
  Select,
} from '@chakra-ui/react'

import { FormControlElement } from '@/components/forms/atoms/FormControlElement'

import { InputProps, FormControlProps, InputStyleChakura } from '@/types/form'

type SelectItemObject = {id: string | number, name: string}

type RefProps = InputProps &
  InputStyleChakura &
  FormControlProps &
  {
    selectItems: Array<string> | Array<SelectItemObject>
  }

export const SelectElement = React.forwardRef(
  function RefComponent (
    props: RefProps,
    ref?: React.Ref<HTMLSelectElement>
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
    isHidden: props.isHidden,
    isNaked: props.isNaked,
    isShowLabel: props.isShowLabel
  }

  const setDefaultValue = typeof props.selectItems[0] === 'string' ?
    props.defaultValue :
    props.selectItems[0]?.id &&
      (props.selectItems as Array<SelectItemObject>).find(
        (selectItem) => selectItem.id === props.defaultValue
      )?.name

  return (
    <FormControlElement {...FormControlElementProps}>
      <Select
        {...props}
        placeholder='選択してください'
        defaultValue={setDefaultValue}
        ref={ref}
      >
        {props.selectItems.map((selectItem) => {
          const id = typeof selectItem === 'string' ? selectItem : selectItem?.id && selectItem.id
          const name = typeof selectItem === 'string' ? selectItem : selectItem?.name && selectItem.name
          return (
            <option
              key={id}
              value={name}
            >{name}</option>
          )
        })}
      </Select>
    </FormControlElement>
  )
})
