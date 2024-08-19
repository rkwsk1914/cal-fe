import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useSetZodScheme }from '@/hooks/form/useSetZodScheme'

import { FromLayout } from '@/components/layouts/FromLayout'
import { InputController } from '@/components/organisms/InputController'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

type Props = {};

export const Template: React.FC<Props> = ({}): JSX.Element => {
  const defaultValues: DefaultValuesType = {
    bankName: '',
    bankBranchName: ''
  }

  const { scheme } = useSetZodScheme(defaultValues)

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(scheme),
  })

  const args = {
    errors,
    trigger,
    control
  }

  const onSubmit = (data: DefaultValuesType) => {
    console.info(data)
  }

  return (
    <FromLayout handleSubmit={handleSubmit(onSubmit)}>
      <InputController
        name="bankName"
        {...args}
      />
      <InputController
        name="bankBranchName"
        {...args}
      />
    </FromLayout>
  )
}
