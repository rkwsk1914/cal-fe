import * as React from 'react'

import {
  FormControl as ChakuraFormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'
import clsx from 'clsx'
import { Controller } from 'react-hook-form'

import { useGetDarkModeStyleClass } from '@/hooks/useGetDarkModeStyleClass'

import { CheckBox } from '@/components/atoms/CheckBox'


import styles from './style.module.scss'

import type { InputProps, CheckBoxElementType, FieldKey } from '@/types/form/InputAttribute'

type Props = {
  name: FieldKey
  isError: boolean
  helperText?: string
  arrangement?: 'vertically' | 'horizontally'
  inputProps: InputProps
  data: CheckBoxElementType
};

export const CheckBoxGroup: React.FC<Props> = ({
  name,
  isError,
  helperText,
  arrangement = 'horizontally',
  inputProps,
  data
}): JSX.Element => {
  const {
    label,
    control,
  } = inputProps

  const wrap = clsx(styles.wrap, {
    [styles.vertically]: arrangement === 'vertically',
    [styles.horizontally]: arrangement === 'horizontally',
  })
  const className = useGetDarkModeStyleClass(wrap, styles.dark)
  return (

    <ChakuraFormControl isInvalid={isError}>
      <div className={className}>
        {label && (
          <FormLabel className={styles.label}>{label}</FormLabel>
        )}
        <div className={styles.content}>
          {control ? (
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <CheckBox data={data} field={field} ref={field.ref} />
            )}
          />
          ): (
            <CheckBox data={data} />
          )}
          {!isError ? (
            <FormHelperText>
              {helperText}
            </FormHelperText>
          ) : (
            <FormErrorMessage>{helperText}</FormErrorMessage>
          )}
        </div>
      </div>
    </ChakuraFormControl>
  )
}
