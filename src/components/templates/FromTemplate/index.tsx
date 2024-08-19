import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

import { TEXT_INPUT_DATA } from '@/const/form/TextInputData'


import { Button } from '@/components/atoms/Button'
import { InputController } from '@/components/organisms/InputController'

export type DefaultValuesType = Record<keyof typeof TEXT_INPUT_DATA, string | number | boolean | null | undefined>

type Props = {
  defaultValues: DefaultValuesType
  onSubmit: (_data: DefaultValuesType) => void
};

export const FromTemplate: React.FC<Props> = ({
  defaultValues,
  onSubmit
}): JSX.Element => {
  const SCHEMA = zod.object(
    Object.keys(defaultValues).reduce((schema, key) => {
      if (TEXT_INPUT_DATA[key]) {
        schema[key] = TEXT_INPUT_DATA[key].zod
      }
      return schema
    }, {} as Record<string, zod.ZodString>)
  )

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(SCHEMA),
  })

  const args = {
    errors,
    trigger,
    control
  }

  const keys = Object.keys(defaultValues)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {keys.map((key) => {
        return (
          <React.Fragment key={key}>
            <InputController
              name={key}
              {...args}
            />
          </React.Fragment>
        )
      })}
      <Button submit>保存</Button>
    </form>
  )
}
