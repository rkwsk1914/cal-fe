import * as React from 'react'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'

import store from '@/stores'

import { theme } from '@/const/Theme'

import { AppFrame } from '@/components/layouts/AppFrame'

import type { AppProps } from 'next/app'

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
})

export default function App ({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <ApolloProvider client={client}>
          <AppFrame>
            <Component {...pageProps} />
          </AppFrame>
        </ApolloProvider>
      </ReduxProvider>
    </ChakraProvider>
  )
}
