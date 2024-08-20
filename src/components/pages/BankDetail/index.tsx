import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { FindBankByIdQuery, useCreateBankMutation, useUpdateBankMutation } from '@/generated/graphql'

import { useSetZodScheme }from '@/hooks/form/useSetZodScheme'

import { FromLayout } from '@/components/layouts/FromLayout'
import { InputController } from '@/components/organisms/InputController'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

type Props = Partial<ApolloQueryResult<FindBankByIdQuery>>

export const BankDetail: React.FC<Props> = (props): JSX.Element => {
  const router = useRouter()
  const { id } = router.query

  const { data } = props
  const res = data?.findBankByID

  const defaultValues: DefaultValuesType = {
    bankName: res?.name ?? '',
    bankBranchName: res?.branchName ?? ''
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

  const [ mutateCreateBank ] = useCreateBankMutation()
  const [ mutateUpdateBank ] = useUpdateBankMutation()

  const args = {
    errors,
    trigger,
    control
  }

  const onCreate = async (data: DefaultValuesType) => {
    try {
      await mutateCreateBank({
        variables: {
          input: {
            name: data.bankName as string,
            branchName: data.bankBranchName as string,
          }
        },
      })
      alert('Bank name created successfully')
    } catch (e) {
      console.error(e)
    }
  }

  const onUpdate = async (data: DefaultValuesType) => {
    try {
      await mutateUpdateBank({
        variables: {
          updateBankId: id as string,
          input: {
            name: data.bankName as string,
            branchName: data.bankBranchName as string,
          }
        },
      })
      alert('Bank name updated successfully')
    } catch (e) {
      console.error(e)
    }
  }

  const onSubmit = async (data: DefaultValuesType) => {
    id ? onUpdate(data) : onCreate(data)
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
