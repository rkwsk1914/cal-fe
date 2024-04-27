import * as React from 'react'

import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import styles from './style.module.scss'

import type { postImageType } from '@/types/postImageType'

type Props = {
  color: 'red' | 'green' | 'blue'
  markdown: string
  type: postImageType
}

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
              [styles.welcome]: type === 'welcome',
              [styles.startled]: type === 'startled',
              [styles.research]: type === 'research',
              [styles.question]: type === 'question',
              [styles.creativity]: type === 'creativity'
            })}>
            <div className={styles.markdown}>
              <div className={styles.space} />
              <div className={styles.ornament} />
              {/* ReactMarkdownにクラスを適用 */}
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
            </div>
          </div>
        </div>
      </>
    )
  }
)

