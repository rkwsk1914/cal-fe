import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'

import { FindAllFixedCostPatternsQuery } from '@/generated/graphql'

import { ListPageLayout } from '@/components/layouts/ListPageLayout'
import { PageLayout } from '@/components/layouts/PageLayout'
import { LinkMenu, ListItemType } from '@/components/molecules/LinkMenu'

type Props = Partial<ApolloQueryResult<FindAllFixedCostPatternsQuery>>

export const FixedCostList: React.FC<Props> = (props): JSX.Element => {
  const { data } = props
  const listData = data?.findAllFixedCostPatterns

  if(!listData) return <></>

  const list: ListItemType[] = listData.map((item) => {
    const { detail } = item
    return {
      label: item.name,
      href: `fixed-cost/${item._id}`,
      subList: detail?.map((detailItem) => {
        return {
          label: detailItem.name,
          href: `fixed-cost/${item._id}/${detailItem._id}`
        }
      })
    }
  })

  return (
    <PageLayout  title='固定費一覧'>
      <ListPageLayout createBtnHref='/fixed-cost/create'>
        <LinkMenu list={list} />
      </ListPageLayout>
    </PageLayout>
  )
}
