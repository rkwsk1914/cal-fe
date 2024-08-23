import { ApolloQueryResult } from '@apollo/client'

import { FindAllLoansQuery, FindAllLoansQueryVariables, FindAllLoansDocument } from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { LoanTable } from '@/components/pages/loan/LoanTable'


import type { NextPage, GetServerSideProps } from 'next'


const Bank: NextPage<ApolloQueryResult<FindAllLoansQuery>> = (props) => {
  return (
    <LoanTable {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<ApolloQueryResult<FindAllLoansQuery>> = async () => {
  const result = await doQueryServerSide<
    FindAllLoansQuery, FindAllLoansQueryVariables
  >({
    name: 'findAllLoans',
    query: FindAllLoansDocument,
    variables: {},
  })

  if (!result) {
    return { notFound: true }
  }

  return { props: result }
}

export default Bank
