import * as React from 'react'
import { useState } from 'react'

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
  FindAllCategorysQuery,
  useCreateManyExpendituresMutation
} from '@/generated/graphql'

import { useSetZodScheme, DefaultValuesRequiredType } from '@/hooks/form/useSetZodScheme'
import {  useSortArray } from '@/hooks/useSortArray'

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
import { Accordion } from '@/components/molecules/Accordion'

import styles from './style.module.scss'
import { useCalculateLoan } from './useCalculateLoan'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

type Props = {
  loan?: ApolloQueryResult<FindLoanByIdQuery>;
  payments: ApolloQueryResult<FindAllPaymentsQuery>;
  categories: ApolloQueryResult<FindAllCategorysQuery>;
};

export const LoanDetail: React.FC<Props> = (props): JSX.Element => {
  const { sort } = useSortArray()
  const { commaFormat, yyyyMmDd, removeComma, yenFormat } = chrFormatChange
  const [ addObj, setAddObj] = useState<{
    loanNameValue: string;
    numberOfPayments: number;
    monthlyPayment: number;
    firstPayment: number;
  } | null>(null)
  const toast = useToast()
  const router = useRouter()
  const { id } = router.query

  const { loan, payments, categories } = props
  const res = loan?.data?.findLoanByID

  const categoryId = categories.data?.findAllCategorys.find((item) => item.name === 'ローン')?._id

  const fieldArrayKey = 'expenditures'

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
    [fieldArrayKey]: res?.expenditures?.map((expenditure) => ({
      id: expenditure._id ?? '',
      expenditureName: expenditure?.name ?? '',
      description: expenditure?.description ?? '',
      amount: expenditure?.amount ? commaFormat(expenditure?.amount) : '',
      payment: expenditure?.payment._id ?? '',
      occurrenceDate: expenditure?.occurrenceDay ? yyyyMmDd(expenditure?.occurrenceDay) : '',
      temporary: expenditure?.temporary ? ['true'] : [],
      category: categoryId,
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
    [fieldArrayKey]: [{
      id: false,
      expenditureName: false,
      description: false,
      amount: true,
      payment: false,
      occurrenceDate: true,
      temporary: false,
      category: false,
    }]
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
    name: fieldArrayKey,
  })

  const startDateCountValue = useWatch({ control, name: 'startDate' }) as string
  const paymentValue = useWatch({ control, name: 'payment' }) as string
  const payDayValue = useWatch({ control, name: 'payDay' }) as string
  const amountValue = useWatch({ control, name: 'amount' }) as string

  const [mutateCreate] = useCreateLoanMutation()
  const [mutateUpdate] = useUpdateLoanMutation()
  const [mutateCreateMany] = useCreateManyExpendituresMutation()

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
    // const day = parseInt(dateParts[2], 10)

    const date = new Date(year, month, Number(payDayValue))

    // 指定された月数を追加
    date.setMonth(date.getMonth() + monthsToAdd)

    // 年と月がずれる可能性に対処する
    if (date.getDate() !== Number(payDayValue)) {
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

      data.expenditures && await mutateCreateMany({
        variables: {
          inputs: data.expenditures.map((expenditure) => ({
            category: categoryId,
            fixedCost: null,
            sop: null,
            subscriber: null,
            tax: null,
            temporary: (expenditure.temporary as string[])?.length > 0 ? true : false,
            name: expenditure.expenditureName as string,
            description: expenditure.description as string,
            amount: Number(removeComma(expenditure.amount as string)),
            payment: expenditure.payment as string,
            occurrenceDay: expenditure.occurrenceDate as string,
            loan: id as string,
          })
        ) }
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

      data.expenditures && await mutateCreateMany({
        variables: {
          inputs: data.expenditures.map((expenditure) => ({
            category: categoryId,
            fixedCost: null,
            sop: null,
            subscriber: null,
            tax: null,
            temporary: (expenditure.temporary as string[])?.length > 0 ? true : false,
            name: expenditure.expenditureName as string,
            description: expenditure.description as string,
            amount: Number(removeComma(expenditure.amount as string)),
            payment: expenditure.payment as string,
            occurrenceDay: expenditure.occurrenceDate as string,
            loan: id as string,
          })
        ) }
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
    const { inputDetails, result, loanNameValue } = calResult
    const { loanAmount, numberOfPayments } = inputDetails
    const { totalPayment, monthlyPayment, firstPayment } = result
    const returnObj ={ loanNameValue, numberOfPayments, monthlyPayment, firstPayment }

    setValue('amount', commaFormat(totalPayment))
    setValue('interest', commaFormat(totalPayment - loanAmount))
    setAddObj(returnObj)

    return returnObj
  }

  const onAdd = async () => {
    const returnObj = await onCalculate()
    if (!addObj && !returnObj) return

    const { loanNameValue, numberOfPayments, monthlyPayment, firstPayment } = addObj ?? returnObj

    remove()

    append({
      id: '',
      expenditureName: `${loanNameValue} 1回目`,
      description: '',
      amount: commaFormat(firstPayment),
      payment: paymentValue,
      occurrenceDate: startDateCountValue,
      temporary: ['true'],
      category: '',
    })

    for (let index = 1; index < numberOfPayments; index++) {
      append({
        id: '',
        expenditureName: `${loanNameValue} ${index + 1}回目`,
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

        <Button
          type={'outline'}
          onClick={onAdd}
          disabled={!addObj}
        >
          反映する
        </Button>

        <Accordion data={(sort(fields, 'occurrenceDate') as typeof fields).map((field, index) => {
          return {
            title: `${field.occurrenceDate} ${field.expenditureName}`,
            content: (
              <div className={styles.fieldArray} key={field.id}>
                <ExpenditureForm
                  index={index}
                  fieldName={fieldArrayKey}
                  args={args}
                  categories={categories}
                  payments={payments}
                  hidden={{
                    id: true,
                    expenditureName: true,
                    description: false,
                    amount: false,
                    payment: true,
                    occurrenceDate: false,
                    temporary: true,
                    category: true,
                  }}
                />
                <p className={styles.balanceAmountText}>
                  残り: {yenFormat(Number(removeComma(amountValue)) - ((index + 1) * Number(removeComma(field.amount as string))))}
                </p>
              </div>
            )
          }
          })}>
        </Accordion>
      </FromLayout>
    </PageLayout>
  )
}