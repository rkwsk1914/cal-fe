import * as zod from 'zod'

import { TEXT_INPUT_DATA } from '@/const/form/TextInputData'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

export const useSetZodScheme = (defaultValues: DefaultValuesType) => {
  const scheme = zod.object(
    Object.keys(defaultValues).reduce((schema, key) => {
      if (TEXT_INPUT_DATA[key]) {
        schema[key] = TEXT_INPUT_DATA[key].zod
      }
      return schema
    }, {} as Record<string, zod.ZodString>)
  )

  return {
    scheme
  }
}
