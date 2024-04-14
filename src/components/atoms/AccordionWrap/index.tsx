import * as React from 'react'

import {
  Accordion,
} from '@chakra-ui/react'
import clsx from 'clsx'


import { useGetDarkModeStyleClass } from '@/hooks/useGetDarkModeStyleClass'

import styles from './style.module.scss'


interface Props {
  children?: React.ReactNode
  isTitleCell?: boolean
  onToggle?: () => void
}

export const AccordionWrap : React.FC<Props> = (
  {
    children,
    onToggle,
    isTitleCell = false
  }
): JSX.Element => {
  const darkClassName = useGetDarkModeStyleClass(
    clsx(styles.accordion, isTitleCell && styles.isTitleCell),
    styles.dark
  )

  return (
    <Accordion
      allowToggle
      allowMultiple
      onChange={onToggle}
      className={darkClassName}
    >
      {children}
    </Accordion>
  )
}
