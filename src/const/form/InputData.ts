import type { InputDataType } from '@/types/form'

const INPUT_DATA: InputDataType = {
  firstName: {
    name: 'firstName',
    label: '姓',
    type: 'text',
    autoComplete: 'family-name',
    placeholder: '山田',
    required: true
  },
  lastName: {
    name: 'lastName',
    label: '名',
    type: 'text',
    autoComplete: 'given-name',
    placeholder: '太郎',
    required: true
  },
  firstKanaName: {
    name: 'firstKanaName',
    label: 'ふりがな（姓）',
    type: 'text',
    placeholder: 'やまだ',
    required: true
  },
  lastKanaName: {
    name: 'lastKanaName',
    label: 'ふりがな（名）',
    type: 'text',
    placeholder: 'たろう',
    required: true
  },
  email: {
    name: 'email',
    label: 'メールアドレス',
    type: 'email',
    autoComplete: 'email',
    placeholder: 'sample@sample.com',
    required: true
  },
  tel: {
    name: 'tel',
    label: '電話番号',
    type: 'tel',
    placeholder: '08012345678',
    required: true
  },
  postalCode: {
    name: 'postalCode',
    label: '郵便番号',
    type: 'text',
    autoComplete: 'postal-code',
    placeholder: '1234567',
    required: true
  },
  address1: {
    name: 'address1',
    label: '住所１',
    type: 'text',
    autoComplete: 'address-line1',
    placeholder: '都道府県 市区町村 番地',
    required: true
  },
  address2: {
    name: 'address2',
    label: '住所１',
    type: 'text',
    autoComplete: 'address-line1',
    placeholder: '建物名 部屋番号',
    required: true
  },
  password: {
    name: 'password',
    label: 'パスワード',
    type: 'password',
    autoComplete: 'new-password',
    required: true
  },
  contact: {
    name: 'content',
    label: 'お問い合わせ内容',
    type: 'text',
    required: true
  },
  year: {
    name: 'year',
    label: '年',
    type: 'text',
  },
  month: {
    name: 'month',
    label: '月',
    type: 'text',
  },
  day: {
    name: 'day',
    label: '日',
    type: 'text',
  },
  name: {
    name: 'name',
    label: '項目名',
    type: 'text',
    required: true,
    autoComplete: 'off'
  },
  payDay: {
    name: 'payDay',
    label: '支払日',
    type: 'text',
    required: true
  },
  price: {
    name: 'price',
    label: '金額',
    type: 'tel',
    required: true,
    autoComplete: 'off'
  },
  discount: {
    name: 'discount',
    label: '割引',
    required: true,
  },
  payId: {
    name: 'payId',
    label: '支払い方法ID',
    type: 'hidden'
  },
  payName: {
    name: 'pay',
    label: '支払い方法',
  },
  categoryId: {
    name: 'categoryId',
    label: 'カテゴリーID',
    type: 'hidden',
  },
  categoryName: {
    name: 'category',
    label: 'カテゴリー',
  },
  bankId: {
    name: 'bankId',
    label: '引き落とし口座ID',
    type: 'hidden',
    required: true
  },
  bankName: {
    name: 'bankName',
    label: '引き落とし口座',
    required: true
  },
  debitDay: {
    name: 'debitDay',
    label: '引き落とし日',
    type: 'text',
  },
  startAggregation: {
    name: 'startAggregation',
    label: '集計開始日',
    type: 'text',
  },
  endAggregation: {
    name: 'endAggregation',
    label: '集計終了日',
    type: 'text',
  },
  fixedPattern: {
    name: 'fixedPattern',
    label: '固定費パターン',
    required: true
  },
  Jan: {
    name: 'jan',
    label: '1月',
    required: true
  },
  Feb: {
    name: 'Feb',
    label: '2月',
    required: true
  },
  Mar: {
    name: 'Mar',
    label: '3月',
    required: true
  },
  Apr: {
    name: 'Apr',
    label: '4月',
    required: true
  },
  May: {
    name: 'May',
    label: '5月',
    required: true
  },
  Jun: {
    name: 'Jun',
    label: '6月',
    required: true
  },
  Jul: {
    name: 'Jul',
    label: '7月',
    required: true
  },
  Aug: {
    name: 'Aug',
    label: '8月',
    required: true
  },
  Sept: {
    name: 'Sept',
    label: '9月',
    required: true
  },
  Oct: {
    name: 'Oct',
    label: '10月',
    required: true
  },
  Nov: {
    name: 'Nov',
    label: '11月',
    required: true
  },
  Dec: {
    name: 'Dec',
    label: '12月',
    required: true
  },
  startMonth: {
    name: 'startMonth',
    label: '開始月',
  },
  monthPattern: {
    name: 'monthPattern',
    label: '間隔',
    required: true
  },
  incomeDay: {
    name: 'incomeDay',
    label: '入金日',
    type: 'text',
    required: true
  },
}

export {
  INPUT_DATA
}