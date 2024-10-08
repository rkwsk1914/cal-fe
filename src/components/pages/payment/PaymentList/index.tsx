import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'

import { FindAllPaymentsQuery } from '@/generated/graphql'

import { ListPageLayout } from '@/components/layouts/ListPageLayout'
import { PageLayout } from '@/components/layouts/PageLayout'
import { LinkMenu, ListItemType } from '@/components/molecules/LinkMenu'

type Props = Partial<ApolloQueryResult<FindAllPaymentsQuery>>

export const PaymentList: React.FC<Props> = (props): JSX.Element => {
  const { data } = props
  const listData = data?.findAllPayments

  if(!listData) return <></>

  const groupedData = listData && listData.reduce((acc, current) => {
    const { bank } = current
    if (!acc[bank.name]) {
      acc[bank.name] = []
    }
    acc[bank.name].push(current)
    return acc
  }, {} as { [key: string]: FindAllPaymentsQuery['findAllPayments'] })

  const keys = Object.keys(groupedData)
  const list: ListItemType[] = keys.map((key) => {
    const items = groupedData[key]
    return {
      label: key,
      subList: items.map((item) => {
        return {
          label: item.name,
          href: `payment/${item._id}`
        }
      })
    }
  })

  return (
    <PageLayout  title='支払い方法一覧'>
      <ListPageLayout createBtnHref='/payment/create'>
        <LinkMenu list={list} />
      </ListPageLayout>
    </PageLayout>
  )
}
