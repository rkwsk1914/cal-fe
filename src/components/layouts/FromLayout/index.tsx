import * as React from 'react'

// import { Button } from '@chakra-ui/react'
import { Button } from '@/components/atoms/Button'

import styles from './style.module.scss'

type Props = {
  children?: React.ReactNode
  handleSubmit: React.FormEventHandler<HTMLFormElement>
  hasError?: boolean
};

export const FromLayout: React.FC<Props> = ({
  children,
  handleSubmit,
  hasError
}): JSX.Element => {

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.content}>
        {children}
        <Button type='prime' submit disabled={hasError}>保存</Button>
      </div>
    </form>
  )
}
