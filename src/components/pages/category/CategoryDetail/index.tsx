import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { FindCategoryByIdQuery, useCreateCategoryMutation, useUpdateCategoryMutation } from '@/generated/graphql'

import { useSetZodScheme, DefaultValuesRequiredType }from '@/hooks/form/useSetZodScheme'

import { Alert } from '@/components/atoms/Alert'
import { Badge, BadgeColorOptions } from '@/components/atoms/Badge'
import { InputController } from '@/components/form/organisms/InputController'
import { RadioController } from '@/components/form/organisms/RadioController'
import { FromLayout } from '@/components/layouts/FromLayout'
import { PageLayout } from '@/components/layouts/PageLayout'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

type Props = Partial<ApolloQueryResult<FindCategoryByIdQuery>>

export const CategoryDetail: React.FC<Props> = (props): JSX.Element => {
  const toast = useToast()
  const router = useRouter()
  const { id } = router.query

  const { data } = props
  const res = data?.findCategoryByID

  const defaultValues: DefaultValuesType = {
    categoryName: res?.name ?? '',
    color: res?.color ?? ''
  }

  const requiredValues: DefaultValuesRequiredType = {
    categoryName: true,
    color: false,
  }

  const { scheme } = useSetZodScheme(defaultValues, requiredValues)

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: zodResolver(scheme),
  })

  const [ mutateCreateCategory ] = useCreateCategoryMutation()
  const [ mutateUpdateCategory ] = useUpdateCategoryMutation()

  const args = {
    errors,
    trigger,
    control
  }

  const onCreate = async (data: DefaultValuesType) => {
    try {
      await mutateCreateCategory({
        variables: {
          input: {
            name: data.categoryName as string,
            color: data.color as string
          }
        },
      })
      toast({
        render: () => (
          <Alert status="success" title='create success!'>mutate success!</Alert>
        ),
      })
    } catch (e) {
      toast({
        render: () => (
          <Alert status="error" title='create Missed!'>mutate missed!</Alert>
        ),
      })
    }
  }

  const onUpdate = async (data: DefaultValuesType) => {
    try {
      await mutateUpdateCategory({
        variables: {
          updateCategoryId: id as string,
          input: {
            name: data.categoryName as string,
            color: data.color as string,
          }
        },
      })
      toast({
        render: () => (
          <Alert status="success" title='update success!'>mutate success!</Alert>
        ),
      })
    } catch (e) {
      toast({
        render: () => (
          <Alert status="error" title='update Missed!'>mutate missed!</Alert>
        ),
      })
    }
  }

  const onSubmit = async (data: DefaultValuesType) => {
    id ? onUpdate(data) : onCreate(data)
    router.push('/category')
  }

  return (
    <PageLayout title='カテゴリー詳細'>
      <FromLayout
        handleSubmit={handleSubmit(onSubmit)}
        listHref='/category'
      >
        <InputController
          name="categoryName"
          {...args}
        />
        <RadioController
          name="color"
          {...args}
          data={BadgeColorOptions.map((BadgeColorOption) => ({
            value: BadgeColorOption,
            label: <Badge colorScheme={BadgeColorOption}>{BadgeColorOption}</Badge>
          }))}
        />
      </FromLayout>
    </PageLayout>
  )
}
