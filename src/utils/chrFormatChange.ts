import { format } from 'date-fns'
import formatNumber from 'format-number'

const HALF_TO_FULL_MAP: { [key: string]: string } = {
  'ｶﾞ': 'ガ', 'ｷﾞ': 'ギ', 'ｸﾞ': 'グ', 'ｹﾞ': 'ゲ', 'ｺﾞ': 'ゴ',
  'ｻﾞ': 'ザ', 'ｼﾞ': 'ジ', 'ｽﾞ': 'ズ', 'ｾﾞ': 'ゼ', 'ｿﾞ': 'ゾ',
  'ﾀﾞ': 'ダ', 'ﾁﾞ': 'ヂ', 'ﾂﾞ': 'ヅ', 'ﾃﾞ': 'デ', 'ﾄﾞ': 'ド',
  'ﾊﾞ': 'バ', 'ﾋﾞ': 'ビ', 'ﾌﾞ': 'ブ', 'ﾍﾞ': 'ベ', 'ﾎﾞ': 'ボ',
  'ﾊﾟ': 'パ', 'ﾋﾟ': 'ピ', 'ﾌﾟ': 'プ', 'ﾍﾟ': 'ペ', 'ﾎﾟ': 'ポ',
  'ｳﾞ': 'ヴ', 'ﾜﾞ': 'ヷ', 'ｦﾞ': 'ヺ',
  'ｱ': 'ア', 'ｲ': 'イ', 'ｳ': 'ウ', 'ｴ': 'エ', 'ｵ': 'オ',
  'ｶ': 'カ', 'ｷ': 'キ', 'ｸ': 'ク', 'ｹ': 'ケ', 'ｺ': 'コ',
  'ｻ': 'サ', 'ｼ': 'シ', 'ｽ': 'ス', 'ｾ': 'セ', 'ｿ': 'ソ',
  'ﾀ': 'タ', 'ﾁ': 'チ', 'ﾂ': 'ツ', 'ﾃ': 'テ', 'ﾄ': 'ト',
  'ﾅ': 'ナ', 'ﾆ': 'ニ', 'ﾇ': 'ヌ', 'ﾈ': 'ネ', 'ﾉ': 'ノ',
  'ﾊ': 'ハ', 'ﾋ': 'ヒ', 'ﾌ': 'フ', 'ﾍ': 'ヘ', 'ﾎ': 'ホ',
  'ﾏ': 'マ', 'ﾐ': 'ミ', 'ﾑ': 'ム', 'ﾒ': 'メ', 'ﾓ': 'モ',
  'ﾔ': 'ヤ', 'ﾕ': 'ユ', 'ﾖ': 'ヨ',
  'ﾗ': 'ラ', 'ﾘ': 'リ', 'ﾙ': 'ル', 'ﾚ': 'レ', 'ﾛ': 'ロ',
  'ﾜ': 'ワ', 'ｦ': 'ヲ', 'ﾝ': 'ン',
  'ｧ': 'ァ', 'ｨ': 'ィ', 'ｩ': 'ゥ', 'ｪ': 'ェ', 'ｫ': 'ォ',
  'ｯ': 'ッ', 'ｬ': 'ャ', 'ｭ': 'ュ', 'ｮ': 'ョ',
  '｡': '。', '､': '、', 'ｰ': 'ー', '｢': '「', '｣': '」', '･': '・',
  '¥': '￥'
}

const FULL_TO_HALF_MAP: { [key: string]: string } = {
  'ガ': 'ｶﾞ', 'ギ': 'ｷﾞ', 'グ': 'ｸﾞ', 'ゲ': 'ｹﾞ', 'ゴ': 'ｺﾞ',
  'ザ': 'ｻﾞ', 'ジ': 'ｼﾞ', 'ズ': 'ｽﾞ', 'ゼ': 'ｾﾞ', 'ゾ': 'ｿﾞ',
  'ダ': 'ﾀﾞ', 'ヂ': 'ﾁﾞ', 'ヅ': 'ﾂﾞ', 'デ': 'ﾃﾞ', 'ド': 'ﾄﾞ',
  'バ': 'ﾊﾞ', 'ビ': 'ﾋﾞ', 'ブ': 'ﾌﾞ', 'ベ': 'ﾍﾞ', 'ボ': 'ﾎﾞ',
  'パ': 'ﾊﾟ', 'ピ': 'ﾋﾟ', 'プ': 'ﾌﾟ', 'ペ': 'ﾍﾟ', 'ポ': 'ﾎﾟ',
  'ヴ': 'ｳﾞ', 'ヷ': 'ﾜﾞ', 'ヺ': 'ｦﾞ',
  'ア': 'ｱ', 'イ': 'ｲ', 'ウ': 'ｳ', 'エ': 'ｴ', 'オ': 'ｵ',
  'カ': 'ｶ', 'キ': 'ｷ', 'ク': 'ｸ', 'ケ': 'ｹ', 'コ': 'ｺ',
  'サ': 'ｻ', 'シ': 'ｼ', 'ス': 'ｽ', 'セ': 'ｾ', 'ソ': 'ｿ',
  'タ': 'ﾀ', 'チ': 'ﾁ', 'ツ': 'ﾂ', 'テ': 'ﾃ', 'ト': 'ﾄ',
  'ナ': 'ﾅ', 'ニ': 'ﾆ', 'ヌ': 'ﾇ', 'ネ': 'ﾈ', 'ノ': 'ﾉ',
  'ハ': 'ﾊ', 'ヒ': 'ﾋ', 'フ': 'ﾌ', 'ヘ': 'ﾍ', 'ホ': 'ﾎ',
  'マ': 'ﾏ', 'ミ': 'ﾐ', 'ム': 'ﾑ', 'メ': 'ﾒ', 'モ': 'ﾓ',
  'ヤ': 'ﾔ', 'ユ': 'ﾕ', 'ヨ': 'ﾖ',
  'ラ': 'ﾗ', 'リ': 'ﾘ', 'ル': 'ﾙ', 'レ': 'ﾚ', 'ロ': 'ﾛ',
  'ワ': 'ﾜ', 'ヲ': 'ｦ', 'ン': 'ﾝ',
  'ァ': 'ｧ', 'ィ': 'ｨ', 'ゥ': 'ｩ', 'ェ': 'ｪ', 'ォ': 'ｫ',
  'ッ': 'ｯ', 'ャ': 'ｬ', 'ュ': 'ｭ', 'ョ': 'ｮ',
  '。': '｡', '、': '､', 'ー': 'ｰ', '「': '｢', '」': '｣', '・': '･',
  '￥': '¥'
}

