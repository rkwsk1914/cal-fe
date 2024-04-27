import * as React from 'react'
import { useRef, useState, useEffect } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner
} from '@chakra-ui/react'
import domToImage from 'dom-to-image'
import Image from 'next/image'
import { useForm, useFormContext } from 'react-hook-form'

import { Button } from '@/components/atoms/Button'
import { TextAreaElement } from '@/components/forms/molecules/TextAreaElement'
import { MarkDownImage } from '@/components/forms/template/MarkDownImage'

import styles from './style.module.scss'

import type { postImageType } from '@/types/postImageType'


type Props = {
  color: 'red' | 'green' | 'blue'
  type: postImageType
  defaultMarkdown?: string
  fieldName?: string
}

export const CreatePost: React.FC<Props> = ({
  color,
  type,
  defaultMarkdown,
  fieldName
}): JSX.Element => {
  const context = useFormContext()
  const myForm = useForm(
    {
      defaultValues: {
        markdown: defaultMarkdown ?? '',
      }
    }
  )
  const markdown = fieldName ? context.watch(fieldName) : myForm.watch('markdown')

  const { isOpen, onOpen, onClose } = useDisclosure()
  const ref = useRef(null)
  const [imageSrc, setImageSrc] = useState('')


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
        const dataUrl = await domToImage.toPng(node, options)
        setImageSrc(dataUrl)
      } catch (err) {
          console.error('oops, something went wrong!', err)
      }
  }

  useEffect(() => {
    if (isOpen) downloadImage()
  }, [isOpen])

  const register = fieldName ? context.register(fieldName) : myForm.register('markdown')

  return (
    <>
      <TextAreaElement {...register} required />
      <MarkDownImage color={color} markdown={markdown} type={type} ref={ref} />
      <div className={styles.buttonArea}>
        <Button onClick={onOpen} type="prime">画像</Button>
      </div>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>プレビュー</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {imageSrc === '' ? (
            <Spinner />
          ): (
            <Image
            src={imageSrc}
            alt="Description of Image" // 画像の説明
            width={500}  // 表示幅
            height={500} // 表示高さ
            layout="responsive" // レイアウトオプション
          />
          )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} type="prime">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
