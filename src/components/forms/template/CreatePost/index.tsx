import * as React from 'react'

import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'

import { TextAreaElement } from '@/components/forms/molecules/TextAreaElement'

import styles from './style.module.scss'

export const CreatePost: React.FC = (): JSX.Element => {
  const { register, handleSubmit, watch } = useForm()
  const markdown = watch('markdown')

  const onSubmit = (_data: any) => {}

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
          <TextAreaElement {...register('markdown')} required />

          <div className={styles.editArea}>
            <div className={styles.postImage}>
              <div className={styles.markdown}>
                {/* ReactMarkdownにクラスを適用 */}
                <ReactMarkdown>{markdown}</ReactMarkdown>
              </div>
            </div>
          </div>

          <button type="submit">送信</button>
      </form>
  )
}
