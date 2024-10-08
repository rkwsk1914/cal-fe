import * as React from 'react'

// import { Button } from '@chakra-ui/react'
import { Button } from '@/components/atoms/Button'

import styles from './style.module.scss'

type Props = {
  children?: React.ReactNode
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  hasError?: boolean
  listHref: string
};

export const FromLayout: React.FC<Props> = ({
  children,
  handleSubmit,
  hasError,
  listHref
}): JSX.Element => {

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.content}>
        {children}
        <Button type='prime' submit disabled={hasError}>保存</Button>
        <Button type='warning' href={listHref}>一覧に戻る</Button>
      </div>
    </form>
  )
}
