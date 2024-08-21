import { ApolloQueryResult } from '@apollo/client'

import {
  FindPaymentByIdQuery,
  FindPaymentByIdQueryVariables,
  FindPaymentByIdDocument,
  FindAllBanksQuery,
  FindAllBanksQueryVariables,
  FindAllBanksDocument
} from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { PaymentDetail } from '@/components/pages/payment/PaymentDetail'


import type { NextPage, GetServerSideProps } from 'next'

interface Props {
  payment: ApolloQueryResult<FindPaymentByIdQuery>
  banks: ApolloQueryResult<FindAllBanksQuery>
}

const PaymentUpdate: NextPage<Props> = (props) => {
  return (
    <PaymentDetail {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query

  if (!id || typeof id !== 'string') {
    return { notFound: true }
  }

  const paymentResult = await doQueryServerSide<
    FindPaymentByIdQuery, FindPaymentByIdQueryVariables
  >({
    name: 'findPaymentByID',
    query: FindPaymentByIdDocument,
    variables: { findPaymentByIdId: id },
  })

  if (!paymentResult) {
    return { notFound: true }
  }

  const banksResult = await doQueryServerSide<
    FindAllBanksQuery, FindAllBanksQueryVariables
    >({
      name: 'FindAllBanks',
      query: FindAllBanksDocument,
      variables: {},
    })

  if (!banksResult) {
    return { notFound: true }
  }

  return { props: {
    payment: paymentResult,
    banks: banksResult
  } }
}

export default PaymentUpdate
