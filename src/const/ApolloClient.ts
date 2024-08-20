import { ApolloClient, InMemoryCache } from '@apollo/client'

// Apollo Clientのインスタンスを作成
export const APOLLO_CLIENT = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // 必要に応じてURLを変更
  cache: new InMemoryCache(),
})
