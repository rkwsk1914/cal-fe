import * as React from 'react'
import { useState, useEffect } from 'react'

import { Radio, RadioGroup,Stack } from '@chakra-ui/react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'

import { TextAreaElement } from '@/components/forms/molecules/TextAreaElement'


import styles from './style.module.scss'

export const CreatePost: React.FC = (): JSX.Element => {
  const { register, handleSubmit, watch } = useForm(
    {
      defaultValues: {
        markdown: '',
        color: 'red'
      }
    }
  )
  const [ color, setColor ] = useState('red')
  const markdown = watch('markdown')
  const colorWatch = watch('color')

  const onSubmit = (_data: any) => {}

  useEffect(() => {
    setColor(colorWatch)
  }, [colorWatch, setColor])

  return (
      <form onSubmit={handleSubmit(onSubmit)}>
          <TextAreaElement {...register('markdown')} required />
          <RadioGroup>
            <Stack direction='row'>
              <Radio {...register('color')} value='red'>red</Radio>
              <Radio {...register('color')} value='blue'>blue</Radio>
              <Radio {...register('color')} value='green'>green</Radio>
            </Stack>
          </RadioGroup>
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

          <button type="submit">送信</button>
      </form>
  )
}
