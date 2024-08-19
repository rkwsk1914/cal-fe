import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useSetZodScheme }from '@/hooks/form/useSetZodScheme'

import { FromLayout } from '@/components/layouts/FromLayout'
import { CheckBoxController } from '@/components/organisms/CheckBoxController'
import { InputController } from '@/components/organisms/InputController'
import { RadioController } from '@/components/organisms/RadioController'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

type Props = {};

export const Template: React.FC<Props> = ({}): JSX.Element => {
  const defaultValues: DefaultValuesType = {
    bankName: 'ああ',
    bankBranchName: 'ああ',
    test: '5',
    testCheck: ['5', '1']
  }

  const { scheme } = useSetZodScheme(defaultValues)

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(scheme),
  })

  const args = {
    errors,
    trigger,
    control
  }

  const onSubmit = (data: any) => {
    console.info(data)
  }

  return (
    <FromLayout handleSubmit={handleSubmit(onSubmit)}>
      <InputController
        name="bankName"
        {...args}
      />
      <InputController
        name="bankBranchName"
        {...args}
      />
      <RadioController
        name="test"
        {...args}
        data={[
          { value: '1', label: 'itemA' },
          { value: '2', label: 'itemB' },
          { value: '3', label: 'itemC' },
          { value: '4', label: 'itemD' },
          { value: '5', label: 'itemE' },
          { value: '6', label: 'itemAF' },
        ]}
      />
      <CheckBoxController
        name="testCheck"
        {...args}
        data={[
          { value: '1', label: 'itemA' },
          { value: '2', label: 'itemB' },
          { value: '3', label: 'itemC' },
          { value: '4', label: 'itemD' },
          { value: '5', label: 'itemE' },
          { value: '6', label: 'itemAF' },
        ]}
      />
    </FromLayout>
  )
}
