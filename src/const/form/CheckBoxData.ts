import * as zod from 'zod'

import * as ZodSchema from '@/const/form/Schema'

import { InputProps } from '@/types/form/checkBoxAttribute'

type InputDataType = Record<
  string,
  Omit<InputProps, 'data'> & { zod: zod.ZodArray<zod.ZodString, 'atleastone'>}
>

export const CHECKBOX_DATA: InputDataType = {
  testCheck: {
    id: 'testCheck',
    label: 'チェックボックステスト',
    zod: ZodSchema.CHECKBOX_SCHEME
  },
  bank: {
    id: 'bank',
    label: '引き落とし口座',
    zod: ZodSchema.CHECKBOX_SCHEME
  },
} as const