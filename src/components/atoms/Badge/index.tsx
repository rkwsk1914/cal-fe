import * as React from 'react'

import { Badge as ChakuraUIBadge } from '@chakra-ui/react'

type ColorSchemeType = 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'

type Props = {
  children: string
  colorScheme?: ColorSchemeType
};

export const BadgeColorOptions: ColorSchemeType[] = [
  'gray', 'red', 'orange', 'yellow', 'green', 'teal', 'blue', 'cyan', 'purple', 'pink'
]

export const Badge: React.FC<Props> = (
  {
    children,
    colorScheme
  }
): JSX.Element => {
  return (
    <ChakuraUIBadge colorScheme={colorScheme}>{children}</ChakuraUIBadge>
  )
}
