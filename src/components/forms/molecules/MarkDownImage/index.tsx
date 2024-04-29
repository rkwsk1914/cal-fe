import * as React from 'react'

import clsx from 'clsx'

import { MarkDownComponent } from '@/components/forms/atoms/MarkDownComponent'

import styles from './style.module.scss'


import type { postImageType } from '@/types/postImageType'

type Props = {
  color: string
  markdown: string
  type: postImageType
}

/*
 * 画像元データ
 * https://storyset.com/illustration/blood-research/cuate
 * https://storyset.com/illustration/questions/cuate
 * https://storyset.com/illustration/startled/cuate
 * https://storyset.com/illustration/creativity/cuate
 * https://storyset.com/illustration/welcome/cuate
 */

export const MarkDownImage = React.forwardRef(
  function RefComponent (
    props: Props,
    ref?: React.Ref<HTMLDivElement>
  ): JSX.Element {
    const { color, markdown, type } = props
    return (
      <>
        <div className={styles.editArea}>
          <div ref={ref} className={clsx(styles.postImage, {
              [styles.red]: color === 'red',
              [styles.green]: color === 'green',
              [styles.blue]: color === 'blue',
              [styles.yellow]: color === 'yellow',
              [styles.welcome]: type === 'welcome',
              [styles.startled]: type === 'startled',
              [styles.research]: type === 'research',
              [styles.question]: type === 'question',
              [styles.creativity]: type === 'creativity'
            })}>
            <div className={styles.markdown}>
              <div className={styles.space} />
              <div className={styles.ornament} />
              <MarkDownComponent>{markdown}</MarkDownComponent>
            </div>
          </div>
        </div>
      </>
    )
  }
)

