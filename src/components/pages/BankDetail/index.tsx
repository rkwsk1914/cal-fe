import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { TEXT_INPUT_DATA } from '@/const/form/TextInputData'


import { Button } from '@/components/atoms/Button'
import { InputWarp } from '@/components/molecules/InputWarp'

type Props = {};

export const BankDetail: React.FC<Props> = ({}): JSX.Element => {
  const SCHEMA = zod.object({
    bankName: TEXT_INPUT_DATA.bankName.zod,
  })

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      bankName: ''
    },
    resolver: zodResolver(SCHEMA),
  })

  const onSubmit = (data: any) => {
    console.info(data)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWarp
        isError={!!errors.bankName}
        helperText={errors.bankName?.message as string}
        inputProps={{
          control,
          ...TEXT_INPUT_DATA.bankName
        }}
      />
      <Button submit>保存</Button>
    </form>
  )
}
