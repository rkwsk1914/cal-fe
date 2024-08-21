import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'

import { FindAllPaymentsQuery } from '@/generated/graphql'


import { LinkMenu, ListItemType } from '@/components/molecules/LinkMenu'

type Props = Partial<ApolloQueryResult<FindAllPaymentsQuery>>

export const PaymentList: React.FC<Props> = (props): JSX.Element => {
  const { data } = props
  const listData = data?.findAllPayments

  if(!listData) return <></>

  const groupedData = listData && listData.reduce((acc, current) => {
    const { bank } = current
    if (!acc[bank._id]) {
      acc[bank.name] = []
    }
    acc[bank.name].push(current)
    return acc
  }, {} as { [key: string]: Array<{ __typename?: 'Payment', _id: string, closingDay: number, color?: string | null, isCredit: boolean, name: string, payDay: number, uneditable: boolean, bank: { __typename?: 'Bank', _id: string, branchName?: string | null, name: string, color?: string | null } }> })

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
    <LinkMenu list={list} />
  )
}
