import * as zod from 'zod'

import { INPUT_DATA, INPUT_ARRAY_DATA } from '@/const/form/InputData'

import { InputProps } from '@/types/form/InputAttribute'

export const useGetInputData = (
  name: string
): Omit<InputProps, 'control'> & { zod: zod.ZodString | zod.ZodArray<zod.ZodString, 'atleastone' | 'many'> }  => {

  // まず INPUT_DATA から探す
  if (name in INPUT_DATA) {
    return INPUT_DATA[name as keyof typeof INPUT_DATA]
  }

  // 次に INPUT_ARRAY_DATA の第二階層から探す
  const [arrayKey, , fieldKey] = name.split('.') // 例: ["expenditures", "0", "temporary"]
  if (arrayKey in INPUT_ARRAY_DATA) {
    const arrayData = INPUT_ARRAY_DATA[arrayKey as keyof typeof INPUT_ARRAY_DATA]
    if (fieldKey in arrayData) {
      return arrayData[fieldKey as keyof typeof arrayData]
    }
  }

  // 該当するフィールドがない場合はエラーを投げる
  throw new Error(`Field data for '${name}' not found in INPUT_DATA or INPUT_ARRAY_DATA!`)
}
