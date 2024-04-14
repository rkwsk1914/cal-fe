import * as React from 'react'
import { useState, useEffect } from 'react'


import { SearchIcon } from '@chakra-ui/icons'
import {
  InputGroup,
  InputLeftElement,
  Input,
  InputLeftAddon,
  InputRightAddon,
  VStack,
  Button,
  useDisclosure,
  Fade
} from '@chakra-ui/react'
import { useForm, Controller, useWatch, UseFormSetValue, UseFormSetError, UseFormClearErrors } from 'react-hook-form'

import { FormControlElement } from '@/components/forms/atoms/FormControlElement'

import styles from './style.module.scss'


import type { TextInputProps, FormControlProps, InputStyleChakura } from '@/types/form'


type SelectItemObjectType = {id: string | number, name: string}
type SelectItemType = string | SelectItemObjectType

type RefProps = Omit<TextInputProps, 'isValid'> &
  InputStyleChakura &
  FormControlProps &
  {
    selectItems: Array<SelectItemType>
    absoluteMatch?: boolean,
    leftAddon?: React.ReactNode
    rightAddon?: React.ReactNode
  } & {
    parentSetValue?: UseFormSetValue<any>
    parentSetError?: UseFormSetError<any>
    parentClearErrors?: UseFormClearErrors<any>
  }

export const SearchSelect = React.forwardRef(
  function RefComponent (
    props: RefProps,
    ref?: React.Ref<HTMLInputElement>
  ): JSX.Element {
    const {
      name,
      type = 'text',
      absoluteMatch,
      selectItems,
      helpertext,
      rightAddon,
      leftAddon,
      parentSetValue,
      parentSetError,
      parentClearErrors
    } = props

    const value = props.value as string

    const size = props.size ?? 'md'

    const [viewItems, setViewItems] = useState(selectItems)
    const [isNoItem, setIsNoItem] = useState<boolean>(false)
    const candidate = useDisclosure()

    const { control, setValue, setError, clearErrors, formState: { errors } } = useForm({
      defaultValues: { term: value }
    })
    const term = useWatch({ control, name: 'term' })

    const handlerOnClick = (value: string) => {
      setValue('term', value)
      parentSetValue && parentSetValue(name, value)
      candidate.onClose()
    }

    const errorMessage: string | undefined =
      helpertext ? helpertext : errors.term?.message ?? undefined

    const FormControlElementProps: FormControlProps = {
      // UI系
      label: props.label,
      unit: props.unit,
      subText: props.subText,
      // バリデーション系
      isValid: errorMessage ? false : true,
      helpertext: errorMessage,
      required: props.required,
      // スタイル系
      isHidden: props.isHidden,
      isNaked: props.isNaked,
      isShowLabel: props.isShowLabel
    }


    const setIcon = () => {
      switch(size) {
        case 'xs': return (
          <InputLeftElement pointerEvents='none' height='24px' width='24px'>
            <SearchIcon color='gray.300' viewBox='0 0 24 24' height='9.6px' width='9.6px' />
          </InputLeftElement>
        )
        case 'md':
        default: return (
          <InputLeftElement pointerEvents='none'>
            <SearchIcon color='gray.300' />
          </InputLeftElement>
        )
      }
    }

    const setLeftAddonElement = () => {
      if (leftAddon) return (
        <InputLeftAddon>
          {leftAddon}
        </InputLeftAddon>
      )
    }

    useEffect(() => {
      if (!term) {
        setViewItems(selectItems)
        return
      }

      const result = selectItems.filter((item: SelectItemType) =>
        typeof item === 'string' ? item.includes(term) :
        item?.name && item.name.includes(term))

      const isExist = selectItems.findIndex((item: SelectItemType) =>
        typeof item === 'string' ? item === term :
        item?.name && item.name === term)

        setIsNoItem(isExist === -1 && absoluteMatch ? true : false)

      setViewItems(result)
    }, [selectItems, term, name, absoluteMatch])

    useEffect(() => {
      if (isNoItem === true) {
        setError('term', { message: '選択肢にありません' })
        parentSetError && parentSetError(name, { message: '選択肢にありません' })
        return
      }

      if (isNoItem === false ){
        clearErrors('term')
        parentClearErrors && parentClearErrors(name)
        return
      }
    }, [
      name,
      term,
      isNoItem,
      setError,
      clearErrors,
      parentSetError,
      parentClearErrors,
    ])

    useEffect(() => {
      parentSetValue && parentSetValue(name, term)
    }, [parentSetValue, term, name])

    return (
      <FormControlElement {...FormControlElementProps}>
        <div className={styles.box}>
        <Controller
          name="term"
          control={control}
          defaultValue={value}
          render={({ field }) => (
            <InputGroup onFocus={candidate.onOpen} onBlur={candidate.onClose}>
              {candidate.isOpen ? setIcon() : setLeftAddonElement()}
              <Input
                {...props}
                {...field}
                type={type}
                errorBorderColor='red.300'
                autoComplete='off'
                ref={ref}
                size={size}
              />
            {rightAddon && (
              <InputRightAddon>
                {rightAddon}
              </InputRightAddon>
            )}
            </InputGroup>
          )}
        />
        <Fade
          in={candidate.isOpen}
          className={styles.selectBox}
          unmountOnExit={true}
        >
          <VStack className={styles.selectBoxContent}>
            {viewItems.map((selectItem) => {
              const id = typeof selectItem === 'string' ?
                selectItem :
                (selectItem as SelectItemObjectType).id
              const name = typeof selectItem === 'string' ?
                selectItem :
                (selectItem as SelectItemObjectType).name

              if (name === null) return

              return (
                <Button
                  key={id}
                  onClick={() => {
                    handlerOnClick(name)
                  }}
                  variant='ghost'
                  className={styles.selectItem}
                >{name}</Button>
              )
            })}
          </VStack>
        </Fade>
        </div>
      </FormControlElement>
    )
  }
)
