import { format } from 'date-fns'
import formatNumber from 'format-number'

export const useFormat = (): {
  yenFormat: (_number: number | null) => string
  commaFormat: (_number: number) => string
  removeComma: (_stringWithComma: string) => string
  numberWithUnit: (_number: number, _unit: string) => string
  numberDayFormat: (_number: number) => string
  yyyyMmDd: (_day: Date | string | number) => string
} => {
  const yenFormat = (number: number | null): string => {
    const myFormat = formatNumber({
      prefix: '¥',
      round: 0
    })
    return myFormat(number ?? 0)
  }

  const commaFormat = (number: number | null): string => {
    const myFormat = formatNumber({
      round: 0
    })
    return myFormat(number ?? 0)
  }

  const removeComma = (stringWithComma: string) => {
    return stringWithComma.replace(/,/g, '')
  }

  const numberDayFormat = (number: number | null): string => {
    const myFormat = formatNumber({
      suffix: '日',
      round: 0,
    })
    return myFormat(number ?? 0)
  }

  const numberWithUnit = (number: number | null, unit: string): string => {
    const myFormat = formatNumber({
      suffix: unit,
      round: 0,
    })
    return myFormat(number ?? 0)
  }

  const yyyyMmDd = (day: Date | string | number): string => {
    return format(day, 'yyyy/MM/dd')
  }

  return {
    yenFormat,
    commaFormat,
    removeComma,
    numberWithUnit,
    numberDayFormat,
    yyyyMmDd
  }
}
