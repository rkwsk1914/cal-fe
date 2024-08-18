import React from 'react'

import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Button,
} from '@chakra-ui/react'
import { useForm } from 'react-hook-form'

import { StoryFn, Meta } from '@storybook/react'

import { Input as StoryComponent } from '.'

export default {
  title: 'atoms/Input',
  component: StoryComponent,
  argTypes: {
    option: { control: 'some option' },
  }
} as Meta<typeof StoryComponent>

const Template: StoryFn<typeof StoryComponent> = (
  args: React.ComponentProps<typeof StoryComponent>
) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()

  function onSubmit(values: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2))
        resolve(values)
      }, 1000)
    })
  }
  return (
  <form onSubmit={handleSubmit(onSubmit)}>
  <FormControl isInvalid={errors.name ? true : false}>
    <FormLabel htmlFor='name'>First name</FormLabel>
    <StoryComponent
      {...args}
      register={
        { ...register('name', {
          required: 'This is required',
          disabled: false,
          minLength: { value: 4, message: 'Minimum length should be 4' },
        }) }
      } />
    <FormErrorMessage>
      {errors.name && errors.name.message as string}
    </FormErrorMessage>
  </FormControl>
  <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
    Submit
  </Button>
</form>
)}

export const Default = Template.bind({})
Default.args = {
  inputTextArgs: {
    type: 'text',
    placeholder: 'サンプル'
  }
}
