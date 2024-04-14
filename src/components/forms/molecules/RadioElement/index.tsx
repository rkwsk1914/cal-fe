import * as React from 'react'

import { Radio, RadioGroup, } from '@chakra-ui/react'

import { FormControlElement } from '@/components/forms/atoms/FormControlElement'

import styles from './style.module.scss'

import type { UseFormSetValue } from 'react-hook-form'

import { InputProps, FormControlProps, InputStyleChakura } from '@/types/form'


type SelectItemObject = {id: string | number, name: string}

type RefProps = InputProps &
  InputStyleChakura &
  FormControlProps &
  {
    onChange: () => void
    selectItems: Array<string> | Array<SelectItemObject>,
    parentSetValue?: UseFormSetValue<any>
  }

export const RadioElement = React.forwardRef(
  function RefComponent (
    props: RefProps,
    ref?: React.Ref<HTMLInputElement>
  ): JSX.Element {
  const { parentSetValue, name } = props

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
      <RadioGroup
        {...props}
        value={props.value as string | undefined}
        defaultValue={setDefaultValue ? String(setDefaultValue) : undefined}
        onChange={(nextValue: string) => {
          props.onChange && props.onChange()
          parentSetValue && parentSetValue(name, nextValue )
        }}
        onBlur={undefined}
        ref={ref}
      >
        <div className={styles.radioArea}>
          {props.selectItems.map((selectItem) => {
            const id = typeof selectItem === 'string' ? selectItem : selectItem?.id && selectItem.id
            const name = typeof selectItem === 'string' ? selectItem : selectItem?.name && selectItem.name
            return (
              <Radio
                key={id}
                value={name}
              >{name}</Radio>
            )
          })}
        </div>
      </RadioGroup>
    </FormControlElement>
  )
})
