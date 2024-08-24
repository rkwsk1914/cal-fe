import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'

import { FindAllLoansQuery } from '@/generated/graphql'

import { transpose } from '@/utils/ArrayTransport'
import * as chrFormatChange from '@/utils/chrFormatChange'


import { Link } from '@/components/atoms/Link'
import { Table } from '@/components/atoms/Table'
import { ListPageLayout } from '@/components/layouts/ListPageLayout'
import { PageLayout } from '@/components/layouts/PageLayout'


type Props = Partial<ApolloQueryResult<FindAllLoansQuery>>

export const LoanTable: React.FC<Props> = (props): JSX.Element => {
  const { data } = props
  const listData = data?.findAllLoans
  const { yenFormat, yyyyMmDd, numberDayFormat, numberWithUnit } = chrFormatChange

  if(!listData) return <></>

  const defaultHeader = [
    '項目名',
    '使用額',
    '支払い総額',
    '分割回数',
    '利率',
    '手数料',
    '開始日',
    '支払い方法',
    '支払い日'
  ]

  const itemData = listData.map((item) => {
    return [
      <Link key={item._id} href={`/loan/${item._id}`}>{item.name}</Link>,
      yenFormat(item.basePrice),
      yenFormat(item.amount),
      numberWithUnit(item.installmentsCount, '回'),
      item.rate,
      item.commission,
      yyyyMmDd(item.startDate),
      item.payment.name,
      numberDayFormat(item.payment.payDay ?? item.payDay)
    ]
  })

  const tableData = transpose([
    defaultHeader,
    ...itemData
  ])


  return (
    <PageLayout title='ローン一覧'>
      <ListPageLayout createBtnHref='/loan/create'>
        <Table data={tableData} thRow={1} thCol={1} />
      </ListPageLayout>
    </PageLayout>
  )
}
