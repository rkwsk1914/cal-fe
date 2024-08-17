import formatNumber from 'format-number'

export const useFormat = (): {
  yenFormat: (_number: number | null) => string
  commaFormat: (_number: number) => string
  removeComma: (_stringWithComma: string) => string
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

  return {
    yenFormat,
    commaFormat,
    removeComma
  }
}
