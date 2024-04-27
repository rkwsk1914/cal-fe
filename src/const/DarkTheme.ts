import { extendTheme, StyleFunctionProps } from '@chakra-ui/react'


export const theme = extendTheme({
  config: {
    initialColorMode: 'dark', // ダークモードをデフォルトに設定
    useSystemColorMode: false, // OSの設定を使う
    styles: {
      global: (_props: StyleFunctionProps) => ({
        body: {
          bg: '#020C20'// props.colorMode === 'dark' ? '#020C20' : 'white',
        },
      }),
    },
  }
})
