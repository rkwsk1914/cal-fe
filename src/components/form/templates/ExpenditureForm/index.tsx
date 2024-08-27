import * as React from 'react'
import { ComponentProps } from 'react'

import { ApolloQueryResult } from '@apollo/client'

import {
  FindAllCategorysQuery
} from '@/generated/graphql'

import { Payday } from '@/components/form/molecules/Payday'
import { CheckBoxController } from '@/components/form/organisms/CheckBoxController'
import { InputController } from '@/components/form/organisms/InputController'
import { SelectController } from '@/components/form/organisms/SelectController'

import type { SelectOptionType } from '@/types/form/InputAttribute'

type Props = {
  args: Pick<ComponentProps<typeof InputController>, 'arrangement' | 'control'  | 'errors' | 'trigger'>
  categories: ApolloQueryResult<FindAllCategorysQuery>
} & Pick<ComponentProps<typeof Payday>, 'payments' | 'paymentId' | 'setValue'>

export const ExpenditureForm: React.FC<Props> = ({
  args,
  categories,
  payments,
  paymentId,
  setValue
}): JSX.Element => {

  const categorySelect: SelectOptionType | undefined = [
    ...categories.data?.findAllCategorys?.map((resCategory) => ({
      value: resCategory._id,
      label: resCategory.name,
    }))
  ]

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
        <Payday
          paymentId={paymentId}
          args={args}
          payments={payments}
          setValue={setValue}
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
