import * as React from 'react'

import { SITE_MENU_DATA } from '@/const/SiteMenuData'

import { SiteMenu } from '@/components/molecules/SiteMenu'


import styles from './style.module.scss'

interface Props {
  children?: React.ReactNode
}

export const AppFrame: React.FC<Props> = ({
  children
}): JSX.Element => {
  return (
    <>
    <div className={styles.header}>
      <SiteMenu list={SITE_MENU_DATA} />
    </div>
    <div className={styles.content}>{children}</div>
    </>
  )
}
