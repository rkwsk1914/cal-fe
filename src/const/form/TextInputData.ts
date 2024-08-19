import * as zod from 'zod'

import * as chrFormatChange from '@/utils/chrFormatChange'

import * as ZodSchema from '@/const/form/Schema'

import { TextInputProps } from '@/types/form/InputAttribute'


type TextInputDataType = Record<
  string,
  TextInputProps &
  { zod: zod.ZodString}
>

export const TEXT_INPUT_DATA: TextInputDataType = {
  firstName: {
    id: 'firstName',
    label: '姓',
    inputTextArgs: {
      type: 'text',
      autoComplete: 'family-name',
      placeholder: '山田',
    },
    zod: ZodSchema.NAME_SCHEMA
  },
  lastName: {
    id: 'lastName',
    label: '名',
    inputTextArgs: {
      type: 'text',
      autoComplete: 'given-name',
      placeholder: '太郎',
    },
    zod: ZodSchema.NAME_SCHEMA
  },
  firstKanaName: {
    id: 'firstKanaName',
    label: 'ふりがな（姓）',
    inputTextArgs: {
    type: 'text',
    placeholder: 'やまだ',
    },
    zod: ZodSchema.NAME_KANA_SCHEMA
  },
  lastKanaName: {
    id: 'lastKanaName',
    label: 'ふりがな（名）',
    inputTextArgs: {
      type: 'text',
      placeholder: 'たろう',
    },
    zod: ZodSchema.NAME_KANA_SCHEMA
  },
  email: {
    id: 'email',
    label: 'メールアドレス',
    inputTextArgs: {
      type: 'email',
      autoComplete: 'email',
      placeholder: 'sample@sample.com',
    },
    zod: ZodSchema.EMAIL_SCHEMA
  },
  tel: {
    id: 'tel',
    label: '電話番号',
    inputTextArgs: {
      type: 'tel',
      placeholder: '08012345678',
    },
    zod: ZodSchema.TEL_SCHEMA
  },
  postalCode: {
    id: 'postalCode',
    label: '郵便番号',
    inputTextArgs: {
      type: 'text',
      autoComplete: 'postal-code',
      placeholder: '1234567',
    },
    zod: ZodSchema.TEMPORALLY
  },
  address1: {
    id: 'address1',
    label: '住所１',
    inputTextArgs: {
      type: 'text',
      autoComplete: 'address-line1',
      placeholder: '都道府県 市区町村 番地',
    },
    zod: ZodSchema.TEMPORALLY
  },
  address2: {
    id: 'address2',
    label: '住所１',
    inputTextArgs: {
      type: 'text',
      autoComplete: 'address-line1',
      placeholder: '建物名 部屋番号',
    },
    zod: ZodSchema.TEMPORALLY
  },
  password: {
    id: 'password',
    label: 'パスワード',
    inputTextArgs: {
      type: 'password',
      autoComplete: 'new-password',
    },
    zod: ZodSchema.TEMPORALLY
  },
  contact: {
    id: 'content',
    label: 'お問い合わせ内容',
    inputTextArgs: {
      type: 'text',
    },
    zod: ZodSchema.TEXT_AREA_SCHEMA
  },
  bankName: {
    id: 'bankName',
    label: '口座名',
    inputTextArgs: {
      type: 'text',
      placeholder: '〇〇銀行',
    },
    zod: ZodSchema.TEXT_SCHEMA,
    onBlurFormat: (value) => {
      return chrFormatChange.fixFullWidth(
        value
      )
    }
  },
  bankBranchName: {
    id: 'bankBranchName',
    label: '支店名',
    inputTextArgs: {
      type: 'text',
      placeholder: '〇〇支店',
    },
    zod: ZodSchema.TEXT_SCHEMA,
    onBlurFormat: (value) => {
      return chrFormatChange.fixFullWidth(
        value
      )
    }
  },
} as const