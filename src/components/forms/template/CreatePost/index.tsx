import * as React from 'react'
import { useRef } from 'react'

import domToImage from 'dom-to-image'
import { saveAs } from 'file-saver'
import { useForm } from 'react-hook-form'

import { TextAreaElement } from '@/components/forms/molecules/TextAreaElement'
import { MarkDownImage } from '@/components/forms/template/MarkDownImage'

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
        style: {
          transform: 'scale(1)',  // 解像度を2倍に設定
          transformOrigin: 'top left'
        },
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
      <MarkDownImage color={color} markdown={markdown} />
      <button onClick={downloadImage}>画像</button>
    </>
  )
}
