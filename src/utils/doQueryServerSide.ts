import { DocumentNode, OperationVariables, ApolloQueryResult } from '@apollo/client'
import { GraphQLFormattedError } from 'graphql'

import { APOLLO_CLIENT } from '@/const/ApolloClient'

export interface QueryServerSideReturn {
  data?: any
  errors?: readonly GraphQLFormattedError[]
  error?: any
}

export const doQueryServerSide = async <
  Query,
  Variables extends OperationVariables
>({
  query,
  variables
}: {
  name: string
  query: DocumentNode
  variables: Variables
}): Promise<ApolloQueryResult<Query> | undefined>  => {
  try {
    return await APOLLO_CLIENT.query<Query, Variables>({
      query,
      variables,
    })
  } catch {
    return undefined
  }
}