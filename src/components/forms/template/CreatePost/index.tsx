import * as React from 'react'
import { useRef } from 'react'

import clsx from 'clsx'
import domToImage from 'dom-to-image'
import { saveAs } from 'file-saver'
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

  const ref = useRef(null)

  const downloadImage = async () => {
      const node = ref.current
      if (!node) return
        // スケールを設定して高解像度で画像を生成
      const options = {
        quality: 1.0  // 最高品質に設定
      }

      try {
          const blob = await domToImage.toBlob(node, options)
          saveAs(blob, 'captured-image.png')
      } catch (err) {
          console.error('oops, something went wrong!', err)
      }
  }

  return (
    <>
      <TextAreaElement {...register('markdown')} required />
      <div className={styles.editArea}>
        <div ref={ref} className={clsx(styles.postImage, {
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
      <button onClick={downloadImage}>画像</button>
    </>
  )
}
