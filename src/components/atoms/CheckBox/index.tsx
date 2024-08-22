import * as React from 'react'

import { Checkbox as ChakuraUICheckbox, CheckboxGroup, Grid } from '@chakra-ui/react'

import type { ControllerFiled, CheckBoxElementType } from '@/types/form/InputAttribute'

type RefProps = {
  field?: ControllerFiled
  data: CheckBoxElementType
}

export const CheckBox = React.forwardRef(
  function RefComponent (
    { data, field, }: RefProps,
    _ref?: React.Ref<any>
  ): JSX.Element {
    return (
      <CheckboxGroup value={field?.value as string[]} onChange={field?.onChange}>
        <Grid templateColumns='repeat(4, 1fr)' gap={4} ref={_ref}>
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
