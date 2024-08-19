import * as React from 'react'

import { Radio as ChakuraUIRadio, RadioGroup, Grid } from '@chakra-ui/react'

import type { RadioFiled, RadioElementType } from '@/types/form/radioAttribute'

type RefProps = {
  field?: RadioFiled
  data: RadioElementType
}

export const Radio = React.forwardRef(
  function RefComponent (
    { data, field }: RefProps,
    _ref?: React.Ref<HTMLInputElement>
  ): JSX.Element {
    return (
      <RadioGroup {...field}>
        <Grid templateColumns='repeat(4, 1fr)' gap={4}>
          {data.map((item) => (
            <React.Fragment key={item.label}>
              <ChakuraUIRadio value={item.value}>{item.label}</ChakuraUIRadio>
            </React.Fragment>
          ))}
        </Grid>
      </RadioGroup>
    )
  }
)
