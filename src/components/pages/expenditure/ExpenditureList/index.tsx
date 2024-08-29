import * as React from 'react'

import { ApolloQueryResult } from '@apollo/client'
import { useToast } from '@chakra-ui/react'
import { Checkbox } from '@chakra-ui/react'

import { FindAllExpendituresQuery, useUpdateExpenditureMutation } from '@/generated/graphql'

import * as chrFormatChange from '@/utils/chrFormatChange'

import { Alert } from '@/components/atoms/Alert'
import { Badge, ColorSchemeType } from '@/components/atoms/Badge'
import { Link } from '@/components/atoms/Link'
import { Table } from '@/components/atoms/Table'
import { ListPageLayout } from '@/components/layouts/ListPageLayout'
import { PageLayout } from '@/components/layouts/PageLayout'


type Props = Partial<ApolloQueryResult<FindAllExpendituresQuery>>

export const ExpenditureList: React.FC<Props> = (props): JSX.Element => {
  const { yenFormat, yyyyMmDd } = chrFormatChange
  const toast = useToast()
  const [ mutateUpdate ] = useUpdateExpenditureMutation()

  const { data } = props
  const listData = data?.findAllExpenditures

  if(!listData) return <></>

  const onUpdate = async (id: string, checked: boolean) => {
    try {
      await mutateUpdate({
        variables: {
          updateExpenditureId: id,
          input: {
            temporary: checked,
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

  const itemData = listData.map((item) => {
    return [
      yyyyMmDd(item.occurrenceDay),
      <Link key={item._id} href={`/expenditure/${item._id}`}>{item.name}</Link>,
      yenFormat(item.amount),
      <Badge key={item._id} colorScheme={item.payment.color as ColorSchemeType}>{item.payment.name}</Badge>,
      <Badge key={item._id} colorScheme={item.payment.bank.color as ColorSchemeType}>{`${item.payment.bank.name} ${item.payment.bank.branchName}`}</Badge>,
      <Badge key={item._id} colorScheme={item.category?.color as ColorSchemeType}>{item.category?.name}</Badge>,
      item.description,
      <Checkbox key={item._id} defaultChecked={item.temporary ?? false} onChange={
        (e) => { onUpdate(item._id, e.target.checked)}
      }></Checkbox>
    ]
  })

  const defaultHeader = [
    '発生日',
    '項目名',
    '金額',
    '支払い方法',
    '引き落とし口座',
    'カテゴリー',
    '備考',
    '仮'
  ]

  const tableData = [
    defaultHeader,
    ...itemData
  ]

  return (
    <PageLayout  title='支出リスト'>
      <ListPageLayout createBtnHref='/expenditure/create'>
        <Table data={tableData} thRow={1} />
      </ListPageLayout>
    </PageLayout>
  )
}
