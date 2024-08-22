import { ApolloQueryResult } from '@apollo/client'

import {
  FindFixedCostByIdQuery,
  FindAllPaymentsQuery,
  FindAllFixedCostPatternsQuery,
  FindFixedCostByIdQueryVariables,
  FindFixedCostByIdDocument,
  FindAllPaymentsQueryVariables,
  FindAllPaymentsDocument,
  FindAllFixedCostPatternsQueryVariables,
  FindAllFixedCostPatternsDocument
} from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { FixedCostDetail } from '@/components/pages/fixedCost/FixedCostDetail'


import type { NextPage, GetServerSideProps } from 'next'

interface Props {
  fixedCost?: Partial<ApolloQueryResult<FindFixedCostByIdQuery>>
  payments: Partial<ApolloQueryResult<FindAllPaymentsQuery>>
  patterns: Partial<ApolloQueryResult<FindAllFixedCostPatternsQuery>>
}

const UpdateFixedCost: NextPage<Props> = (props) => {
  return (
    <FixedCostDetail {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query

  if (!id || typeof id !== 'string') {
    return { notFound: true }
  }

  const fixedCostResult = await doQueryServerSide<
    FindFixedCostByIdQuery, FindFixedCostByIdQueryVariables
  >({
    name: 'findFixedCostByID',
    query: FindFixedCostByIdDocument,
    variables: { findFixedCostByIdId: id },
  })

  if (!fixedCostResult) {
    return { notFound: true }
  }

  const paymentsResult = await doQueryServerSide<
    FindAllPaymentsQuery, FindAllPaymentsQueryVariables
  >({
    name: 'findAllPayments',
    query: FindAllPaymentsDocument,
    variables: {},
  })

  if (!paymentsResult) {
    return { notFound: true }
  }

  const patternsResult = await doQueryServerSide<
    FindAllFixedCostPatternsQuery, FindAllFixedCostPatternsQueryVariables
  >({
    name: 'findAllFixedCostPatterns',
    query: FindAllFixedCostPatternsDocument,
    variables: {},
  })

  if (!patternsResult) {
    return { notFound: true }
  }

  return { props: {
    fixedCost: fixedCostResult,
    payments: paymentsResult,
    patterns: patternsResult,
  } }
}

export default UpdateFixedCost
