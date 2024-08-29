import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import * as zod from 'zod'


import * as chrFormatChange from '@/utils/chrFormatChange'

import * as ZodSchema from '@/const/form/Schema'

import { InputProps } from '@/types/form/InputAttribute'

const {
  fixFullWidth,
  fixHalfWidth,
  removeOtherHalfNumber,
  commaFormat,
} = chrFormatChange

export type InputDataType = Record<
  string,
  Omit<InputProps, 'control'> &
  { zod: zod.ZodString | zod.ZodArray<zod.ZodString, 'atleastone' | 'many'>}
>

export const INPUT_DATA = {
  // テスト
  testTextInput: {
    label: 'テキストテスト',
    inputTextArgs: {
      type: 'text',
      placeholder: 'テスト',
    },
    zod: ZodSchema.TEMPORALLY
  },
  testSelect: {
    label: 'セレクトテスト',
    zod: ZodSchema.TEXT_SCHEMA
  },
  testRadio: {
    label: 'ラジオテスト',
    zod: ZodSchema.RADIO_SCHEME
  },
  testCheck: {
    label: 'チェックボックステスト',
    zod: ZodSchema.CHECKBOX_SCHEME
  },
  testCheckBoolean: {
    label: 'チェックボックステスト フラグ',
    zod: ZodSchema.CHECKBOX_SCHEME
  },

  // INPUT系
  email: {
    label: 'メールアドレス',
    inputTextArgs: {
      type: 'email',
      autoComplete: 'email',
      placeholder: 'sample@sample.com',
    },
    zod: ZodSchema.EMAIL_SCHEMA
  },
  tel: {
    label: '電話番号',
    inputTextArgs: {
      type: 'text',
      inputMode: 'numeric',
      placeholder: '08012345678',
    },
    zod: ZodSchema.TEL_SCHEMA
  },
  postalCode: {
    label: '郵便番号',
    inputTextArgs: {
      type: 'text',
      autoComplete: 'postal-code',
      placeholder: '1234567',
    },
    zod: ZodSchema.TEMPORALLY
  },
  address1: {
    label: '住所１',
    inputTextArgs: {
      type: 'text',
      autoComplete: 'address-line1',
      placeholder: '都道府県 市区町村 番地',
    },
    zod: ZodSchema.TEMPORALLY
  },
  address2: {
    label: '住所１',
    inputTextArgs: {
      type: 'text',
      autoComplete: 'address-line1',
      placeholder: '建物名 部屋番号',
    },
    zod: ZodSchema.TEMPORALLY
  },
  password: {
    label: 'パスワード',
    inputTextArgs: {
      type: 'password',
      autoComplete: 'new-password',
    },
    zod: ZodSchema.TEMPORALLY
  },
  contact: {
    label: 'お問い合わせ内容',
    inputTextArgs: {
      type: 'text',
    },
    zod: ZodSchema.TEXT_AREA_SCHEMA
  },
  description: {
    label: '備考',
    inputTextArgs: {
      type: 'text',
    },
    zod: ZodSchema.TEXT_SCHEMA,
    onBlurFormat: (value) => {
      return fixFullWidth(
        value
      )
    }
  },

  // INPUT系　名前
  firstName: {
    label: '姓',
    inputTextArgs: {
      type: 'text',
      autoComplete: 'family-name',
      placeholder: '山田',
    },
    zod: ZodSchema.NAME_SCHEMA
  },
  lastName: {
    label: '名',
    inputTextArgs: {
      type: 'text',
      autoComplete: 'given-name',
      placeholder: '太郎',
    },
    zod: ZodSchema.NAME_SCHEMA
  },
  firstKanaName: {
    label: 'ふりがな（姓）',
    inputTextArgs: {
    type: 'text',
    placeholder: 'やまだ',
    },
    zod: ZodSchema.NAME_KANA_SCHEMA
  },
  lastKanaName: {
    label: 'ふりがな（名）',
    inputTextArgs: {
      type: 'text',
      placeholder: 'たろう',
    },
    zod: ZodSchema.NAME_KANA_SCHEMA
  },
  bankName: {
    label: '口座名',
    inputTextArgs: {
      type: 'text',
      placeholder: '〇〇銀行',
    },
    zod: ZodSchema.TEXT_SCHEMA,
    onBlurFormat: (value) => {
      return fixFullWidth(
        value
      )
    }
  },
  bankBranchName: {
    label: '支店名',
    inputTextArgs: {
      type: 'text',
      placeholder: '〇〇支店',
    },
    zod: ZodSchema.TEXT_SCHEMA,
    onBlurFormat: (value) => {
      return fixFullWidth(
        value
      )
    }
  },
  paymentName: {
    label: '支払い方法',
    inputTextArgs: {
      type: 'text',
      placeholder: '〇〇払い',
    },
    zod: ZodSchema.TEXT_SCHEMA,
    onBlurFormat: (value) => {
      return fixFullWidth(
        value
      )
    }
  },
  fixedCostPatternName: {
    label: '固定費パターン名',
    inputTextArgs: {
      type: 'text',
    },
    zod: ZodSchema.TEXT_SCHEMA,
    onBlurFormat: (value) => {
      return fixFullWidth(
        value
      )
    }
  },
  fixedCostName: {
    label: '固定費名',
    inputTextArgs: {
      type: 'text',
    },
    zod: ZodSchema.TEXT_SCHEMA,
    onBlurFormat: (value) => {
      return fixFullWidth(
        value
      )
    }
  },
  loanName: {
    label: 'ローン名',
    inputTextArgs: {
      type: 'text',
    },
    zod: ZodSchema.TEXT_SCHEMA,
    onBlurFormat: (value) => {
      return fixFullWidth(value)
    }
  },
  expenditureName: {
    label: '項目名',
    inputTextArgs: {
      type: 'text',
    },
    zod: ZodSchema.TEXT_SCHEMA,
    onBlurFormat: (value) => {
      return fixFullWidth(value)
    }
  },

  // INPUT系　金額系
  amount: {
    label: '金額',
    inputTextArgs: {
      type: 'text',
      inputMode: 'numeric',
      mask: createNumberMask({
        prefix: '',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ',',
        allowDecimal: false,
        decimalSymbol: '.',
        decimalLimit: 0, // 小数点は許容しない
        integerLimit: null, // 桁数の制限なし
        allowNegative: false, // マイナス記号は許容しない
      })
    },
    suffix: '円',
    zod: ZodSchema.TEXT_SCHEMA,
  },
  basePrice: {
    label: '借入金額',
    inputTextArgs: {
      type: 'text',
      inputMode: 'numeric',
      mask: createNumberMask({
        prefix: '',
        suffix: '',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ',',
        allowDecimal: false,
        decimalSymbol: '.',
        decimalLimit: 0, // 小数点は許容しない
        integerLimit: null, // 桁数の制限なし
        allowNegative: false, // マイナス記号は許容しない
      })
    },
    suffix: '円',
    zod: ZodSchema.TEXT_SCHEMA,
  },
  rate: {
    label: '年利（%）',
    inputTextArgs: {
      type: 'text',
      placeholder: '10.00%',
      inputMode: 'numeric',
      mask: createNumberMask({
        prefix: '',
        suffix: '%',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: ',',
        allowDecimal: true,
        decimalSymbol: '.',
        decimalLimit: 2, // 小数点第二位まで
        integerLimit: 2, // 桁数の制限なし
        allowNegative: false, // マイナス記号は許容しない
      })
    },
    suffix: '%',
    zod: ZodSchema.TEXT_SCHEMA,
  },
  interest: {
    label: '利息',
    inputTextArgs: {
      type: 'text',
      inputMode: 'numeric'
    },
    zod: ZodSchema.TEXT_SCHEMA,
    onBlurFormat: (value) => {
      if (value === '') return ''
      return commaFormat(
        Number(
          fixHalfWidth(
            removeOtherHalfNumber(value)
          )
        )
      )
    }
  },

  // INPUT系　日にち系
  startDate: {
    label: '開始日',
    inputTextArgs: {
      type: 'text',
      inputMode: 'numeric',
      mask: [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/],
    },
    zod: ZodSchema.DATE_TEXT_SCHEMA,
  },
  occurrenceDate: {
    label: '発生日',
    inputTextArgs: {
      type: 'text',
      inputMode: 'numeric',
      mask: [/\d/, /\d/, /\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/],
    },
    zod: ZodSchema.DATE_TEXT_SCHEMA,
  },

  // SELECT系
  bank: {
    label: '引き落とし口座',
    zod: ZodSchema.TEXT_SCHEMA
  },
  fixedCostPattern: {
    label: '固定費パターン',
    zod: ZodSchema.TEXT_SCHEMA
  },
  payment: {
    label: '支払い方法',
    zod: ZodSchema.TEXT_SCHEMA
  },
  installmentsCount: {
    label: '分割回数',
    zod: ZodSchema.TEXT_SCHEMA
  },
  closingDay: {
    label: '締め日',
    zod: ZodSchema.TEXT_SCHEMA
  },
  payDay: {
    label: '引き落とし日',
    zod: ZodSchema.TEXT_SCHEMA
  },
  category: {
    label: 'カテゴリー',
    zod: ZodSchema.TEXT_SCHEMA
  },

  // ラジオ系
  color: {
    label: 'カラー',
    zod: ZodSchema.RADIO_SCHEME,
  },

  //　チェックボックス系
  isCredit: {
    label: 'クレジット払い',
    zod: ZodSchema.CHECKBOX_SCHEME
  },
  temporary: {
    label: '仮',
    zod: ZodSchema.CHECKBOX_SCHEME
  },
} as const satisfies InputDataType

export const INPUT_ARRAY_DATA = {
  expenditures: {
    expenditureName: INPUT_DATA.expenditureName,
    description: INPUT_DATA.description,
    amount: INPUT_DATA.amount,
    payment: INPUT_DATA.payment,
    occurrenceDate: INPUT_DATA.occurrenceDate,
    temporary: INPUT_DATA.temporary,
    category: INPUT_DATA.category
  }
} as const satisfies Record<string, InputDataType>