// pages/api/graphql.ts
import { ApolloServer, gql } from 'apollo-server-micro'

// スキーマの定義
const typeDefs = gql`
  type Query {
    hello: String
  }
`

// リゾルバーの定義
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
  },
}

const apolloServer = new ApolloServer({ typeDefs, resolvers })

export const config = {
  api: {
    bodyParser: false,
  },
}

export default apolloServer.createHandler({ path: '/api/graphql' })