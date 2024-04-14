import * as React from 'react'
import { forwardRef, memo } from 'react'

import {
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

import styles from './style.module.scss'

interface RefProps {
  top: React.ReactNode
  bottom?: React.ReactNode
  isTitleCell?: boolean
  onClick?: () => void
}

export const DataAccordion = memo(forwardRef(
  function RefComponent (
    {
      top,
      bottom,
      onClick,
    }: RefProps,
    ref?: React.Ref<HTMLDivElement>
  ): JSX.Element {
  return (
  <AccordionItem
    className={styles.accordion}
    ref={ref}
  >
    <AccordionButton
      onClick={onClick}
      className={styles.button}
      _active={{ opacity: 0.7 }}
      _expanded={bottom ? { bg: '#1B49A1', color: 'white' } : undefined}
    >
      {top}
      {bottom && (<AccordionIcon />)}
    </AccordionButton>
    {bottom && (
      <AccordionPanel
        className={styles.bottom}>
        {bottom}
      </AccordionPanel>
    )}
  </AccordionItem>
  )
}))

DataAccordion.displayName = 'DataAccordion'
