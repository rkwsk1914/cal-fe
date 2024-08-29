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

export type ArrangementType = 'vertically' | 'horizontally'

type Props = {
  label?: string
  isError: boolean
  helperText?: React.ReactNode | string
  arrangement?: ArrangementType
  children?: React.ReactNode
  suffix?: React.ReactNode | string
};

export const FormControl: React.FC<Props> = ({
  label,
  isError,
  helperText,
  arrangement = 'horizontally',
  children,
  suffix,
}): JSX.Element => {
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
            <>{helperText && <FormHelperText>{helperText}</FormHelperText>}</>
          ) : (
            <>{helperText && <FormErrorMessage>{helperText}</FormErrorMessage>}</>
          )}
        </div>
        {suffix && (
          <span className={styles.suffix}>{suffix}</span>
        )}
      </div>
    </ChakuraFormControl>
  )
}
