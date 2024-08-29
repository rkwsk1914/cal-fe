import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'

import {
  FindLoanByIdQuery,
  FindAllPaymentsQuery,
  useCreateLoanMutation,
  useUpdateLoanMutation,
  FindAllCategorysQuery
} from '@/generated/graphql'

import { useSetZodScheme, DefaultValuesRequiredType } from '@/hooks/form/useSetZodScheme'

import * as chrFormatChange from '@/utils/chrFormatChange'

import { Alert } from '@/components/atoms/Alert'
import { Button } from '@/components/atoms/Button'
import type { ArrangementType } from '@/components/form/molecules/FormControl'
import { Payday } from '@/components/form/molecules/Payday'
import { InputController } from '@/components/form/organisms/InputController'
import { SelectController } from '@/components/form/organisms/SelectController'
import { ExpenditureForm } from '@/components/form/templates/ExpenditureForm'
import { FromLayout } from '@/components/layouts/FromLayout'
import { PageLayout } from '@/components/layouts/PageLayout'

import { useCalculateLoan } from './useCalculateLoan'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

type Props = {
  loan?: ApolloQueryResult<FindLoanByIdQuery>;
  payments: ApolloQueryResult<FindAllPaymentsQuery>;
  categories: ApolloQueryResult<FindAllCategorysQuery>;
};

