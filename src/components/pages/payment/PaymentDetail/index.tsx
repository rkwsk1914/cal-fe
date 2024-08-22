import * as React from 'react'
import { useState, useEffect } from 'react'

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

import { useSetZodScheme, DefaultValuesRequiredType }from '@/hooks/form/useSetZodScheme'

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
  const [isCredit, setIsCredit] = useState<string[]>(res?.isCredit ? ['true'] : [])

  const isUneditable = res?.uneditable ? true : false

  const defaultValues: DefaultValuesType = {
    paymentName: res?.name ?? '',
    bank: res?.bank._id ?? '',
    color: res?.color ?? '',
    isCredit: res?.isCredit ? ['true'] : [],
    closingDay: res?.closingDay ? String(res?.closingDay) : '',
    payDay: res?.payDay ? String(res?.payDay) : '',
  }
  const requiredValues: DefaultValuesRequiredType = {
    paymentName: isUneditable ? false : true,
    bank: isUneditable ? false : true,
    color: false,
    isCredit: false,
    payDay: isCredit.length > 0,
    closingDay: isCredit.length > 0,
  }

  const bankSelect: SelectOptionType | undefined = banks.data?.findAllBanks?.map((resBank) => ({
    value: resBank._id,
    label: `${resBank.name} ${resBank.branchName}`
  }))

  const { scheme } = useSetZodScheme(
    defaultValues,
    requiredValues
  )

  const {
    handleSubmit,
    control,
    trigger,
    setValue,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: zodResolver(scheme),
  })
  const isCreditValue = useWatch({ control, name: 'isCredit' }) as string[]

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

  useEffect(() => {
    if (isCreditValue.length === 0) {
      setValue('payDay', '')
      setValue('closingDay', '')
      trigger('payDay')
      trigger('closingDay')
    }
    setIsCredit(isCreditValue)
  }, [isCreditValue, setIsCredit])

  return (
    <FromLayout
      handleSubmit={handleSubmit(onSubmit)}
    >
      <InputController
        name="paymentName"
        {...args}
        disabled={isUneditable}
        helperText={isUneditable ?
          <>引き落とし口座名を編集してください。<Link as={NextLink} href={`/bank/${res?.bank._id}`}>編集画面はこちら</Link></> :
          undefined
        }
      />
      <SelectController
        name="bank"
        {...args}
        data={bankSelect ?? []}
        disabled={isUneditable}
      />
      <CheckBoxController
        name="isCredit"
        {...args}
        data={[
          { value: 'true', label: 'クレジット払い' },
        ]}
        disabled={isUneditable}
      />
      {isCredit?.length > 0 && (
        <>
          <InputController
            name="closingDay"
            {...args}
          />
          <InputController
            name="payDay"
            {...args}
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
