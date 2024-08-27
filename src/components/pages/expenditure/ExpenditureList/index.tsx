import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'

import { FindAllExpendituresQuery } from '@/generated/graphql'

import { Badge, ColorSchemeType } from '@/components/atoms/Badge'
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
      item.payDay,
      <Link key={item._id} href={`/expenditure/${item._id}`}>{item.name}</Link>,
      item.amount,
      <Badge key={item._id} colorScheme={item.payment.color as ColorSchemeType}>{item.payment.name}</Badge>,
      <Badge key={item._id} colorScheme={item.payment.bank.color as ColorSchemeType}>{`${item.payment.bank.name} ${item.payment.bank.name}`}</Badge>,
      item.description
    ]
  })

  const defaultHeader = [
    '発生日',
    '項目名',
    '金額',
    '支払い方法',
    '引き落とし口座',
    '備考'
  ]

  const tableData = [
    defaultHeader,
    ...itemData
  ]

  return (
    <PageLayout  title='支出リスト'>
      <ListPageLayout createBtnHref='/payment/create'>
        <Table data={tableData} thRow={1} />
      </ListPageLayout>
    </PageLayout>
  )
}
