import { ApolloQueryResult } from '@apollo/client'

import {
  FindFixedCostByIdQuery,
  FindAllPaymentsQuery,
  FindAllFixedCostPatternsQuery,
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

const CreateFixedCost: NextPage<Props> = (props) => {
  return (
    <FixedCostDetail {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async (_context) => {
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
    payments: paymentsResult,
    patterns: patternsResult,
  } }
}

export default CreateFixedCost
