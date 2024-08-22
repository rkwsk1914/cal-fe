import * as React from 'react'

import { Heading } from '@chakra-ui/react'

import styles from './style.module.scss'

type Props = {
  title?: string
  children?: React.ReactNode
};

export const PageLayout: React.FC<Props> = (
  {
    title,
    children
  }
): JSX.Element => {
  return (
    <>
      <Heading>{title}</Heading>
      <div className={styles.body}>{children}</div>
    </>
  )
}
