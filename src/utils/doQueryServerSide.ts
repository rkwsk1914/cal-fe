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
    const res = await APOLLO_CLIENT.query<Query, Variables>({
      query,
      variables,
      fetchPolicy: 'no-cache',
    })

    const { errors } = res
    if (errors) console.error('APOLLO_CLIENT: : : ', { errors })

    return res
  } catch(e) {
    console.error(e)
    return undefined
  }
}