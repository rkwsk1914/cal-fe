import * as React from 'react'

import {
  AccordionItem as ChakuraUIAccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react'

type Props = {
  title: string
  children: React.ReactNode
};

export const AccordionItem: React.FC<Props> = (
  {
    title,
    children,
  }
): JSX.Element => {
  return (
    <ChakuraUIAccordionItem>
      <AccordionButton>
        <AccordionIcon />
        {title}
      </AccordionButton>
    <AccordionPanel pb={4}>
      {children}
    </AccordionPanel>
  </ChakuraUIAccordionItem>
  )
}
