import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'

import { FindAllLoansQuery } from '@/generated/graphql'

import { ListPageLayout } from '@/components/layouts/ListPageLayout'
import { PageLayout } from '@/components/layouts/PageLayout'

type Props = Partial<ApolloQueryResult<FindAllLoansQuery>>

export const LoanTable: React.FC<Props> = (props): JSX.Element => {
  const { data } = props
  const listData = data?.findAllLoans

  if(!listData) return <></>

  return (
    <PageLayout title='ローン一覧'>
      <ListPageLayout createBtnHref='/loan/create'>
        <div>

        </div>
      </ListPageLayout>
    </PageLayout>
  )
}
