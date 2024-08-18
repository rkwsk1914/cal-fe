import * as React from 'react'

import { Input as ChakuraInput } from '@chakra-ui/react'

import type { TextInputProps } from '@/types/form'

type RefProps = TextInputProps

export const Input = React.forwardRef(
  function RefComponent (
    { register, inputTextArgs }: RefProps,
  ): JSX.Element {
    return (
      <ChakuraInput {...inputTextArgs} {...register}/>
    )
  }
)