// カタカナをひらがなに変換する
const fixHiraGanaText = (originalValue: string) => {
  return originalValue.replace(/[\u30a1-\u30f6]/g, (match) => {
    const chr = match.charCodeAt(0) - 0x60
    return String.fromCharCode(chr)
  })
}

// ひらがなをカタカナに変換する
const fixKataKanaText = (originalValue: string) => {
  return originalValue.replace(/[\u3041-\u3096]/g, (match) => {
    const chr = match.charCodeAt(0) + 0x60
    return String.fromCharCode(chr)
  })
}

// 半角を全角に変換する
const fixFullWidth = (originalValue: string) => {
  const convertToFullWidth = (input: string): string => {
    let converted = ''
    for (let i = 0; i < input.length; i++) {
      const char = input[i]
      const fullWidthChar = HALF_TO_FULL_MAP[char] || char
      converted += fullWidthChar
    }
    return converted
  }

  return convertToFullWidth(originalValue).replace(/[!-~]/g, (match) => {
    return  HALF_TO_FULL_MAP[match] ? HALF_TO_FULL_MAP[match] : String.fromCharCode(match.charCodeAt(0) + 0xFEE0)
  })
}

// 全角を半角に変換する
const fixHalfWidth = (originalValue: string) => {
  const convertToHalfWidth = (input: string): string => {
    let converted = ''
    for (let i = 0; i < input.length; i++) {
      const char = input[i]
      const fullWidthChar = FULL_TO_HALF_MAP[char] || char
      converted += fullWidthChar
    }
    return converted
  }

  return convertToHalfWidth(originalValue).replace(/[！-～]/g, (match) => {
    return FULL_TO_HALF_MAP[match] ? FULL_TO_HALF_MAP[match] : String.fromCharCode(match.charCodeAt(0) - 0xFEE0)
  })
}

// 空白を消す
const removeSpace = (originalValue: string) => {
  return originalValue.replace(/[ 　]+/g,  () => {
    return ''
  })
}

// 全角文字から半角数字・全角数字を消す
const removeFullWidthNumber = (originalValue: string) => {
  return fixFullWidth(fixHalfWidth(originalValue).replace(/\d/g, () => {
    return ''
  }))
}

// 全角文字から半角英数字・全角英数字を消す
const removeFullWidthNumberAlphabet = (originalValue: string) => {
  return fixFullWidth(fixHalfWidth(originalValue).replace(/\w/g, () => {
    return ''
  }))
}

// 全角記号を消す
const removeFullWidthSymbol = (originalValue: string) => {
  return fixFullWidth(originalValue).replace(/[\uFF01-\uFF5E]|￥/g, () => {
    return ''
  })
}

// 全角文字を消す
const removeFullWidth = (originalValue: string) => {
  return originalValue.replace(
    /[\u3000-\u303F\u3040-\u309F\u30A0-\u30FF\uFF00-\uFFEF]/g,
    () => {
      return ''
    }
  )
}

// 半角文字から半角数字・全角数字を消す
const removeHalfWidthNumber = (originalValue: string) => {
  return fixHalfWidth(originalValue).replace(/\d/g, () => {
    return ''
  })
}

// 半角数字以外の文字を消す
const removeOtherHalfNumber = (originalValue: string) => {
  return originalValue.replace(/[^\d\s]/g, () => {
    return ''
  })
}

const removeOverLength = (length: number, originalValue: string) => {
  if (originalValue.length >= length) {
    return originalValue.slice(0, length)
  } else {
    return originalValue
  }
}

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

export {
  fixHiraGanaText,
  fixKataKanaText,
  fixFullWidth,
  fixHalfWidth,
  removeSpace,
  removeFullWidth,
  removeFullWidthNumber,
  removeFullWidthNumberAlphabet,
  removeFullWidthSymbol,
  removeHalfWidthNumber,
  removeOtherHalfNumber,
  removeOverLength,
  yenFormat,
  commaFormat,
  removeComma,
  numberDayFormat,
  numberWithUnit,
  yyyyMmDd,
}

