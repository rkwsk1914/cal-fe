import * as React from 'react'

import Image from 'next/image'
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
          <button type="submit">送信</button>
          <div className={styles.markdown}>
              {/* ReactMarkdownにクラスを適用 */}
              <ReactMarkdown>{markdown}</ReactMarkdown>
              <Image
                src='/post/blue-1.jpg'
                alt='Ryo Kawasaki Front-End-Engineer'
                width={340}
                height={253}
                className={styles.image} />
          </div>
      </form>
  )
}
