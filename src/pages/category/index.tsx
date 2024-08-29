import { ApolloQueryResult } from '@apollo/client'

import { FindAllCategorysQuery, FindAllCategorysQueryVariables, FindAllCategorysDocument } from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { CategoryList } from '@/components/pages/category/CategoryList'


import type { NextPage, GetServerSideProps } from 'next'


const Category: NextPage<ApolloQueryResult<FindAllCategorysQuery>> = (props) => {
  return (
    <CategoryList {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<ApolloQueryResult<FindAllCategorysQuery>> = async () => {
  const result = await doQueryServerSide<
    FindAllCategorysQuery, FindAllCategorysQueryVariables
  >({
    name: 'FindAllCategorys',
    query: FindAllCategorysDocument,
    variables: {},
  })

  if (!result) {
    return { notFound: true }
  }

  return { props: result }
}

export default Category
