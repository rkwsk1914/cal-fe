import * as React from 'react'

import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'

type Props = {
  _children?: React.ReactNode
};

export const SampleController: React.FC<Props> = (
  {
    _children
  }
): JSX.Element => {
  const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address')
  })

  const { getValues ,control, handleSubmit, formState: { errors, isValid } } = useForm({
    resolver: zodResolver(schema)
  })

  const onSubmit = (data: any) => {
    console.info(errors)
    console.info(data)
  }

  const doClick = () => {
    console.info(getValues())
    console.info(errors)
    console.info(isValid)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <FormControl isInvalid={isValid}>
            <FormLabel>Email address</FormLabel>
            <Input type='email' {...field} autoComplete='off' />
            {errors.email?.message && <FormHelperText>
              <>{errors.email?.message}</>
            </FormHelperText>}
          </FormControl>
        )}
      />
      <input type="submit" onClick={doClick} />
    </form>
  )
}
