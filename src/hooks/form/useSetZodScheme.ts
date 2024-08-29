import * as zod from 'zod'

import { ERROR_MESSAGE } from '@/const/form/ErrorMessage'
import { INPUT_DATA, INPUT_ARRAY_DATA } from '@/const/form/InputData'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

export type DefaultValuesRequiredType = Partial<
  Record<keyof typeof INPUT_DATA, boolean> &
  {
    [key in keyof typeof INPUT_ARRAY_DATA]: Array<
      Partial<Record<keyof typeof INPUT_ARRAY_DATA[key], boolean>>
    >
  }
>

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

  const setArraySchema = (
    arraySchema: Record<string, { zod: zod.ZodString | zod.ZodArray<zod.ZodString, 'many'> }>,
    requiredValues?: Array<Partial<Record<string, boolean>>>
  ) => {
    return zod.array(
      zod.object(
        Object.keys(arraySchema).reduce((schema, key) => {
          schema[key] = setRequired(arraySchema[key].zod, requiredValues && requiredValues[0][key])
          return schema
        }, {} as Record<string, zod.ZodTypeAny>)
      )
    )
  }

  const scheme = zod.object(
    Object.keys(defaultValues).reduce((schema, key) => {
      if (INPUT_DATA[key as keyof typeof INPUT_DATA]) {
        schema[key] = setRequired(
          INPUT_DATA[key as keyof typeof INPUT_DATA].zod,
          requiredValues && requiredValues[key as keyof typeof INPUT_DATA]
        )
      } else if (INPUT_ARRAY_DATA[key as keyof typeof INPUT_ARRAY_DATA]) {
        schema[key] = setArraySchema(
          INPUT_ARRAY_DATA[key as keyof typeof INPUT_ARRAY_DATA],
          requiredValues && requiredValues[key as keyof typeof INPUT_ARRAY_DATA]
        )
      }
      return schema
    }, {} as Record<string, zod.ZodTypeAny>)
  )

  return {
    scheme
  }
}