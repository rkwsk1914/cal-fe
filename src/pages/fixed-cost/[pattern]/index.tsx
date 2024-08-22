import { ApolloQueryResult } from '@apollo/client'

import { FindFixedCostPatternByIdQuery, FindFixedCostPatternByIdQueryVariables, FindFixedCostPatternByIdDocument } from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { FixedCostPatternDetail } from '@/components/pages/fixedCostPattern/FixedCostPatternDetail'


import type { NextPage, GetServerSideProps } from 'next'


const Bank: NextPage<ApolloQueryResult<FindFixedCostPatternByIdQuery>> = (props) => {
  return (
    <FixedCostPatternDetail {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<ApolloQueryResult<FindFixedCostPatternByIdQuery>> = async (context) => {
  const { pattern } = context.query

  if (!pattern || typeof pattern !== 'string') {
    return { notFound: true }
  }

  const result = await doQueryServerSide<
    FindFixedCostPatternByIdQuery, FindFixedCostPatternByIdQueryVariables
  >({
    name: 'FindFixedCostPatternById',
    query: FindFixedCostPatternByIdDocument,
    variables: { findFixedCostPatternByIdId: pattern },
  })

  if (!result) {
    return { notFound: true }
  }

  return { props: result }
}

export default Bank
