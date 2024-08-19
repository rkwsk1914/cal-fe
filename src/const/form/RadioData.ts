import * as zod from 'zod'

import * as ZodSchema from '@/const/form/Schema'

import { InputProps } from '@/types/form/radioAttribute'

type InputDataType = Record<
  string,
  Omit<InputProps, 'data'> & { zod: zod.ZodString}
>

export const RADIO_DATA: InputDataType = {
  test: {
    id: 'test',
    label: 'ラジオテスト',
    zod: ZodSchema.RADIO_SCHEME
  },
  bank: {
    id: 'bank',
    label: '引き落とし口座',
    zod: ZodSchema.RADIO_SCHEME
  },
} as const