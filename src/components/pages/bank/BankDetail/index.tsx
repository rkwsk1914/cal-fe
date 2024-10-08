import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { FindBankByIdQuery, useCreateBankMutation, useUpdateBankMutation } from '@/generated/graphql'

import { useSetZodScheme, DefaultValuesRequiredType }from '@/hooks/form/useSetZodScheme'

import { Alert } from '@/components/atoms/Alert'
import { Badge, BadgeColorOptions } from '@/components/atoms/Badge'
import { InputController } from '@/components/form/organisms/InputController'
import { RadioController } from '@/components/form/organisms/RadioController'
import { FromLayout } from '@/components/layouts/FromLayout'
import { PageLayout } from '@/components/layouts/PageLayout'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

type Props = Partial<ApolloQueryResult<FindBankByIdQuery>>

export const BankDetail: React.FC<Props> = (props): JSX.Element => {
  const toast = useToast()
  const router = useRouter()
  const { id } = router.query

  const { data } = props
  const res = data?.findBankByID

  const defaultValues: DefaultValuesType = {
    bankName: res?.name ?? '',
    bankBranchName: res?.branchName ?? '',
    color: res?.color ?? ''
  }

  const requiredValues: DefaultValuesRequiredType = {
    bankName: true,
    bankBranchName: true,
    color: false,
  }

  const { scheme } = useSetZodScheme(defaultValues, requiredValues)

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
            color: data.color as string
          }
        },
      })
      toast({
        render: () => (
          <Alert status="success" title='create success!'>mutate success!</Alert>
        ),
      })
    } catch (e) {
      toast({
        render: () => (
          <Alert status="error" title='create Missed!'>mutate missed!</Alert>
        ),
      })
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
            color: data.color as string,
          }
        },
      })
      toast({
        render: () => (
          <Alert status="success" title='update success!'>mutate success!</Alert>
        ),
      })
    } catch (e) {
      toast({
        render: () => (
          <Alert status="error" title='update Missed!'>mutate missed!</Alert>
        ),
      })
    }
  }

  const onSubmit = async (data: DefaultValuesType) => {
    id ? onUpdate(data) : onCreate(data)
  }

  return (
    <PageLayout title='口座詳細'>
      <FromLayout
        handleSubmit={handleSubmit(onSubmit)}
        listHref='/bank'
      >
        <InputController
          name="bankName"
          {...args}
        />
        <InputController
          name="bankBranchName"
          {...args}
        />
        <RadioController
          name="color"
          {...args}
          data={BadgeColorOptions.map((BadgeColorOption) => ({
            value: BadgeColorOption,
            label: <Badge colorScheme={BadgeColorOption}>{BadgeColorOption}</Badge>
          }))}
        />
      </FromLayout>
    </PageLayout>
  )
}
