import * as React from 'react'

import { Radio as ChakuraUIRadio, RadioGroup } from '@chakra-ui/react'

import styles from './style.module.scss'

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
        <div className={styles.radios}>
          {data.map((item) => (
            <React.Fragment key={item.value}>
              <ChakuraUIRadio
                name={field?.name}
                value={item.value}
                ref={field?.ref}
              >{item.label}</ChakuraUIRadio>
            </React.Fragment>
          ))}
        </div>
      </RadioGroup>
    )
  }
)
