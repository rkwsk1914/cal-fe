import * as zod from 'zod'

import { ERROR_MESSAGE } from '@/const/form/ErrorMessage'

const requiredMessage = ERROR_MESSAGE.required

export const REQUIRED_SCHEME = zod
  .string()
  .min(1, { message: requiredMessage })

const POST_CODE_WITH_HYPHEN = new RegExp(/^[0-9]{3}-[0-9]{4}$/)

// const POST_CODE = new RegExp(/^[0-9]{7}$/)
// const TEL_CODE_WITH_HYPHEN = new RegExp(/^0\d{2,3}-\d{1,4}-\d{4}$/)
const TEL_CODE = new RegExp(/^0\d{9,10}$/)
const HIRAGANA = new RegExp(/^[ぁ-んー]+$/)
// const KATAKANA_FULL_WIDTH = new RegExp(/^[ァ-ンヴー]+$/)

// const KATAKANA_HALF_WIDTH = new RegExp(/^[ｧ-ﾝﾞﾟ\-]+$/)

const JAPAN_FULL_WIDTH = new RegExp(/^[^\x01-\x7E\xA1-\xDF０-９]+$/g)

export const NAME_SCHEMA = zod
  .string()
  .max(50, { message: ERROR_MESSAGE[3] })
  .regex(JAPAN_FULL_WIDTH, { message: ERROR_MESSAGE.fullCharacter })

export const NAME_KANA_SCHEMA = zod
  .string()
  .max(50, { message: ERROR_MESSAGE[3] })
  .regex(HIRAGANA, { message: ERROR_MESSAGE[6] })

export const EMAIL_SCHEMA = zod
  .string()
  .email({ message: ERROR_MESSAGE[0] })
  .max(100, { message: ERROR_MESSAGE[2] })

export const TEL_SCHEMA = zod
  .string()
  .length(11, { message: ERROR_MESSAGE[9] })
  .regex(TEL_CODE, { message: ERROR_MESSAGE[11] })

export const TEXT_AREA_SCHEMA = zod
  .string()
  .max(500, { message: ERROR_MESSAGE[5] })

export const TEXT_SCHEMA = zod
  .string()

export const DAY_TEXT_SCHEMA = zod
  .string()
  .max(2, { message: ERROR_MESSAGE[13] })

export const TEMPORALLY = zod
  .string()
  .length(11, { message: ERROR_MESSAGE[9] })
  .regex(POST_CODE_WITH_HYPHEN, { message: ERROR_MESSAGE[11] })

export const RADIO_SCHEME = zod
  .string()

export const CHECKBOX_SCHEME = zod
  .array(zod.string())


