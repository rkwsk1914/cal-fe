import * as React from 'react'

import {
  FormControl as ChakuraFormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from '@chakra-ui/react'
import clsx from 'clsx'

import { useGetDarkModeStyleClass } from '@/hooks/useGetDarkModeStyleClass'

import styles from './style.module.scss'

import type { InputProps } from '@/types/form'

type Props = {
  children?: React.ReactNode
  isError: boolean
  arrangement: 'vertically' | 'horizontally'
} & Pick<InputProps, 'helperText' | 'label'>;

export const Form: React.FC<Props> = (
  {
    children,
    isError,
    arrangement = 'horizontally',
    helperText,
    label
  }
): JSX.Element => {
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
          {children}
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
