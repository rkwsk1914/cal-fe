import * as React from 'react'




import { Button } from '@/components/atoms/Button'

import styles from './style.module.scss'

interface Props {
  children?: React.ReactNode
  onCancel? : () => void
  onDelete? : () => void
  onSubmit: React.FormEventHandler<HTMLFormElement>
  isValid?: boolean
  submitButtonText?: string
  phase: 'update' | 'create'
}

export const FormWrap: React.FC<Props> = (
  {
    children,
    onCancel,
    onSubmit,
    onDelete,
    isValid,
    submitButtonText,
    phase
  }
): JSX.Element => {
  return (
    <form onSubmit={onSubmit} className={styles.formArea}>
      {children}
      <div className={styles.buttonArea}>
        <Button type='prime' submit disabled={!isValid}>
          {submitButtonText ? submitButtonText : phase === 'update' ? '更新' : '追加'}
        </Button>
        {onCancel && <Button type='warning' onClick={onCancel} >キャンセル</Button>}
        {phase === 'update' && onDelete && <Button type='dangerous' onClick={onDelete} >削除</Button>}
      </div>
    </form>
  )
}
