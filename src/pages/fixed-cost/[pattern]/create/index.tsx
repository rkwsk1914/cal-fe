import { ApolloQueryResult } from '@apollo/client'

import {
  FindAllBanksQuery,
  FindAllBanksQueryVariables,
  FindAllBanksDocument
} from '@/generated/graphql'

import { doQueryServerSide } from '@/utils/doQueryServerSide'

import { PaymentDetail } from '@/components/pages/payment/PaymentDetail'


import type { NextPage, GetServerSideProps } from 'next'

interface Props {
  payment?: undefined
  banks: ApolloQueryResult<FindAllBanksQuery>
}

const PaymentCreate: NextPage<Props> = (props) => {
  return (
    <PaymentDetail {...props} />
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async () => {
  const banksResult = await doQueryServerSide<
    FindAllBanksQuery, FindAllBanksQueryVariables
    >({
      name: 'FindAllBanks',
      query: FindAllBanksDocument,
      variables: {},
    })

  if (!banksResult) {
    return { notFound: true }
  }

  return { props: {
    banks: banksResult
  } }
}

export default PaymentCreate
