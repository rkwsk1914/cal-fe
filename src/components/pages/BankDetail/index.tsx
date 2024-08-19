import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { TEXT_INPUT_DATA } from '@/const/form/TextInputData'


import { Button } from '@/components/atoms/Button'
import { InputText } from '@/components/molecules/InputText'

type Props = {};

export const BankDetail: React.FC<Props> = ({}): JSX.Element => {
  const SCHEMA = zod.object({
    bankName: TEXT_INPUT_DATA.bankName.zod,
    bankBranchName: TEXT_INPUT_DATA.bankBranchName.zod
  })

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bankName: '',
      bankBranchName: ''
    },
    resolver: zodResolver(SCHEMA),
  })

  const onSubmit = (data: any) => {
    console.info(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        isError={!!errors.bankName}
        helperText={errors.bankName?.message as string}
        inputProps={{
          control,
          ...TEXT_INPUT_DATA.bankName
        }}
        trigger={() => trigger('bankName')}
      />
      <InputText
        isError={!!errors.bankBranchName}
        helperText={errors.bankBranchName?.message as string}
        inputProps={{
          control,
          ...TEXT_INPUT_DATA.bankBranchName
        }}
        trigger={() => trigger('bankBranchName')}
      />
      <Button submit>保存</Button>
    </form>
  )
}
