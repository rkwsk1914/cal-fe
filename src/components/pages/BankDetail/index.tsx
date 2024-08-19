import * as React from 'react'

import { FromTemplate } from '@/components/templates/FromTemplate'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

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
