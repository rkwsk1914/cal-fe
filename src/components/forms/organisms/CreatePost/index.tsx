import * as React from 'react'
import { useRef ,useEffect } from 'react'

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Button
} from '@chakra-ui/react'
import Image from 'next/image'
import { useForm, useFormContext } from 'react-hook-form'

import { useCreateImage } from '@/hooks/useCreateImage'

import { MarkDownImage } from '@/components/forms/molecules/MarkDownImage'
import { TextAreaElement } from '@/components/forms/molecules/TextAreaElement'


import styles from './style.module.scss'

import type { postImageType } from '@/types/postImageType'


type Props = {
  color: string
  type: postImageType
  defaultMarkdown?: string
  fieldName?: string
  imageRef?: React.RefObject<HTMLDivElement>
  preViewOpen?: () => void
}

export const CreatePost: React.FC<Props> = (props): JSX.Element => {
  const {
    color,
    type,
    defaultMarkdown,
    fieldName,
    imageRef,
    preViewOpen
  } = props
  const context = useFormContext()
  const myForm = useForm(
    {
      defaultValues: {
        markdown: defaultMarkdown ?? '',
      }
    }
  )
  const markdown = fieldName ? context.watch(fieldName) : myForm.watch('markdown')

  const myImageRef = useRef<HTMLDivElement>(null)

  const { isOpen, onOpen, onClose } = useDisclosure()
  const { createImage, imageSrc } = useCreateImage(imageRef ?? myImageRef)

  useEffect(() => {
    if (isOpen) createImage()
  }, [isOpen, createImage])

  const register = fieldName ? context.register(fieldName, {
    required: true
  }) : myForm.register('markdown', {
    required: true
  })

  const isValid = fieldName ?
    context.getValues(fieldName) :
    myForm.getValues('markdown')

  return (
    <>
      <TextAreaElement {...register} isValid={isValid} required />
      <div onClick={() => {
          if (isValid) {
            preViewOpen ? preViewOpen() : onOpen()
          }
        }}>
        <MarkDownImage
          color={color}
          markdown={markdown}
          type={type}
          ref={imageRef ?? myImageRef}
        />
      </div>
      <div className={styles.buttonArea}>
        <Button onClick={preViewOpen ?? onOpen} w={'full'} colorScheme='blue' isDisabled={!isValid}>画像</Button>
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
            alt="Description of Image"
            width={500}
            height={500}
          />
          )}
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} w={'full'} colorScheme='blue'>Close</Button>
            <Button onClick={createImage} ml={3} colorScheme='blue'>reLoad</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
