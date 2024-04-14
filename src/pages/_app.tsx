import * as React from 'react'

import { ChakraProvider } from '@chakra-ui/react'
import { Provider as ReduxProvider } from 'react-redux'

import store from '@/stores'

import { theme } from '@/const/DarkTheme'

import type { AppProps } from 'next/app'

export default function App ({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ChakraProvider theme={theme}>
      <ReduxProvider store={store}>
        <Component {...pageProps} />
      </ReduxProvider>
    </ChakraProvider>
  )
}
