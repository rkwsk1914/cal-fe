import { ApolloQueryResult } from '@apollo/client'

import {
  FindLoanByIdQuery,
  FindAllPaymentsQuery,
  FindAllPaymentsQueryVariables,
  FindAllPaymentsDocument,
  FindAllCategorysQuery, FindAllCategorysQueryVariables, FindAllCategorysDocument
} from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { LoanDetail } from '@/components/pages/loan/LoanDetail'


import type { NextPage, GetServerSideProps } from 'next'

interface Props {
  loan?: ApolloQueryResult<FindLoanByIdQuery>
  payments: ApolloQueryResult<FindAllPaymentsQuery>
  categories: ApolloQueryResult<FindAllCategorysQuery>
}

const PaymentUpdate: NextPage<Props> = (props) => {
  return (
    <LoanDetail {...props} />
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

  return { props: {
    payments: paymentsResult,
    categories: categoriesResult
  } }
}

export default PaymentUpdate
