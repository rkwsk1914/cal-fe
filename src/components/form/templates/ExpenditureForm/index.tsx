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
}

export const ExpenditureForm: React.FC<Props> = ({
  index,
  fieldName,
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

  const prefix: FieldKey = fieldName ? `${fieldName}.${index}.` as FieldKey : '' as FieldKey

  return (
    <React.Fragment key={index}>
      <CheckBoxController
        name={`${prefix}temporary` as FieldKey}
        {...args}
        data={[
          { value: 'true', label: '仮' },
        ]}
      />
      <InputController
        name={`${prefix}expenditureName` as FieldKey}
        {...args}
      />
      <InputController
        name={`${prefix}amount` as FieldKey}
        {...args}
      />
      <SelectController
        name={`${prefix}payment` as FieldKey}
        {...args}
        data={paymentSelect ?? []}
      />
      <InputController
        name={`${prefix}occurrenceDate` as FieldKey}
        {...args}
      />
      <SelectController
        name={`${prefix}category` as FieldKey}
        {...args}
        data={categorySelect ?? []}
      />
      <InputController
        name={`${prefix}description` as FieldKey}
        {...args}
      />
    </React.Fragment>
  )
}
