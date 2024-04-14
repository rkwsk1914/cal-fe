import * as React from 'react'

import { useColorMode } from '@chakra-ui/react';
import { FormControl, FormLabel, Switch } from '@chakra-ui/react'

type Props = {};

export const ThemBtn: React.FC<Props> = (
  {}
): JSX.Element => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <FormControl display='flex' justifyContent='end' width={'100%'} marginY={'10px'} paddingX={'10px'}>
      <FormLabel htmlFor='isChecked'>{colorMode}:</FormLabel>
      <Switch id='isChecked' onChange={toggleColorMode} defaultChecked={colorMode === 'dark'} />
    </FormControl>
  )
}
