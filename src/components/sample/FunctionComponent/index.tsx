import * as React from 'react'

import { useGetDarkModeStyleClass } from '@/hooks/useGetDarkModeStyleClass'

import styles from './style.module.scss'

type Props = {
  children?: React.ReactNode
};

export const FunctionComponent: React.FC<Props> = (
  {
    children
  }
): JSX.Element => {
  const className = useGetDarkModeStyleClass(styles.li, styles.dark)
  return (
    <div className={className}>{children}</div>
  )
}
