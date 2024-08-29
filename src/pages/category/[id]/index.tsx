import { ApolloQueryResult } from '@apollo/client'

import { FindCategoryByIdQuery, FindCategoryByIdQueryVariables, FindCategoryByIdDocument } from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { CategoryDetail } from '@/components/pages/category/CategoryDetail'


import type { NextPage, GetServerSideProps } from 'next'


const CategoryUpdate: NextPage<ApolloQueryResult<FindCategoryByIdQuery>> = (props) => {
  return (
    <CategoryDetail {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<ApolloQueryResult<FindCategoryByIdQuery>> = async (context) => {
  const { id } = context.query

  if (!id || typeof id !== 'string') {
    return { notFound: true }
  }

  const result = await doQueryServerSide<
    FindCategoryByIdQuery, FindCategoryByIdQueryVariables
  >({
    name: 'findCategoryByID',
    query: FindCategoryByIdDocument,
    variables: { findCategoryByIdId: id },
  })

  if (!result) {
    return { notFound: true }
  }

  return { props: result }
}

export default CategoryUpdate
