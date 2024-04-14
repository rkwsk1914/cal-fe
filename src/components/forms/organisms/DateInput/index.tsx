import * as React from 'react'
import { useEffect, useCallback, useState } from 'react'

import {
  VStack,
  Input
} from '@chakra-ui/react'
import { format, isValid as dateFnsIsValid, parse } from 'date-fns'
import { useForm, Controller, useWatch, UseFormSetValue, UseFormSetError, UseFormClearErrors } from 'react-hook-form'

import { ERROR_MESSAGE } from '@/const/form'

import { FormControlElement } from '@/components/forms/atoms/FormControlElement'

import { SearchSelect } from '../../molecules/SearchSelect'

import type { InputProps, FormControlProps, InputStyleChakura } from '@/types/form'


type PatternType = 'yyyy/M/d' | 'yyyy' | 'M' | 'd' | 'M/d'

type RefProps = Omit<InputProps, 'isValid'> &
  InputStyleChakura &
  FormControlProps & {
  pattern?: PatternType
  isTest?: boolean
  parentSetValue?: UseFormSetValue<any>
  parentSetError?: UseFormSetError<any>
  parentClearErrors?: UseFormClearErrors<any>
}

export const DateInput = React.forwardRef(
  function RefComponent (
    props: RefProps,
    ref?: React.Ref<HTMLInputElement>
): JSX.Element {
  const tempDate = '2000/12/12'
  const {
    name,
    pattern = 'yyyy/M/d',
    isTest,
    disabled,
    readonly,
    required,
    parentSetValue,
    parentSetError,
    parentClearErrors,
  } = props

  const value = props.value as string

  const doSetInputValue = (
    argValue: string | undefined, pattern: PatternType
  ): string | undefined => {
    if (!argValue) return ''

    let date
    switch (pattern) {
      case 'd':
        date = new Date(tempDate)
        if (isNaN(Number(argValue))) return undefined
        date.setDate(Number(argValue))
        break
      case 'M':
        date = new Date()
        if (isNaN(Number(argValue))) return undefined
        date.setMonth(Number(argValue))
      default:
        date = new Date(argValue)
        break
    }

    if (isNaN(date.getTime())) return undefined
    if(!dateFnsIsValid(date)) return undefined
    return format(date, pattern)
  }

  const checkAndFixDateFormat = (
    argValue: string | undefined, pattern: PatternType
  ): string | undefined  => {
    if (!argValue) return undefined

    try {
      const parsedDate = parse(argValue, pattern, new Date())
      dateFnsIsValid(parsedDate)
      return format(argValue, pattern)
    } catch (error) {
      return undefined
    }
  }

  const { control, getValues, setValue, setError, clearErrors } = useForm({
    defaultValues: {
      outcome: doSetInputValue(value, pattern),
      year: value ? pattern === 'd' ? undefined : checkAndFixDateFormat(value, 'yyyy') : String(new Date().getFullYear()),
      month: value ? pattern === 'd' ? undefined : checkAndFixDateFormat(value, 'M') : undefined,
      day: value ? pattern === 'd' ? value : checkAndFixDateFormat(value, 'd') : undefined,
    }
  })
  const outcome = useWatch({ control, name: 'outcome' })
  const year = useWatch({ control, name: 'year' })
  const month = useWatch({ control, name: 'month' })
  const day = useWatch({ control, name: 'day' })


  function getLastDayOfMonth(yearStr: string | undefined, monthStr: string | undefined): number {
    if (!yearStr || !monthStr) return 31

    const year = Number(yearStr)
    const month = Number(monthStr)

    const isLeapYear = (year: number): boolean => {
      if (year % 4 === 0) {  // 4で割り切れる場合
          if (year % 100 === 0) {  // ただし100で割り切れる場合
              if (year % 400 === 0) {  // ただし400で割り切れる場合
                  return true  // 閏年
              } else {
                  return false  // 閏年でない
              }
          } else {
              return true  // 閏年
          }
      } else {
          return false  // 閏年でない
      }
    }

    // 月ごとの最終日を格納した配列を定義
    const lastDayOfMonth: number[] = [
        31, // 1月
        28, // 2月
        31, // 3月
        30, // 4月
        31, // 5月
        30, // 6月
        31, // 7月
        31, // 8月
        30, // 9月
        31, // 10月
        30, // 11月
        31  // 12月
    ]

    // 2月の場合、閏年の場合は29日に更新
    if (month === 2 && isLeapYear(year)) {
        return 29
    }

    // その他の月は配列から取得
    return lastDayOfMonth[month - 1]
  }

  const [maxDay, setMaxDay] = useState<number>(getLastDayOfMonth(year, month))

  const FormControlElementProps: FormControlProps = {
    // UI系
    label: props.label,
    unit: props.unit,
    subText: props.subText,
    // バリデーション系
    isValid: props.isValid,
    helpertext: props.helpertext,
    required: props.required,
    // スタイル系
    isHidden: props.isHidden,
    isNaked: props.isNaked,
    isShowLabel: props.isShowLabel
  }

  const setErrorMessage = useCallback((message: string) => {
    setError('outcome', { message: message })
    parentSetError && parentSetError(name, { message: message })
  }, [name, parentSetError, setError])

  const clearErrorMessage = useCallback(() => {
    clearErrors(('outcome'))
    parentClearErrors && parentClearErrors(name)
  }, [name, parentClearErrors, clearErrors])

  const setMainValue = useCallback((value: string) => {
    setValue('outcome', value)
    parentSetValue && parentSetValue(name, value)
  }, [name, parentSetValue, setValue])

  const setOutComeValue = useCallback((): void => {
    const { year, month, day } = getValues()

    switch (pattern) {
      case 'd':
        if (!day) {
          required ? setErrorMessage(ERROR_MESSAGE.required) : clearErrorMessage()
          setMainValue('')
          return
        }
        if (
          isNaN(Number(day))
        ) {
          setErrorMessage(ERROR_MESSAGE.dataError)
          return
        }
        break
      case 'M':
        if (!month) {
          required ? setErrorMessage(ERROR_MESSAGE.required) : clearErrorMessage()
          setMainValue('')
          return
        }
        if (
          isNaN(Number(month))
        ) {
          setErrorMessage(ERROR_MESSAGE.dataError)
          return
        }
        break
      case 'M/d':
        if (!month && !day) {
          required ? setErrorMessage(ERROR_MESSAGE.required) : clearErrorMessage()
          setMainValue('')
          return
        }
        if (
          isNaN(Number(month)) ||
          isNaN(Number(day))
        ) {
          setErrorMessage(ERROR_MESSAGE.dataError)
          return
        }
        break
      case 'yyyy':
        if (!year) {
          required ? setErrorMessage(ERROR_MESSAGE.required) : clearErrorMessage()
          setMainValue('')
          return
        }
        if (
          isNaN(Number(year))
        ) {
          setErrorMessage(ERROR_MESSAGE.dataError)
          return
        }
        break
      case 'yyyy/M/d':
        if (!year && !month && !day) {
          required ? setErrorMessage(ERROR_MESSAGE.required) : clearErrorMessage()
          setMainValue('')
          return
        }
        if (
          isNaN(Number(year)) ||
          isNaN(Number(month)) ||
          isNaN(Number(day))
        ) {
          setErrorMessage(ERROR_MESSAGE.dataError)
          return
        }
        break
    }

    const date = new Date(tempDate)
    year && date.setFullYear(Number(year))
    month && date.setMonth(Number(month) - 1)
    day && date.setDate(Number(day))

    setMainValue(format(date, pattern))
    clearErrorMessage()
  }, [
    getValues,
    setMainValue,
    clearErrorMessage,
    setErrorMessage,
    pattern,
    required
  ])

  useEffect(() => setOutComeValue(), [year, month, day, setOutComeValue])

  useEffect(() => {
    parentSetValue && parentSetValue(name, outcome)
  }, [outcome, name, parentSetValue])

  useEffect(() => {
    setMaxDay(getLastDayOfMonth(year, month))
  }, [year, month])

  const commonProps: Pick<
    React.ComponentProps<typeof SearchSelect>,
    'absoluteMatch' |
    'disabled' |
    'isShowLabel' |
    'isNaked' |
    'parentSetValue'
  > = {
    absoluteMatch: true,
    disabled: disabled,
    isShowLabel: false,
    isNaked: true,
    parentSetValue: setValue,
  }

  return (
    <FormControlElement {...FormControlElementProps}>
      <VStack>
        <Controller
          name="outcome"
          defaultValue={value}
          control={control}
          render={({ field }) => (
            <Input
              {...props}
              {...field}
              type={isTest ? 'text' : 'hidden'}
              ref={ref}
              isReadOnly
            />
          )}
        />
        {(!disabled && !readonly) && (
          <>
          {(pattern === 'yyyy/M/d' || pattern === 'yyyy') && (
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <SearchSelect
                  selectItems={Array.from({ length: 100 }, (v, k) => String(k + 1996))}
                  maxLength={4}
                  rightAddon='年'
                  {...commonProps}
                  {...field}
                />
              )}
            />
          )}
          {(pattern === 'yyyy/M/d' || pattern === 'M/d' || pattern === 'M') && (
            <Controller
              name="month"
              control={control}
              render={({ field }) => (
                <SearchSelect
                  selectItems={Array.from({ length: 12 }, (v, k) => String(k + 1))}
                  maxLength={2}
                  rightAddon='月'
                  {...commonProps}
                  {...field}
                />
              )}
            />
          )}
          {(pattern === 'yyyy/M/d' || pattern === 'M/d' || pattern === 'd') && (
            <Controller
              name="day"
              control={control}
              render={({ field }) => (
                <SearchSelect
                  maxLength={2}
                  selectItems={Array.from({ length: maxDay }, (v, k) => String(k + 1))}
                  rightAddon='日'
                  {...commonProps}
                  {...field}
                />
              )}
            />
          )}
          </>
        )}
      </VStack>
    </FormControlElement>
  )
})
