import * as zod from 'zod'

import * as ZodSchema from '@/const/form/Schema'

import { InputProps } from '@/types/form/checkBoxAttribute'

type InputDataType = Record<
  string,
  Omit<InputProps, 'data'> & { zod: zod.ZodArray<zod.ZodString, 'atleastone' | 'many'>}
>

export const CHECKBOX_DATA: InputDataType = {
  testCheck: {
    id: 'testCheck',
    label: 'チェックボックステスト',
    zod: ZodSchema.CHECKBOX_SCHEME
  },
  testCheckBoolean: {
    id: 'testCheckBoolean',
    label: 'チェックボックステスト フラグ',
    zod: ZodSchema.CHECKBOX_SCHEME_BOOLEAN
  },
  bank: {
    id: 'bank',
    label: '引き落とし口座',
    zod: ZodSchema.CHECKBOX_SCHEME
  },
  isCredit: {
    id: 'isCredit',
    label: 'クレジット払い',
    zod: ZodSchema.CHECKBOX_SCHEME_BOOLEAN
  },
} as const