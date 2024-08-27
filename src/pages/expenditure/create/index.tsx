import { ApolloQueryResult } from '@apollo/client'

import {
  FindAllPaymentsQuery,
  FindAllPaymentsQueryVariables,
  FindAllPaymentsDocument,
  FindAllCategorysQuery,
  FindAllCategorysQueryVariables,
  FindAllCategorysDocument
} from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { ExpenditureDetail } from '@/components/pages/expenditure/ExpenditureDetail'


import type { NextPage, GetServerSideProps } from 'next'

interface Props {
  expenditure?: undefined
  payments: ApolloQueryResult<FindAllPaymentsQuery>
  categories: ApolloQueryResult<FindAllCategorysQuery>
}

const ExpenditureCreate: NextPage<Props> = (props) => {
  return (
    <ExpenditureDetail {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const paymentsResult = await doQueryServerSide<
    FindAllPaymentsQuery, FindAllPaymentsQueryVariables
    >({
      name: 'FindAllPayments',
      query: FindAllPaymentsDocument,
      variables: {},
    })

  if (!paymentsResult) {
    return { notFound: true }
  }

  const categoriesResult = await doQueryServerSide<
    FindAllCategorysQuery, FindAllCategorysQueryVariables
    >({
      name: 'FindAllCategorys',
      query: FindAllCategorysDocument,
      variables: {},
    })

  if (!categoriesResult) {
    return { notFound: true }
  }

  return {
    props: {
      payments: paymentsResult,
      categories: categoriesResult
    }
  }
}

export default ExpenditureCreate
