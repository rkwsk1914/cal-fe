import * as React from 'react'

import {
  Accordion as ChakuraUIAccordion,
} from '@chakra-ui/react'

import {
  AccordionItem
} from '@/components/atoms/AccordionItem'

type Props = {
  data: {
    title: string
    content: React.ReactNode
  }[]
};

export const Accordion: React.FC<Props> = (
  {
    data
  }
): JSX.Element => {

  return (
    <ChakuraUIAccordion allowMultiple>
      {data.map((item) => (
        <AccordionItem key={item.title} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </ChakuraUIAccordion>
  )
}
