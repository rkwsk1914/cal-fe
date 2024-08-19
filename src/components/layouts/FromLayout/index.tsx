import * as React from 'react'

import { Button } from '@/components/atoms/Button'

import styles from './style.module.scss'

type Props = {
  children?: React.ReactNode
  handleSubmit: React.FormEventHandler<HTMLFormElement>
};

export const FromLayout: React.FC<Props> = ({
  children,
  handleSubmit
}): JSX.Element => {

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.content}>
        {children}
        <Button type='prime' submit>保存</Button>
      </div>
    </form>
  )
}
