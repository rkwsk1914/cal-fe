import * as React from 'react'
import { ComponentProps } from 'react'

import { ApolloQueryResult } from '@apollo/client'

import {
  FindAllCategorysQuery,
  FindAllPaymentsQuery
} from '@/generated/graphql'

import { CheckBoxController } from '@/components/form/organisms/CheckBoxController'
import { InputController } from '@/components/form/organisms/InputController'
import { SelectController } from '@/components/form/organisms/SelectController'

import type { SelectOptionType } from '@/types/form/InputAttribute'

type Props = {
  args: Pick<ComponentProps<typeof InputController>, 'arrangement' | 'control'  | 'errors' | 'trigger'>
  payments: ApolloQueryResult<FindAllPaymentsQuery>
  categories: ApolloQueryResult<FindAllCategorysQuery>
}

export const ExpenditureForm: React.FC<Props> = ({
  args,
  categories,
  payments,
}): JSX.Element => {
  const categorySelect: SelectOptionType | undefined = [
    ...categories.data?.findAllCategorys?.map((resCategory) => ({
      value: resCategory._id,
      label: resCategory.name,
    }))
  ]

  const paymentSelect: SelectOptionType | undefined = payments.data?.findAllPayments?.map((resPayment) => ({
    value: resPayment._id,
    label: resPayment.name,
  }))

  return (
    <>
        <CheckBoxController
          name="temporary"
          {...args}
          data={[
            { value: 'true', label: '仮' },
          ]}
        />
        <InputController
          name="expenditureName"
          {...args}
        />
        <InputController
          name="amount"
          {...args}
        />
        <SelectController
          name="payment"
          {...args}
          data={paymentSelect ?? []}
        />
        <InputController
          name="occurrenceDate"
          {...args}
        />
        <SelectController
          name="category"
          {...args}
          data={categorySelect ?? []}
        />
        <InputController
          name="description"
          {...args}
        />
    </>
  )
}
