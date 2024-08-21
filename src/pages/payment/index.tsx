import { ApolloQueryResult } from '@apollo/client'

import { FindAllPaymentsQuery, FindAllPaymentsQueryVariables, FindAllPaymentsDocument } from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { PaymentList } from '@/components/pages/payment/PaymentList'


import type { NextPage, GetServerSideProps } from 'next'


const Payment: NextPage<ApolloQueryResult<FindAllPaymentsQuery>> = (props) => {
  return (
    <PaymentList {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<ApolloQueryResult<FindAllPaymentsQuery>> = async () => {
  const result = await doQueryServerSide<
    FindAllPaymentsQuery, FindAllPaymentsQueryVariables
  >({
    name: 'FindAllPayments',
    query: FindAllPaymentsDocument,
    variables: {},
  })

  if (!result) {
    return { notFound: true }
  }

  return { props: result }
}

export default Payment
