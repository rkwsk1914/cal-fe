import * as React from 'react'

import {
  Link as ChakuraUILink,
} from '@chakra-ui/react'
import NextLink from 'next/link'

type Props = {
  href: string
  children: string
};

export const Link: React.FC<Props> = (
  {
    href,
    children,
  }
): JSX.Element => {
  return (
    <ChakuraUILink as={NextLink} href={href}>{children}</ChakuraUILink>
  )
}
