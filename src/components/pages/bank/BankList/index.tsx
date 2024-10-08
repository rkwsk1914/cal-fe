import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'

import { FindAllBanksQuery } from '@/generated/graphql'

import { ListPageLayout } from '@/components/layouts/ListPageLayout'
import { PageLayout } from '@/components/layouts/PageLayout'
import { LinkMenu, ListItemType } from '@/components/molecules/LinkMenu'

type Props = Partial<ApolloQueryResult<FindAllBanksQuery>>

export const BankList: React.FC<Props> = (props): JSX.Element => {
  const { data } = props
  const listData = data?.findAllBanks

  if(!listData) return <></>

  const groupedData = listData && listData.reduce((acc, current) => {
    const { name } = current
    if (!acc[name]) {
      acc[name] = []
    }
    acc[name].push(current)
    return acc
  }, {} as { [key: string]: FindAllBanksQuery['findAllBanks'] })

  const keys = Object.keys(groupedData)
  const list: ListItemType[] = keys.map((key) => {
    const items = groupedData[key]
    return {
      label: key,
      subList: items.map((item) => {
        return {
          label: item.branchName ?? item.name,
          href: `bank/${item._id}`
        }
      })
    }
  })

  return (
    <PageLayout title='口座一覧'>
      <ListPageLayout createBtnHref='/bank/create'>
        <LinkMenu list={list} />
      </ListPageLayout>
    </PageLayout>
  )
}
