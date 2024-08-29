import { ApolloQueryResult } from '@apollo/client'

import {
  FindLoanByIdQuery,
  FindLoanByIdQueryVariables,
  FindLoanByIdDocument,
  FindAllPaymentsQuery,
  FindAllPaymentsQueryVariables,
  FindAllPaymentsDocument,
  FindAllCategorysQuery, FindAllCategorysQueryVariables, FindAllCategorysDocument
} from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { LoanDetail } from '@/components/pages/loan/LoanDetail'


import type { NextPage, GetServerSideProps } from 'next'

interface Props {
  loan: ApolloQueryResult<FindLoanByIdQuery>
  payments: ApolloQueryResult<FindAllPaymentsQuery>
  categories: ApolloQueryResult<FindAllCategorysQuery>
}

const PaymentUpdate: NextPage<Props> = (props) => {
  return (
    <LoanDetail {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query

  if (!id || typeof id !== 'string') {
    return { notFound: true }
  }

  const loanResult = await doQueryServerSide<
    FindLoanByIdQuery, FindLoanByIdQueryVariables
  >({
    name: 'findLoanByID',
    query: FindLoanByIdDocument,
    variables: { findLoanByIdId: id },
  })

  if (!loanResult) {
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

  return { props: {
    loan: loanResult,
    payments: paymentsResult,
    categories: categoriesResult
  } }
}

export default PaymentUpdate
