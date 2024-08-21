import * as React from 'react'

import {
  Alert as ChakuraUIAlert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  AlertStatus
} from '@chakra-ui/react'

type Props = {
  title: string
  status: AlertStatus
  children: React.ReactNode
};

export const Alert: React.FC<Props> = (
  {
    title,
    status,
    children,
  }
): JSX.Element => {
  return (
    <ChakuraUIAlert status={status}>
      <AlertIcon />
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </ChakuraUIAlert>
  )
}
