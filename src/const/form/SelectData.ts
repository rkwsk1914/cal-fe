import * as zod from 'zod'

import * as ZodSchema from '@/const/form/Schema'

import { InputProps } from '@/types/form/InputAttribute'

type InputDataType = Record<
  string,
  Omit<InputProps, 'data'> & { zod: zod.ZodString}
>

export const SELECT_DATA: InputDataType = {
  testSelect: {
    id: 'testSelect',
    label: 'セレクトテスト',
    zod: ZodSchema.TEXT_SCHEMA
  },
  bank: {
    id: 'bank',
    label: '引き落とし口座',
    zod: ZodSchema.TEXT_SCHEMA
  },
} as const