import { ApolloQueryResult } from '@apollo/client'

import { FindAllExpendituresQuery, FindAllExpendituresQueryVariables, FindAllExpendituresDocument } from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { ExpenditureList } from '@/components/pages/expenditure/ExpenditureList'


import type { NextPage, GetServerSideProps } from 'next'


const Expenditure: NextPage<ApolloQueryResult<FindAllExpendituresQuery>> = (props) => {
  return (
    <ExpenditureList {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<ApolloQueryResult<FindAllExpendituresQuery>> = async () => {
  const result = await doQueryServerSide<
    FindAllExpendituresQuery, FindAllExpendituresQueryVariables
  >({
    name: 'FindAllExpenditures',
    query: FindAllExpendituresDocument,
    variables: {},
  })

  if (!result) {
    return { notFound: true }
  }

  return { props: result }
}

export default Expenditure
