import * as React from 'react'

import { FromTemplate, DefaultValuesType } from '@/components/templates/FromTemplate'

type Props = {};

export const BankDetail: React.FC<Props> = ({}): JSX.Element => {
  const defaultValues = {
    bankName: '',
    bankBranchName: ''
  }

  const onSubmit = (data: DefaultValuesType) => {
    console.info(data)
  }

  return (
    <FromTemplate
      onSubmit={onSubmit}
      defaultValues={defaultValues}
    />
  )
}
