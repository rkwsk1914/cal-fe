import * as zod from 'zod'

import { INPUT_DATA } from '@/const/form/TextInputData'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

export const useSetZodScheme = (defaultValues: DefaultValuesType) => {
  const scheme = zod.object(
    Object.keys(defaultValues).reduce((schema, key) => {
      if (INPUT_DATA[key as keyof typeof INPUT_DATA]) {
        schema[key] = INPUT_DATA[key as keyof typeof INPUT_DATA].zod
      }
      return schema
    }, {} as Record<string, zod.ZodString | zod.ZodArray<zod.ZodString, 'atleastone' | 'many'>>)
  )

  return {
    scheme
  }
}
