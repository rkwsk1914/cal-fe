import { ApolloQueryResult } from '@apollo/client'

import {
  FindAllPaymentsQuery,
  FindAllPaymentsQueryVariables,
  FindAllPaymentsDocument,
  FindAllCategorysQuery,
  FindAllCategorysQueryVariables,
  FindAllCategorysDocument,
  FindExpenditureByIdQuery,
  FindExpenditureByIdQueryVariables,
  FindExpenditureByIdDocument
} from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { ExpenditureDetail } from '@/components/pages/expenditure/ExpenditureDetail'


import type { NextPage, GetServerSideProps } from 'next'

interface Props {
  expenditure?: ApolloQueryResult<FindExpenditureByIdQuery>
  payments: ApolloQueryResult<FindAllPaymentsQuery>
  categories: ApolloQueryResult<FindAllCategorysQuery>
}

const ExpenditureCreate: NextPage<Props> = (props) => {
  return (
    <ExpenditureDetail {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query

  if (!id || typeof id !== 'string') {
    return { notFound: true }
  }

  const expenditureResult = await doQueryServerSide<
    FindExpenditureByIdQuery, FindExpenditureByIdQueryVariables
  >({
    name: 'findPaymentByID',
    query: FindExpenditureByIdDocument,
    variables: { findExpenditureByIdId: id },
  })

  if (!expenditureResult) {
    return { notFound: true }
  }

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
      expenditure: expenditureResult,
      payments: paymentsResult,
      categories: categoriesResult
    }
  }
}

export default ExpenditureCreate
