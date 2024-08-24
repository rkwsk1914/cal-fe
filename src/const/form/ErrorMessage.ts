const maxLengthErrorMessage = (value: string | number ) => `最大${value}文字までしか入力できません。`
const minLengthErrorMessage = (value: string | number ) => `最低${value}文字入力が必要です。`

const lengthErrorMessage = (value: string | number ) => `${value}文字入力してください。`

export const MAX_LENGTH_LIST = {
  email: 100,
  name: 50,
  tel: 11,
  contact: 500,
  year: 4,
  monthAndDay: 2
}

export const MIN_LENGTH_LIST = {
  year: 4,
}

export const ERROR_MESSAGE = {
  0: 'メールアドレスの形式で入力してください。例）sample@sample.com',
  required: '入力必須項目です。',
  2: maxLengthErrorMessage(MAX_LENGTH_LIST.email),
  3: maxLengthErrorMessage(MAX_LENGTH_LIST.name),
  4: maxLengthErrorMessage(MAX_LENGTH_LIST.tel),
  5: maxLengthErrorMessage(MAX_LENGTH_LIST.contact),
  6: '全角ひらがなで入力してください。',
  7: '全角カタカナで入力してください。',
  8: '半角カタカナで入力してください。',
  9: `半角数字${lengthErrorMessage(MAX_LENGTH_LIST.tel)}`,
  fullCharacter: `半角英数字は無効です。`,
  11: '電話番号の形式が違います。ハイフンは不要です。',
  12: maxLengthErrorMessage(MAX_LENGTH_LIST.year),
  13: maxLengthErrorMessage(MAX_LENGTH_LIST.monthAndDay),
  14: minLengthErrorMessage(MIN_LENGTH_LIST.year),
  dataError: '無効です。',
  15: '年月日が不正です。yyyy/mm/dd',
} as const satisfies { [key: number | string]: string }
