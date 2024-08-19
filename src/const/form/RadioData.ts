// import * as zod from 'zod'

// import * as ZodSchema from '@/const/form/Schema'

import { InputProps } from '@/types/form/radioAttribute'

type TextInputDataType = Record<
  string,
  Omit<InputProps, 'data'> // & { zod: zod.ZodString}
>

export const RADIO_DATA: TextInputDataType = {
  test: {
    id: 'test',
    label: 'ラジオテスト',
  },
} as const