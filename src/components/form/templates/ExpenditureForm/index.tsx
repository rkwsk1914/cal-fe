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

import type { SelectOptionType, FieldKey } from '@/types/form/InputAttribute'

type Props = {
  index?: number
  fieldName?: string
  args: Pick<ComponentProps<typeof InputController>, 'arrangement' | 'control'  | 'errors' | 'trigger'>
  payments: ApolloQueryResult<FindAllPaymentsQuery>
  categories: ApolloQueryResult<FindAllCategorysQuery>
  hidden?: {
    id: boolean,
    expenditureName: boolean,
    description: boolean,
    amount: boolean,
    payment: boolean,
    occurrenceDate: boolean,
    temporary: boolean,
    category: boolean,
  }
}

export const ExpenditureForm: React.FC<Props> = ({
  index,
  fieldName,
  args,
  categories,
  payments,
  hidden,
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

  const prefix: FieldKey = fieldName ? `${fieldName}.${index}.` as FieldKey : '' as FieldKey

  const {
    id: isIdHidden,
    expenditureName: isExpenditureNameHidden,
    description: isDescriptionHidden,
    amount: isAmountHidden,
    payment: isPaymentHidden,
    occurrenceDate: isOccurrenceDateHidden,
    temporary: isTemporaryHidden,
    category: isCategoryHidden,
  } = hidden ?? {}

  return (
    <React.Fragment key={index}>
      <InputController
        name={`${prefix}id` as FieldKey}
        {...args}
        hidden={isIdHidden}
      />
      <CheckBoxController
        name={`${prefix}temporary` as FieldKey}
        {...args}
        data={[
          { value: 'true', label: '仮' },
        ]}
        hidden={isTemporaryHidden}
      />
      <InputController
        name={`${prefix}expenditureName` as FieldKey}
        {...args}
        hidden={isExpenditureNameHidden}
      />
      <InputController
        name={`${prefix}amount` as FieldKey}
        {...args}
        hidden={isAmountHidden}
      />
      <SelectController
        name={`${prefix}payment` as FieldKey}
        {...args}
        data={paymentSelect ?? []}
        hidden={isPaymentHidden}
      />
      <InputController
        name={`${prefix}occurrenceDate` as FieldKey}
        {...args}
        hidden={isOccurrenceDateHidden}
      />
      <SelectController
        name={`${prefix}category` as FieldKey}
        {...args}
        data={categorySelect ?? []}
        hidden={isCategoryHidden}
      />
      <InputController
        name={`${prefix}description` as FieldKey}
        {...args}
        hidden={isDescriptionHidden}
      />
    </React.Fragment>
  )
}
