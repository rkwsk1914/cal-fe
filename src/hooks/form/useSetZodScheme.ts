import * as zod from 'zod'

import { CHECKBOX_DATA } from '@/const/form/CheckBoxData'
import { RADIO_DATA } from '@/const/form/RadioData'
import { SELECT_DATA } from '@/const/form/SelectData'
import { TEXT_INPUT_DATA } from '@/const/form/TextInputData'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

export const useSetZodScheme = (defaultValues: DefaultValuesType) => {
  const scheme = zod.object(
    Object.keys(defaultValues).reduce((schema, key) => {
      if (TEXT_INPUT_DATA[key]) {
        schema[key] = TEXT_INPUT_DATA[key].zod
      }
      if (RADIO_DATA[key]) {
        schema[key] = RADIO_DATA[key].zod
      }
      if (CHECKBOX_DATA[key]) {
        schema[key] = CHECKBOX_DATA[key].zod
      }
      if (SELECT_DATA[key]) {
        schema[key] = SELECT_DATA[key].zod
      }
      return schema
    }, {} as Record<string, zod.ZodString | zod.ZodArray<zod.ZodString, 'atleastone' | 'many'>>)
  )

  return {
    scheme
  }
}
