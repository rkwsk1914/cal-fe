import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'


import {
  FindExpenditureByIdQuery,
  FindAllPaymentsQuery,
  useCreateExpenditureMutation,
  useUpdateExpenditureMutation,
  FindAllCategorysQuery
} from '@/generated/graphql'

import { useSetZodScheme, DefaultValuesRequiredType }from '@/hooks/form/useSetZodScheme'

import * as chrFormatChange from '@/utils/chrFormatChange'


import { Alert } from '@/components/atoms/Alert'
import type { ArrangementType } from '@/components/form/molecules/FormControl'
import { ExpenditureForm } from '@/components/form/templates/ExpenditureForm'
import { FromLayout } from '@/components/layouts/FromLayout'
import { PageLayout } from '@/components/layouts/PageLayout'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

type Props = {
  expenditure?: ApolloQueryResult<FindExpenditureByIdQuery>
  payments: ApolloQueryResult<FindAllPaymentsQuery>
  categories: ApolloQueryResult<FindAllCategorysQuery>
}

export const ExpenditureDetail: React.FC<Props> = (props): JSX.Element => {
  const { commaFormat, yyyyMmDd, removeComma } = chrFormatChange
  const toast = useToast()
  const router = useRouter()
  const { id } = router.query

  const { expenditure, payments, categories } = props
  const res = expenditure?.data?.findExpenditureByID

  const defaultValues: DefaultValuesType = {
    expenditureName: res?.name ?? '',
    description: res?.description ?? '',
    amount: res?.amount ? commaFormat(res?.amount) : '',
    payment: res?.payment._id ?? '',
    occurrenceDate: res?.payDay ? yyyyMmDd(res?.payDay): '',
    temporary: expenditure ? res?.temporary ? ['true'] : [] : ['true'],
    category: res?.category?._id ?? ''
  }
  const requiredValues: DefaultValuesRequiredType = {
    expenditureName: true,
    description: false,
    amount: true,
    payment: true,
    occurrenceDate: true,
    temporary: false,
    category: false
  }

  const { scheme } = useSetZodScheme(
    defaultValues,
    requiredValues
  )

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(scheme),
  })

  const [ mutateCreate ] = useCreateExpenditureMutation()
  const [ mutateUpdate ] = useUpdateExpenditureMutation()

  const args = {
    errors,
    trigger,
    control,
    arrangement: 'vertically' as ArrangementType
  }

  const onCreate = async (data: DefaultValuesType) => {
    try {
      await mutateCreate({
        variables: {
          input: {
            name: data.expenditureName as string,
            description: data.description as string,
            amount: Number(removeComma(data.amount as string)),
            payment: data.payment as string,
            payDay: data.occurrenceDate ? new Date(data.occurrenceDate as string) : null,
            temporary: (data.temporary as string[])?.length > 0,
            category: data.category !== '' ? (data.category as string) : null
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
      await mutateUpdate({
        variables: {
          updateExpenditureId: id as string,
          input: {
            name: data.expenditureName as string,
            description: data.description as string,
            amount: Number(removeComma(data.amount as string)),
            payment: data.payment as string,
            payDay: data.occurrenceDate ? new Date(data.occurrenceDate as string) : null,
            temporary: (data.temporary as string[])?.length > 0,
            category: data.category !== '' ? (data.category as string) : null
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
    <PageLayout title='支払い方法詳細'>
      <FromLayout
        handleSubmit={handleSubmit(onSubmit)}
        listHref='/expenditure'
      >
        <ExpenditureForm
          args={args}
          categories={categories}
          payments={payments}
        />
      </FromLayout>
    </PageLayout>
  )
}
