import * as React from 'react'

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Badge,
} from '@chakra-ui/react'
import clsx from 'clsx'

import styles from './style.module.scss'

import type { FormControlProps } from '@/types/form'

interface Props extends FormControlProps {
  children?: React.ReactNode
}

export const FormControlElement: React.FC<Props> = (
  {
    children,
    label,
    isValid,
    helpertext,
    required,
    unit,
    subText,
    isHidden,
    isShowLabel = true,
    isNaked,
    isTest = false
  }
): JSX.Element => {
  if (isHidden && !isTest) return (
    <>{children}</>
  )

  if (isNaked) return (
    <FormControl isInvalid={!isValid}>
      <div className={styles.inputBox}>{children}</div>
    </FormControl>
  )

  return (
    <FormControl>
      <div className={styles.box}>
        {isShowLabel && label && <FormLabel>{label}</FormLabel>}
        <div className={styles.inputBox}>{children}</div>
        {unit && <span>{unit}</span>}
        {!required && <Badge variant='outline' colorScheme='purple'>任意</Badge>}
      </div>
      <div className={clsx(styles.helpertext, isShowLabel && styles.withLabel)}>
        {subText && <FormHelperText>{subText}</FormHelperText>}
        {!isValid && <FormErrorMessage>{helpertext}</FormErrorMessage>}
      </div>
    </FormControl>
  )
}
