import { ApolloQueryResult } from '@apollo/client'

import { FindAllFixedCostPatternsQuery, FindAllFixedCostPatternsQueryVariables, FindAllFixedCostPatternsDocument } from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { FixedCostList } from '@/components/pages/fixedCost/FixedCostList'


import type { NextPage, GetServerSideProps } from 'next'


const FixedCostPattern: NextPage<ApolloQueryResult<FindAllFixedCostPatternsQuery>> = (props) => {
  return (
    <FixedCostList {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<ApolloQueryResult<FindAllFixedCostPatternsQuery>> = async () => {
  const result = await doQueryServerSide<
    FindAllFixedCostPatternsQuery, FindAllFixedCostPatternsQueryVariables
  >({
    name: 'FindAllFixedCostPatterns',
    query: FindAllFixedCostPatternsDocument,
    variables: {},
  })

  if (!result) {
    return { notFound: true }
  }

  return { props: result }
}

export default FixedCostPattern
