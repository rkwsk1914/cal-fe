import { SubmitHandler } from 'react-hook-form'

export type FormCommonType = {
  onCancel? : () => void
  onSubmit: SubmitHandler<any>
  onDelete?: () => void
  phase: 'update' | 'create'
  isTest?: boolean
}