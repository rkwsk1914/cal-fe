import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'

import { FindAllCategorysQuery } from '@/generated/graphql'

import { ListPageLayout } from '@/components/layouts/ListPageLayout'
import { PageLayout } from '@/components/layouts/PageLayout'
import { LinkMenu, ListItemType } from '@/components/molecules/LinkMenu'


type Props = Partial<ApolloQueryResult<FindAllCategorysQuery>>

export const CategoryList: React.FC<Props> = (props): JSX.Element => {
  const { data } = props
  const listData = data?.findAllCategorys

  if(!listData) return <></>

  const list: ListItemType[] = listData.map((item) => {
    item
    return {
      label: item.name,
      href: `category/${item._id}`,
    }
  })

  return (
    <PageLayout  title='カテゴリーリスト'>
      <ListPageLayout createBtnHref='/category/create'>
        <LinkMenu list={list} />
      </ListPageLayout>
    </PageLayout>
  )
}
