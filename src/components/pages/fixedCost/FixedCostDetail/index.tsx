import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import {
  FindAllFixedCostPatternsQuery,
  FindFixedCostByIdQuery,
  FindAllPaymentsQuery,
  useCreateFixedCostMutation,
  useUpdateFixedCostMutation
} from '@/generated/graphql'

import { useSetZodScheme, DefaultValuesRequiredType }from '@/hooks/form/useSetZodScheme'

import { Alert } from '@/components/atoms/Alert'
import { InputController } from '@/components/form/organisms/InputController'
import { SelectController } from '@/components/form/organisms/SelectController'
import { FromLayout } from '@/components/layouts/FromLayout'
import { PageLayout } from '@/components/layouts/PageLayout'

import type { DefaultValuesType, SelectOptionType } from '@/types/form/InputAttribute'

type Props = {
  fixedCost?: Partial<ApolloQueryResult<FindFixedCostByIdQuery>>
  payments: Partial<ApolloQueryResult<FindAllPaymentsQuery>>
  patterns: Partial<ApolloQueryResult<FindAllFixedCostPatternsQuery>>
}

export const FixedCostDetail: React.FC<Props> = (props): JSX.Element => {
  const toast = useToast()
  const router = useRouter()
  const { id, pattern } = router.query

  const { fixedCost, payments, patterns } = props
  const res = fixedCost?.data?.findFixedCostByID

  const defaultValues: DefaultValuesType = {
    amount: res?.amount ? String(res?.amount) : '',
    description: res?.description ?? '',
    fixedCostName: res?.name ?? '',
    fixedCostPattern: res?.pattern._id ?? pattern,
    payDay: res?.payDay ? String(res?.payDay) : '',
    payment: res?.payment._id ?? ''
  }

  const requiredValues: DefaultValuesRequiredType = {
    amount: true,
    description: false,
    fixedCostName: true,
    fixedCostPattern: true,
    payDay: true,
    payment: true
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

  const [ mutateCreateFixedCost ] = useCreateFixedCostMutation()
  const [ mutateUpdateFixedCost ] = useUpdateFixedCostMutation()

  const args = {
    errors,
    trigger,
    control
  }

  const onCreate = async (data: DefaultValuesType) => {
    try {
      await mutateCreateFixedCost({
        variables: {
          input: {
            amount: Number(data.amount),
            description: data.description as string,
            name: data.fixedCostName as string,
            pattern: data.fixedCostPattern as string,
            payDay: Number(data.payDay),
            payment: data.payment as string
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
      await mutateUpdateFixedCost({
        variables: {
          updateFixedCostId: id as string,
          input: {
            amount: Number(data.amount),
            description: data.description as string,
            name: data.fixedCostName as string,
            pattern: data.fixedCostPattern as string,
            payDay: Number(data.payDay),
            payment: data.payment as string
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

  const paymentSelect: SelectOptionType | undefined = payments.data?.
  findAllPayments?.map((resPayment) => ({
    value: resPayment._id,
    label: resPayment.name
  }))

  const patternSelect: SelectOptionType | undefined = patterns.data?.findAllFixedCostPatterns?.map((resPattern) => ({
    value: resPattern._id,
    label: resPattern.name
  }))

  return (
    <PageLayout title='固定費詳細'>
      <FromLayout
        handleSubmit={handleSubmit(onSubmit)}
        listHref={`/fixed-cost/${pattern}`}
      >
        <InputController
          name="fixedCostName"
          {...args}
        />
        <InputController
          name="amount"
          {...args}
        />
        <InputController
          name="payDay"
          {...args}
        />
        <SelectController
          name="payment"
          {...args}
          data={paymentSelect ?? []}
        />
        <SelectController
          name="fixedCostPattern"
          {...args}
          data={patternSelect ?? []}
        />
        <InputController
          name="description"
          {...args}
        />
      </FromLayout>
    </PageLayout>
  )
}
