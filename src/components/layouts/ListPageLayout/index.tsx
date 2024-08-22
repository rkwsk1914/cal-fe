import * as React from 'react'

import { Button } from '@/components/atoms/Button'

import styles from './style.module.scss'

type Props = {
  children?: React.ReactNode
  createBtnHref?: string
};

export const ListPageLayout: React.FC<Props> = (
  {
    children,
    createBtnHref
  }
): JSX.Element => {
  return (
    <>
      {children}
      <div className={styles.buttonArea}>
        <Button type='prime' href={createBtnHref}>新規作成</Button>
      </div>
    </>
  )
}
