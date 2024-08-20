import { ApolloQueryResult } from '@apollo/client'

import { FindBankByIdQuery, FindBankByIdQueryVariables, FindBankByIdDocument } from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { BankDetail } from '@/components/pages/BankDetail'


import type { NextPage, GetServerSideProps } from 'next'


const Bank: NextPage<ApolloQueryResult<FindBankByIdQuery>> = (props) => {
  return (
    <BankDetail {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<ApolloQueryResult<FindBankByIdQuery>> = async (context) => {
  const { id } = context.query

  if (!id || typeof id !== 'string') {
    return { notFound: true }
  }

  const result = await doQueryServerSide<
    FindBankByIdQuery, FindBankByIdQueryVariables
  >({
    name: 'findBankByID',
    query: FindBankByIdDocument,
    variables: { findBankByIdId: id },
  })

  if (!result) {
    return { notFound: true }
  }

  return { props: result }
}

export default Bank
