import { ApolloQueryResult } from '@apollo/client'

import { FindExpenditureByIdQuery, FindExpenditureByIdQueryVariables, FindExpenditureByIdDocument } from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

// import { ExpenditureDetail } from '@/components/pages/expenditure/ExpenditureDetail'


import type { NextPage, GetServerSideProps } from 'next'


const ExpenditureUpdate: NextPage<ApolloQueryResult<FindExpenditureByIdQuery>> = (_props) => {
  return (
    <></>
  )
}

export const getServerSideProps: GetServerSideProps<ApolloQueryResult<FindExpenditureByIdQuery>> = async (context) => {
  const { id } = context.query

  if (!id || typeof id !== 'string') {
    return { notFound: true }
  }

  const result = await doQueryServerSide<
    FindExpenditureByIdQuery, FindExpenditureByIdQueryVariables
  >({
    name: 'findExpenditureByID',
    query: FindExpenditureByIdDocument,
    variables: { findExpenditureByIdId: id },
  })

  if (!result) {
    return { notFound: true }
  }

  return { props: result }
}

export default ExpenditureUpdate
