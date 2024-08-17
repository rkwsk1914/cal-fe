import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'


export const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // ダークモードをデフォルトに設定
    useSystemColorMode: false, // OSの設定を使う
    styles: {
      global: (props: StyleFunctionProps) => ({
        body: {
          bg: props.colorMode === 'dark' ? '#020C20' : 'white',
        },
      }),
    },
  }
})
