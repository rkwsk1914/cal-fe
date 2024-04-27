import * as React from 'react'
import { useRef } from 'react'

import clsx from 'clsx'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import styles from './style.module.scss'

type Props = {
  color: 'red' | 'green' | 'blue'
  markdown: string
  type: 'welcome' | 'startled' | 'research' | 'question' | 'creativity'
}

export const MarkDownImage: React.FC<Props> = ({
  color,
  markdown,
  type
}): JSX.Element => {


  const ref = useRef(null)

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
