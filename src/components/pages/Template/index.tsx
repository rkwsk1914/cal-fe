import * as React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { useSetZodScheme }from '@/hooks/form/useSetZodScheme'

import { CheckBoxController } from '@/components/form/organisms/CheckBoxController'
import { InputController } from '@/components/form/organisms/InputController'
import { RadioController } from '@/components/form/organisms/RadioController'
import { SelectController } from '@/components/form/organisms/SelectController'
import { FromLayout } from '@/components/layouts/FromLayout'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

type Props = {};

export const Template: React.FC<Props> = ({}): JSX.Element => {
  const defaultValues: DefaultValuesType = {
    testTextInput: 'ああ',
    testRadio: '5',
    testCheck: ['5', '1'],
    testCheckBoolean: [`true`],
    testSelect: '',
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
    <FromLayout handleSubmit={handleSubmit(onSubmit)} listHref=''>
      <InputController
        name="testTextInput"
        {...args}
      />
      <RadioController
        name="testRadio"
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
      <CheckBoxController
        name="testCheckBoolean"
        {...args}
        data={[
          { value: 'true', label: 'フラグ' },
        ]}
      />
      <SelectController
        name="testSelect"
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
