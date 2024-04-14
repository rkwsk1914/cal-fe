import type { MonthlyKey } from '@/types/form/MonthlyKey'

export const MONTHLY_KEYS: Array<MonthlyKey> = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

export const JAP_MONTHLY_KEYS: Record<MonthlyKey, string> = {
  Jan: '1月',
  Feb: '2月',
  Mar: '3月',
  Apr: '4月',
  May: '5月',
  Jun: '6月',
  Jul: '7月',
  Aug: '8月',
  Sept: '9月',
  Oct: '10月',
  Nov: '11月',
  Dec: '12月'
}

export const EveryPattern = [
  { id: 'every month', name: '毎月' },
  { id: 'every second month', name: '隔月' },
  { id: 'every year', name: '毎年' }
]