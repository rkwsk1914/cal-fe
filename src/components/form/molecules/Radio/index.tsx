import * as React from 'react'

import { Radio as ChakuraUIRadio, RadioGroup, Grid } from '@chakra-ui/react'

import type { ControllerFiled, RadioElementType } from '@/types/form/InputAttribute'

type RefProps = {
  field?: ControllerFiled
  data: RadioElementType
  disabled?: boolean
}

export const Radio = React.forwardRef(
  function RefComponent (
    { data, field, disabled }: RefProps,
    _ref?: React.Ref<HTMLInputElement>
  ): JSX.Element {
    return (
      <RadioGroup
        onChange={field?.onChange}
        value={field?.value as string}
        isDisabled={disabled}
      >
        <Grid templateColumns='repeat(4, 1fr)' gap={4}>
          {data.map((item) => (
            <React.Fragment key={item.value}>
              <ChakuraUIRadio
                name={field?.name}
                value={item.value}
                ref={field?.ref}
              >{item.label}</ChakuraUIRadio>
            </React.Fragment>
          ))}
        </Grid>
      </RadioGroup>
    )
  }
)
