import * as React from 'react'

import { Checkbox as ChakuraUICheckbox, CheckboxGroup, Grid } from '@chakra-ui/react'

import type { CheckBoxFiled, CheckBoxElementType } from '@/types/form/checkBoxAttribute'

type RefProps = {
  field?: CheckBoxFiled
  data: CheckBoxElementType
}

export const CheckBox = React.forwardRef(
  function RefComponent (
    { data, field, }: RefProps,
    _ref?: React.Ref<HTMLInputElement>
  ): JSX.Element {
    return (
      <CheckboxGroup {...field}>
        <Grid templateColumns='repeat(4, 1fr)' gap={4}>
          {data.map((item) => (
            <React.Fragment key={item.value}>
              <ChakuraUICheckbox
                name={field?.name}
                value={item.value}
                ref={field?.ref}
              >{item.label}</ChakuraUICheckbox>
            </React.Fragment>
          ))}
        </Grid>
      </CheckboxGroup>
    )
  }
)
