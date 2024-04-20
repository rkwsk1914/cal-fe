import * as React from 'react'

import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'

import { TextAreaElement } from '@/components/forms/molecules/TextAreaElement'


import styles from './style.module.scss'

type Props = {
  color: 'red' | 'green' | 'blue'
}

export const CreatePost: React.FC<Props> = ({
  color
}): JSX.Element => {
  const { register, watch } = useForm(
    {
      defaultValues: {
        markdown: '',
      }
    }
  )
  const markdown = watch('markdown')

  return (
    <>
      <TextAreaElement {...register('markdown')} required />
      <div className={styles.editArea}>
        <div className={clsx(styles.postImage, {
            [styles.red]: color === 'red',
            [styles.green]: color === 'green',
            [styles.blue]: color === 'blue',
          })}>
          <div className={styles.markdown}>
            {/* ReactMarkdownにクラスを適用 */}
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </>
  )
}
