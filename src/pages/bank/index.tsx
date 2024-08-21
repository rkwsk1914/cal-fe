import { ApolloQueryResult } from '@apollo/client'

import { FindAllBanksQuery, FindAllBanksQueryVariables, FindAllBanksDocument } from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { BankList } from '@/components/pages/bank/BankList'


import type { NextPage, GetServerSideProps } from 'next'


const Bank: NextPage<ApolloQueryResult<FindAllBanksQuery>> = (props) => {
  return (
    <BankList {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<ApolloQueryResult<FindAllBanksQuery>> = async () => {
  const result = await doQueryServerSide<
    FindAllBanksQuery, FindAllBanksQueryVariables
  >({
    name: 'FindAllBanks',
    query: FindAllBanksDocument,
    variables: {},
  })

  if (!result) {
    return { notFound: true }
  }

  return { props: result }
}

export default Bank
