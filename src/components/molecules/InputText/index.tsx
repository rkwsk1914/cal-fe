import * as React from 'react'

import {
  FormControl as ChakuraFormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'
import { Input as ChakuraInput } from '@chakra-ui/react'
import clsx from 'clsx'
import { Controller } from 'react-hook-form'
import InputMask from 'react-input-mask'

import { useGetDarkModeStyleClass } from '@/hooks/useGetDarkModeStyleClass'

import styles from './style.module.scss'

import type { TextInputProps } from '@/types/form'

type Props = {
  isError: boolean
  helperText?: string
  arrangement?: 'vertically' | 'horizontally'
  inputProps: TextInputProps
};

export const InputText: React.FC<Props> = ({
  isError,
  helperText,
  arrangement = 'horizontally',
  inputProps,
}): JSX.Element => {
  const {
    label,
    control,
    id,
    inputTextArgs,
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
            name={id ?? ''}
            control={control}
            render={({ field }) => (
              <ChakuraInput
                as={InputMask}
                {...inputTextArgs}
                {...field}
              />
            )}
          />
          ): (
            <ChakuraInput
              as={InputMask}
              {...inputTextArgs}
            />
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
