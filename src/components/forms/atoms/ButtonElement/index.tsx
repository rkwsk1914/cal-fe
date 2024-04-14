import * as React from 'react'

import { Button } from '@chakra-ui/react'

import { InputStyleChakura } from '@/types/form'

type Props = {
  children?: React.ReactNode
  onClick?: (_e: React.MouseEvent<HTMLButtonElement>) => void
} & InputStyleChakura;

export const ButtonElement: React.FC<Props> = (
  {
    children,
    onClick
  }
): JSX.Element => {
  return (
    <Button
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
