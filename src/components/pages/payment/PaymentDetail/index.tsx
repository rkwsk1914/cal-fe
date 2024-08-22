import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'
import { useToast, Link } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useForm, useWatch } from 'react-hook-form'

import {
  FindPaymentByIdQuery,
  FindAllBanksQuery,
  useCreatePaymentMutation,
  useUpdatePaymentMutation
} from '@/generated/graphql'

import { useSetZodScheme }from '@/hooks/form/useSetZodScheme'

import { Alert } from '@/components/atoms/Alert'
import { Badge, BadgeColorOptions } from '@/components/atoms/Badge'
import { CheckBoxController } from '@/components/form/organisms/CheckBoxController'
import { InputController } from '@/components/form/organisms/InputController'
import { RadioController } from '@/components/form/organisms/RadioController'
import { SelectController } from '@/components/form/organisms/SelectController'
import { FromLayout } from '@/components/layouts/FromLayout'

import type { DefaultValuesType, SelectOptionType } from '@/types/form/InputAttribute'

type Props = {
  payment?: Partial<ApolloQueryResult<FindPaymentByIdQuery>>
  banks: Partial<ApolloQueryResult<FindAllBanksQuery>>
}

export const PaymentDetail: React.FC<Props> = (props): JSX.Element => {
  const toast = useToast()
  const router = useRouter()
  const { id } = router.query

  const { payment, banks } = props
  const res = payment?.data?.findPaymentByID

  const disabled = res?.uneditable ? true : false

  const defaultValues: DefaultValuesType = {
    paymentName: res?.name ?? '',
    bank: res?.bank._id ?? '',
    closingDay: res?.closingDay ? String(res?.closingDay) : '',
    color: res?.color ?? '',
    payDay: res?.payDay ? String(res?.payDay) : '',
    isCredit: res?.isCredit ? ['true'] : [],
  }

  const bankSelect: SelectOptionType | undefined = banks.data?.findAllBanks?.map((resBank) => ({
    value: resBank._id,
    label: `${resBank.name} ${resBank.branchName}`
  }))

  const { scheme } = useSetZodScheme(defaultValues)

  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onSubmit',
    defaultValues,
    resolver: zodResolver(scheme),
  })
  const isCredit = useWatch({ control, name: 'isCredit' }) as string[]

  const [ mutateCreate ] = useCreatePaymentMutation()
  const [ mutateUpdate ] = useUpdatePaymentMutation()

  const args = {
    errors,
    trigger,
    control
  }

  const onCreate = async (data: DefaultValuesType) => {
    try {
      await mutateCreate({
        variables: {
          input: {
            name: data.paymentName as string,
            bank: data.bank as string,
            closingDay: Number(data.closingDay) as number,
            color: data.color  as string,
            payDay: Number(data.payDay)  as number,
            isCredit: (data.isCredit as string[])?.length > 0,
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
      await mutateUpdate({
        variables: {
          updatePaymentId: id as string,
          input: {
            name: data.paymentName as string,
            bank: data.bank as string,
            closingDay: Number(data.closingDay) as number,
            color: data.color  as string,
            payDay: Number(data.payDay)  as number,
            isCredit: (data.isCredit as string[])?.length > 0,
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
  }

  return (
    <FromLayout
      handleSubmit={handleSubmit(onSubmit)}
      hasError={!isValid}
    >
      <InputController
        name="paymentName"
        {...args}
        disabled={disabled}
        helperText={disabled ?
          <>引き落とし口座名を編集してください。<Link as={NextLink} href={`/bank/${res?.bank._id}`}>編集画面はこちら</Link></> :
          undefined
        }
      />
      <SelectController
        name="bank"
        {...args}
        data={bankSelect ?? []}
        disabled={disabled}
      />
      <CheckBoxController
        name="isCredit"
        {...args}
        data={[
          { value: 'true', label: 'クレジット払い' },
        ]}
        disabled={disabled}
      />
      {isCredit?.length > 0 && (
        <>
          <InputController
            name="closingDay"
            {...args}
            shouldUnregister={false}
          />
          <InputController
            name="payDay"
            {...args}
            shouldUnregister={false}
          />
        </>
      )}
      <RadioController
        name="color"
        {...args}
        data={BadgeColorOptions.map((BadgeColorOption) => ({
          value: BadgeColorOption,
          label: <Badge colorScheme={BadgeColorOption}>{BadgeColorOption}</Badge>
        }))}
      />
    </FromLayout>
  )
}
