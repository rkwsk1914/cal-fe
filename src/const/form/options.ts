import type { SelectOptionType } from '@/types/form/InputAttribute'

export const DAY_OPTIONS: SelectOptionType = [...Array(31)].map((_i, index) => ({
  value: String(index),
  label: String(index)
}))