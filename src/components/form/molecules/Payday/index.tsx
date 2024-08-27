import * as React from 'react'
import { useEffect, useState, ComponentProps } from 'react'

import { ApolloQueryResult } from '@apollo/client'
import { useWatch, UseFormSetValue } from 'react-hook-form'

import {
  FindAllPaymentsQuery
} from '@/generated/graphql'

import { DAY_OPTIONS } from '@/const/form/options'

import { Link } from '@/components/atoms/Link'
import { SelectController } from '@/components/form/organisms/SelectController'

import { DefaultValuesType, SelectOptionType } from '@/types/form/InputAttribute'

type RefProps = {
  paymentId: string | undefined
  args: Pick<ComponentProps<typeof SelectController>, 'arrangement' | 'control'  | 'errors'>
  payments: ApolloQueryResult<FindAllPaymentsQuery>
  setValue: UseFormSetValue<DefaultValuesType>
}

export const Payday = React.forwardRef(
  function RefComponent (
    { paymentId, args, payments, setValue }: RefProps,
    _ref?: React.Ref<any>
  ): JSX.Element {

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
      paymentId,
      payments: payments.data.findAllPayments
    }) ? true : false)

    const paymentSelect: SelectOptionType | undefined = payments.data?.findAllPayments?.map((resPayment) => ({
      value: resPayment._id,
      label: resPayment.name,
    }))

    const paymentValue = useWatch({ control: args.control, name: 'payment' }) as string

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
      <>
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
      </>
    )
  }
)
