import * as React from 'react'

import { ErrorPageData } from '@/const/ErrorPageData'

import { Button } from '@/components/atoms/Button'
import { PageLayout } from '@/components/layouts/PageLayout'

import styles from './style.module.scss'

type Props = {
  errorId: keyof typeof ErrorPageData
};

export const ErrorPage: React.FC<Props> = ({
  errorId
}): JSX.Element => {
  return (
    <PageLayout title={ErrorPageData[errorId].title}>
      <p>{ErrorPageData[errorId].content}</p>
      <div className={styles.button_wrap} >
        <Button href='/' type='outline' >トップページに戻る</Button>
      </div>
    </PageLayout>
  )
}