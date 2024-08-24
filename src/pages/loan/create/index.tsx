import { ApolloQueryResult } from '@apollo/client'

import {
  FindLoanByIdQuery,
  FindAllPaymentsQuery,
  FindAllPaymentsQueryVariables,
  FindAllPaymentsDocument
} from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { LoanDetail } from '@/components/pages/loan/LoanDetail'


import type { NextPage, GetServerSideProps } from 'next'

interface Props {
  loan?: ApolloQueryResult<FindLoanByIdQuery>
  payments: ApolloQueryResult<FindAllPaymentsQuery>
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

  return { props: {
    payments: paymentsResult
  } }
}

export default PaymentUpdate
