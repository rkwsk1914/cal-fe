import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'
import {
  Stat,
  StatLabel,
  StatNumber,
} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

import { FindFixedCostPatternByIdQuery, useCreateFixedCostPatternMutation, useUpdateFixedCostPatternMutation } from '@/generated/graphql'

import { useSetZodScheme, DefaultValuesRequiredType }from '@/hooks/form/useSetZodScheme'

import * as chrFormatChange from '@/utils/chrFormatChange'



import { Alert } from '@/components/atoms/Alert'
import { Badge, BadgeColorOptions } from '@/components/atoms/Badge'
import { Button } from '@/components/atoms/Button'
import { Table } from '@/components/atoms/Table'
import { InputController } from '@/components/form/organisms/InputController'
import { RadioController } from '@/components/form/organisms/RadioController'
import { FromLayout } from '@/components/layouts/FromLayout'
import { PageLayout } from '@/components/layouts/PageLayout'

import type { DefaultValuesType } from '@/types/form/InputAttribute'

type Props = Partial<ApolloQueryResult<FindFixedCostPatternByIdQuery>>

export const FixedCostPatternDetail: React.FC<Props> = (props): JSX.Element => {
  const toast = useToast()
  const router = useRouter()
  const { yenFormat } = chrFormatChange
  const { pattern } = router.query

  const { data } = props
  const res = data?.findFixedCostPatternByID

  const defaultValues: DefaultValuesType = {
    fixedCostPatternName: res?.name ?? '',
    color: res?.color ?? ''
  }

  const requiredValues: DefaultValuesRequiredType = {
    fixedCostPatternName: true,
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

  const [ mutateCreateBank ] = useCreateFixedCostPatternMutation()
  const [ mutateUpdateBank ] = useUpdateFixedCostPatternMutation()

  const args = {
    errors,
    trigger,
    control
  }

  const onCreate = async (data: DefaultValuesType) => {
    try {
      await mutateCreateBank({
        variables: {
          input: {
            name: data.fixedCostPatternName as string,
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
      await mutateUpdateBank({
        variables: {
          updateFixedCostPatternId: pattern as string,
          input: {
            name: data.fixedCostPatternName as string,
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
    pattern ? onUpdate(data) : onCreate(data)
  }

  const tableDataContent = res?.fixedcosts ? res?.fixedcosts.map((fixedCosts) => {
    return [fixedCosts.name, yenFormat(fixedCosts.amount)]
  }) : []

  const tableData = [
    ['固定費名', '金額'],
    ...tableDataContent ?? []
  ]

  const totalAmount = res?.fixedcosts ? res?.fixedcosts.reduce((sum, fixedCost) => sum + fixedCost.amount, 0) : 0

  return (
    <PageLayout title='固定費パターン詳細'>
      <FromLayout
        handleSubmit={handleSubmit(onSubmit)}
        listHref='/fixed-cost'
      >
        <InputController
          name="fixedCostPatternName"
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
        <Button type='prime' href={`/fixed-cost/${pattern}/create`}>新規固定費作成</Button>

        <Stat>
          <StatLabel>固定費合計</StatLabel>
          <StatNumber>{yenFormat(totalAmount)}</StatNumber>
        </Stat>

        <Table data={tableData} thRow={1} />
      </FromLayout>
    </PageLayout>
  )
}
