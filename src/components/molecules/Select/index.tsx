import * as React from 'react'

import {
  FormControl as ChakuraFormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Select as ChakuraSelect } from '@chakra-ui/react'
import clsx from 'clsx'
import { Controller } from 'react-hook-form'

import { useGetDarkModeStyleClass } from '@/hooks/useGetDarkModeStyleClass'

import styles from './style.module.scss'

import type { InputProps, SelectOptionType, FieldKey } from '@/types/form/InputAttribute'


type Props = {
  isError: boolean
  helperText?: string
  arrangement?: 'vertically' | 'horizontally'
  inputProps: InputProps
  data: SelectOptionType
  name: FieldKey
};

export const Select: React.FC<Props> = ({
  isError,
  helperText,
  arrangement = 'horizontally',
  inputProps,
  data,
  name
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
              <ChakuraSelect {...field} placeholder='Select option'>
                {data.map((item) => (
                  <option key={item.value} value={item.value}>{item.label}</option>
                ))}
              </ChakuraSelect>
            )}
          />
          ): (
            <ChakuraSelect placeholder='Select option'>
              {data.map((item) => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </ChakuraSelect>
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
