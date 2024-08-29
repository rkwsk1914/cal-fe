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

  const dates: string [] = []
  listData.map((item) => {
    item.expenditures?.map((expenditure) => {
      expenditure.occurrenceDay && dates.push(expenditure.occurrenceDay)
    })
  })

  // Set を使って重複削除
  const uniqueDatesSet = new Set(dates)

  // Set を配列に変換してソート
  const uniqueDates = Array.from(uniqueDatesSet).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())

  const fixUniqueDates = uniqueDates.map((date) => yyyyMmDd(date))

  const defaultHeader = [
    '項目名',
    '使用額',
    '支払い総額',
    '分割回数',
    '利率',
    '手数料',
    '開始日',
    '支払い方法',
    '支払い日',
    ...fixUniqueDates,
  ]

  const itemData = listData.map((item) => {
    const expenditures = item.expenditures
    const expenditureList = dates.map((date) => {
      const findExpenditure = expenditures?.find((expenditure) => expenditure.occurrenceDay === date)
      if (findExpenditure) return <Link key={findExpenditure._id} href={`/expenditure/${findExpenditure._id}`}>{yenFormat(findExpenditure.amount)}</Link>
      return ''
    })

    return [
      <Link key={item._id} href={`/loan/${item._id}`}>{item.name}</Link>,
      yenFormat(item.basePrice),
      yenFormat(item.amount),
      numberWithUnit(item.installmentsCount, '回'),
      item.rate,
      yenFormat(item.interest),
      yyyyMmDd(item.startDate),
      item.payment.name,
      numberDayFormat(item.payment.payDay ?? item.payDay),
      ...expenditureList,
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
