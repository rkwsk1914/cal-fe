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

import * as chrFormatChange from '@/utils/chrFormatChange'



import { Alert } from '@/components/atoms/Alert'
import { Payday } from '@/components/form/molecules/Payday'
import { InputController } from '@/components/form/organisms/InputController'
import { SelectController } from '@/components/form/organisms/SelectController'
import { FromLayout } from '@/components/layouts/FromLayout'
import { PageLayout } from '@/components/layouts/PageLayout'

import type { DefaultValuesType, SelectOptionType } from '@/types/form/InputAttribute'

type Props = {
  fixedCost?: ApolloQueryResult<FindFixedCostByIdQuery>
  payments: ApolloQueryResult<FindAllPaymentsQuery>
  patterns: ApolloQueryResult<FindAllFixedCostPatternsQuery>
}

export const FixedCostDetail: React.FC<Props> = (props): JSX.Element => {
  const { commaFormat, removeComma } = chrFormatChange
  const toast = useToast()
  const router = useRouter()
  const { id, pattern } = router.query

  const { fixedCost, payments, patterns } = props
  const res = fixedCost?.data?.findFixedCostByID

  const defaultValues: DefaultValuesType = {
    amount: res?.amount ? commaFormat(res?.amount) : '',
    description: res?.description ?? '',
    fixedCostName: res?.name ?? '',
    fixedCostPattern: res?.fixedCostPattern._id ?? pattern,
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
    setValue,
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
            amount: Number(removeComma(data.amount as string)),
            description: data.description as string,
            name: data.fixedCostName as string,
            fixedCostPattern: data.fixedCostPattern as string,
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
            amount: Number(removeComma(data.amount as string)),
            description: data.description as string,
            name: data.fixedCostName as string,
            fixedCostPattern: data.fixedCostPattern as string,
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
        <Payday
          paymentId={res?.payment._id}
          args={args}
          payments={payments}
          setValue={setValue}
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
