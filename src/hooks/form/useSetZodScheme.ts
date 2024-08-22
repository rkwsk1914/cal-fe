import * as zod from 'zod'

import { ERROR_MESSAGE } from '@/const/form/ErrorMessage'
import { INPUT_DATA } from '@/const/form/InputData'

import type { DefaultValuesType, FieldKey } from '@/types/form/InputAttribute'

export type DefaultValuesRequiredType = Partial<Record<FieldKey, boolean>>

export const useSetZodScheme = (
  defaultValues: DefaultValuesType,
  requiredValues?: DefaultValuesRequiredType
) => {

  const setRequired = (
    baseSchema: zod.ZodString | zod.ZodArray<zod.ZodString, 'many'>,
    required?: boolean
  ): zod.ZodString | zod.ZodIntersection<zod.ZodString, zod.ZodString> | zod.ZodArray<zod.ZodString, 'many'> => {
    const stringSchema = zod
      .string()
      .min(1, { message: ERROR_MESSAGE.required })

    if (required) {
      if (baseSchema instanceof zod.ZodArray) {
        return baseSchema
      }
      return stringSchema.and(baseSchema)
    }

    return baseSchema
  }

  const scheme = zod.object(
    Object.keys(defaultValues).reduce((schema, key) => {
      if (INPUT_DATA[key as keyof typeof INPUT_DATA]) {
        schema[key] = setRequired(
          INPUT_DATA[key as keyof typeof INPUT_DATA].zod,
          requiredValues && requiredValues[key as keyof typeof INPUT_DATA]
        )
      }
      return schema
    }, {} as Record<
      string,
      zod.ZodString |
      zod.ZodIntersection<zod.ZodString, zod.ZodString> |
      zod.ZodArray<zod.ZodString, 'atleastone' | 'many'>
    >)
  )

  return {
    scheme
  }
}
