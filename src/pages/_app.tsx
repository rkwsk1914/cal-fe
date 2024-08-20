import * as React from 'react'

import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'

import store from '@/stores'

import { APOLLO_CLIENT } from '@/const/ApolloClient'
import { theme } from '@/const/Theme'

import { AppFrame } from '@/components/layouts/AppFrame'


import type { AppProps } from 'next/app'

export default function App ({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <ApolloProvider client={APOLLO_CLIENT}>
          <AppFrame>
            <Component {...pageProps} />
          </AppFrame>
        </ApolloProvider>
      </ReduxProvider>
    </ChakraProvider>
  )
}
