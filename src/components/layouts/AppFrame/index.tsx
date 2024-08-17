import * as React from 'react'

import {
  Box
} from '@chakra-ui/react'

interface Props {
  children?: React.ReactNode
}

export const AppFrame: React.FC<Props> = ({
  children
}): JSX.Element => {
  return (
    <Box pt={5}>
      <Box px={0}>
        {children}
      </Box>
    </Box>
  )
}
