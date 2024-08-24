import * as React from 'react'
import { useEffect, useState } from 'react'

import { ApolloQueryResult } from '@apollo/client'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm, useWatch } from 'react-hook-form'

import {
  FindLoanByIdQuery,
  FindAllPaymentsQuery,
  useCreateLoanMutation,
  useUpdateLoanMutation
} from '@/generated/graphql'

import { useSetZodScheme, DefaultValuesRequiredType }from '@/hooks/form/useSetZodScheme'

import * as chrFormatChange from '@/utils/chrFormatChange'

import { DAY_OPTIONS } from '@/const/form/options'

import { Alert } from '@/components/atoms/Alert'
import { Link } from '@/components/atoms/Link'
import { InputController } from '@/components/form/organisms/InputController'
import { SelectController } from '@/components/form/organisms/SelectController'
import { FromLayout } from '@/components/layouts/FromLayout'
import { PageLayout } from '@/components/layouts/PageLayout'

import type { DefaultValuesType, SelectOptionType } from '@/types/form/InputAttribute'

type Props = {
  loan?: ApolloQueryResult<FindLoanByIdQuery>
  payments: ApolloQueryResult<FindAllPaymentsQuery>
}

export const LoanDetail: React.FC<Props> = (props): JSX.Element => {
  const { commaFormat, yyyyMmDd } = chrFormatChange
  const toast = useToast()
  const router = useRouter()
  const { id } = router.query

  const { loan, payments } = props
  const res = loan?.data?.findLoanByID

  const isUneditableDay = ({
    paymentId,
    payments
  } : {
    paymentId?: string,
    payments?: FindAllPaymentsQuery['findAllPayments']
  }): number | undefined => {
    if (!payments) return undefined

    const payment = payments.find((item) => item._id === paymentId)
    if (payment?.isCredit && payment?.payDay) return payment.payDay
    return undefined
  }

  const [isPayDayUnEditable, setIsPayDayUnEditable] = useState<boolean>(isUneditableDay({
    paymentId: res?.payment._id,
    payments: payments.data.findAllPayments
  }) ? true : false)

  const defaultValues: DefaultValuesType = {
    loanName: res?.name ?? '',
    basePrice: res?.basePrice ? commaFormat(res?.basePrice) : '',
    amount: res?.amount ? commaFormat(res?.amount) : '',
    installmentsCount: res?.installmentsCount ? String(res?.installmentsCount) : '',
    rate: res?.rate ? String(res?.rate) : '',
    commission: res?.rate ? String(res?.commission) : '',
    startDate: res?.startDate ? yyyyMmDd(res?.startDate) : '',
    payment: res?.payment._id ?? '',
    payDay: res?.payDay ? String(res?.payDay) : '',
  }
  const requiredValues: DefaultValuesRequiredType = {
    loanName: true,
    basePrice: true,
    amount: true,
    installmentsCount: true,
    rate: true,
    commission: true,
    startDate: true,
    payment: true,
    payDay: true,
  }

  const paymentSelect: SelectOptionType | undefined = payments.data?.findAllPayments?.map((resPayment) => ({
    value: resPayment._id,
    label: resPayment.name,
  }))

  const { scheme } = useSetZodScheme(
    defaultValues,
    requiredValues
  )

  const {
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(scheme),
  })

  const paymentValue = useWatch({ control, name: 'payment' }) as string

  const [ mutateCreate ] = useCreateLoanMutation()
  const [ mutateUpdate ] = useUpdateLoanMutation()

  const args = {
    errors,
    trigger,
    control,
    arrangement: 'vertically'
  }

  const onCreate = async (data: DefaultValuesType) => {
    try {
      await mutateCreate({
        variables: {
          input: {
            name: data.loanName as string,
            basePrice: Number(data.basePrice),
            amount: Number(data.amount),
            installmentsCount: Number(data.installmentsCount),
            rate: Number(data.rate),
            commission: Number(data.commission),
            startDate: data.startDate as string,
            payment: data.payment as string,
            payDay: Number(data.payDay),
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
          updateLoanId: id as string,
          input: {
            name: data.loanName as string,
            basePrice: Number(data.basePrice),
            amount: Number(data.amount),
            installmentsCount: Number(data.installmentsCount),
            rate: Number(data.rate),
            commission: Number(data.commission),
            startDate: data.startDate as string,
            payment: data.payment as string,
            payDay: Number(data.payDay),
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

  useEffect(() => {
    if (paymentValue) {
      const findPaymentDay = isUneditableDay({
        paymentId: paymentValue,
        payments: payments.data?.findAllPayments
      })
      if (findPaymentDay) {
        setValue('payDay', String(findPaymentDay))
        setIsPayDayUnEditable(true)
        return
      }
    }
    setIsPayDayUnEditable(false)
  }, [paymentValue, payments, setValue, setIsPayDayUnEditable])

  return (
    <PageLayout title='ローン詳細'>
      <FromLayout
        handleSubmit={handleSubmit(onSubmit)}
        listHref='/loan'
      >
        <InputController
          name="loanName"
          {...args}
        />
        <InputController
          name="basePrice"
          {...args}
        />
        <InputController
          name="amount"
          {...args}
        />
        <SelectController
          name="installmentsCount"
          {...args}
          data={[2, 3, 5, 6, 10, 12, 15, 18, 20, 24, 36, 48].map((number) => ({
            value: String(number),
            label: String(number)
          }))}
        />
        <InputController
          name="rate"
          {...args}
        />
        <InputController
          name="commission"
          {...args}
        />
        <InputController
          name="startDate"
          {...args}
        />
        <SelectController
          name="payment"
          {...args}
          data={paymentSelect ?? []}
        />
        <SelectController
          name="payDay"
          {...args}
          data={DAY_OPTIONS}
          disabled={isPayDayUnEditable}
          helperText={isPayDayUnEditable ?
            <>支払い方法がクレジット払いなので、支払日に変更は<Link href={`/payment/${paymentValue}`}>対象の支払い方法の詳細</Link>からの変更してください。</> :
            undefined
          }
        />
      </FromLayout>
    </PageLayout>
  )
}
