import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'

import { FindAllExpendituresQuery } from '@/generated/graphql'

import { Link } from '@/components/atoms/Link'
import { Table } from '@/components/atoms/Table'
import { ListPageLayout } from '@/components/layouts/ListPageLayout'
import { PageLayout } from '@/components/layouts/PageLayout'

type Props = Partial<ApolloQueryResult<FindAllExpendituresQuery>>

export const ExpenditureList: React.FC<Props> = (props): JSX.Element => {
  const { data } = props
  const listData = data?.findAllExpenditures

  if(!listData) return <></>

  const itemData = listData.map((item) => {
    return [
      <Link key={item._id} href={`/expenditure/${item._id}`}>{item.name}</Link>,

    ]
  })

  const defaultHeader = [
    '発生日',
    '項目名',
    '金額',
    '分割回数',
    '利率',
    '手数料',
    '開始日',
    '支払い方法',
    '支払い日'
  ]

  const tableData = transpose([
    defaultHeader,
    ...itemData
  ])

  return (
    <PageLayout  title='支出リスト'>
      <ListPageLayout createBtnHref='/payment/create'>
        <Table data={tableData} thRow={1} thCol={1} />
      </ListPageLayout>
    </PageLayout>
  )
}
