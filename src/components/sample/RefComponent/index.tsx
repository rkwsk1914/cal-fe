import * as React from 'react'

import styles from './style.module.scss'

type RefProps = {
  children: React.ReactNode
  onClick?: () => void
}

export const RefComponent = React.forwardRef(
  function RefComponent (
    { children, onClick }: RefProps,
    ref?: React.Ref<HTMLButtonElement>
  ): JSX.Element {
    return (<button className={styles.button} onClick={onClick} ref={ref}>{children}</button>)
  }
)
