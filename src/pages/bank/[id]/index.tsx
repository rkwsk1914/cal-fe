import { ApolloClient, InMemoryCache, ApolloQueryResult } from '@apollo/client'

import { FindBankByIdQuery, FindBankByIdQueryVariables, FindBankByIdDocument } from '@/generated/graphql'

import { BankDetail } from '@/components/pages/BankDetail'

import type { NextPage, GetServerSideProps } from 'next'

// Apollo Clientのインスタンスを作成
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // 必要に応じてURLを変更
  cache: new InMemoryCache(),
})



const Bank: NextPage<ApolloQueryResult<FindBankByIdQuery>> = (props) => {
  return (
    <BankDetail {...props} />
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query

  if (!id || typeof id !== 'string') {
    return {
      notFound: true,
    }
  }

  try {
    const { data } = await client.query<FindBankByIdQuery, FindBankByIdQueryVariables>({
      query: FindBankByIdDocument,
      variables: { findBankByIdId: id }, // 必要な変数を設定
    })

    if (!data?.findBankByID) {
      return {
        notFound: true,
      }
    }

    return {
      props: {
        data: data,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      props: {
        error: error,
      },
    }
  }
}

export default Bank