export const LoanDetail: React.FC<Props> = (props): JSX.Element => {
  const { commaFormat, yyyyMmDd, removeComma } = chrFormatChange
  const toast = useToast()
  const router = useRouter()
  const { id } = router.query

  const { loan, payments, categories } = props
  const res = loan?.data?.findLoanByID

  const defaultValues: DefaultValuesType = {
    loanName: res?.name ?? '',
    basePrice: res?.basePrice ? commaFormat(res?.basePrice) : '',
    amount: res?.amount ? commaFormat(res?.amount) : '',
    installmentsCount: res?.installmentsCount ? String(res?.installmentsCount) : '',
    rate: res?.rate ? String(res?.rate) : '',
    interest: res?.rate ? String(res?.interest) : '',
    startDate: res?.startDate ? yyyyMmDd(res?.startDate) : '',
    payment: res?.payment._id ?? '',
    payDay: res?.payDay ? String(res?.payDay) : '',
    expenditures: res?.expenditures?.map((expenditure) => ({
      expenditureName: expenditure?.name ?? '',
      description: expenditure?.description ?? '',
      amount: expenditure?.amount ? commaFormat(expenditure?.amount) : '',
      payment: expenditure?.payment._id ?? '',
      occurrenceDate: expenditure?.occurrenceDay ? yyyyMmDd(expenditure?.occurrenceDay) : '',
      temporary: expenditure?.temporary ? ['true'] : [],
      category: expenditure?.category?._id ?? '',
    })) ?? [],
  }

  const requiredValues: DefaultValuesRequiredType = {
    loanName: true,
    basePrice: true,
    amount: true,
    installmentsCount: true,
    rate: true,
    interest: true,
    startDate: true,
    payment: true,
    payDay: true,
  }

  const { scheme } = useSetZodScheme(defaultValues, requiredValues)

  const {
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
    shouldFocusError: false,
    resolver: zodResolver(scheme),
  })

  const calResult = useCalculateLoan(control)

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'expenditures',
  })

  const startDateCountValue = useWatch({ control, name: 'startDate' }) as string
  const paymentValue = useWatch({ control, name: 'payment' }) as string

  const [mutateCreate] = useCreateLoanMutation()
  const [mutateUpdate] = useUpdateLoanMutation()

  const args = {
    errors,
    trigger,
    control,
    arrangement: 'vertically' as ArrangementType,
  }

  const addMonths = (dateStr: string, monthsToAdd: number): string => {
    // 文字列を日付オブジェクトに変換
    const dateParts = dateStr.split('/')
    const year = parseInt(dateParts[0], 10)
    const month = parseInt(dateParts[1], 10) - 1 // 月は0ベース（0が1月、11が12月）
    const day = parseInt(dateParts[2], 10)

    const date = new Date(year, month, day)

    // 指定された月数を追加
    date.setMonth(date.getMonth() + monthsToAdd)

    // 年と月がずれる可能性に対処する
    if (date.getDate() !== day) {
      date.setDate(0) // 日がずれている場合、前月の最終日を設定
    }

    // 日付をYYYY/MM/DD形式の文字列に変換
    const newYear = date.getFullYear()
    const newMonth = ('0' + (date.getMonth() + 1)).slice(-2) // 月は0ベースなので+1し、2桁にする
    const newDay = ('0' + date.getDate()).slice(-2) // 日を2桁にする

    return `${newYear}/${newMonth}/${newDay}`
  }

  const onCreate = async (data: DefaultValuesType) => {
    try {
      await mutateCreate({
        variables: {
          input: {
            name: data.loanName as string,
            basePrice: Number(removeComma(data.basePrice as string)),
            amount: Number(removeComma(data.amount as string)),
            installmentsCount: Number(data.installmentsCount),
            rate: Number(data.rate),
            interest: Number(removeComma(data.interest as string)),
            startDate: data.startDate as string,
            payment: data.payment as string,
            payDay: Number(data.payDay),
          },
        },
      })
      toast({
        render: () => (
          <Alert status="success" title="create success!">
            mutate success!
          </Alert>
        ),
      })
    } catch (e) {
      toast({
        render: () => (
          <Alert status="error" title="create Missed!">
            mutate missed!
          </Alert>
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
            basePrice: Number(removeComma(data.basePrice as string)),
            amount: Number(removeComma(data.amount as string)),
            installmentsCount: Number(data.installmentsCount),
            rate: Number(data.rate),
            interest: Number(removeComma(data.interest as string)),
            startDate: data.startDate as string,
            payment: data.payment as string,
            payDay: Number(data.payDay),
          },
        },
      })
      toast({
        render: () => (
          <Alert status="success" title="update success!">
            mutate success!
          </Alert>
        ),
      })
    } catch (e) {
      toast({
        render: () => (
          <Alert status="error" title="update Missed!">
            mutate missed!
          </Alert>
        ),
      })
    }
  }

  const onSubmit = async (data: DefaultValuesType) => {
    id ? onUpdate(data) : onCreate(data)
  }

  const onCalculate = async() => {
    const {
      inputDetails,
      result,
      loanNameValue,
    } = calResult

    const {
      loanAmount,
      numberOfPayments
    } = inputDetails

    const {
      totalPayment,
      monthlyPayment,
      firstPayment
    } = result

    setValue('amount', commaFormat(totalPayment))
    setValue('interest', commaFormat(totalPayment - loanAmount))

    remove()

    append({
      expenditureName: loanNameValue,
      description: '',
      amount: commaFormat(firstPayment),
      payment: paymentValue,
      occurrenceDate: startDateCountValue,
      temporary: ['true'],
      category: '',
    })

    for (let index = 1; index < numberOfPayments; index++) {

      append({
        expenditureName: loanNameValue,
        description: '',
        amount: commaFormat(monthlyPayment),
        payment: paymentValue,
        occurrenceDate: addMonths(startDateCountValue, index),
        temporary: ['true'],
        category: '',
      })
    }
  }

  return (
    <PageLayout title="ローン詳細">
      <FromLayout handleSubmit={handleSubmit(onSubmit)} listHref="/loan">
        <InputController name={'loanName'} {...args} />
        <InputController name="basePrice" {...args} />
        <SelectController
          name="installmentsCount"
          {...args}
          data={[2, 3, 5, 6, 10, 12, 15, 18, 20, 24, 36, 48].map((number) => ({
            value: String(number),
            label: String(number),
          }))}
        />
        <InputController name="rate" {...args} />
        <Button
          type={'outline'}
          onClick={onCalculate}
        >
          計算する
        </Button>
        <InputController name="amount" {...args} />
        <InputController name="interest" {...args} />
        <InputController name="startDate" {...args} />
        <Payday
          paymentId={res?.payment._id}
          args={args}
          payments={payments}
          setValue={setValue}
        />

        {fields.map((field, index) => (
          <React.Fragment key={field.id}>
            <ExpenditureForm
              index={index}
              fieldName={'expenditures'}
              args={args}
              categories={categories}
              payments={payments}
            />
          </React.Fragment>
        ))}
      </FromLayout>
    </PageLayout>
  )
}