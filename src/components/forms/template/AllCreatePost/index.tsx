import * as React from 'react'
import { useState, useEffect, useRef, Fragment } from 'react'

import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Spinner,
  Button,
} from '@chakra-ui/react'
import Image from 'next/image'
import { useForm, FormProvider } from 'react-hook-form'

import { useCreateImage } from '@/hooks/useCreateImage'

import { DEFAULT_LAST_CONTENT } from '@/const/defaultLastContent'

import { SwipeComponent } from '@/components/atoms/SwipeComponent'
import { CreatePost } from '@/components/forms/organisms/CreatePost'

import { SettingArea } from './SettingArea'


export const AllCreatePost: React.FC = (): JSX.Element => {
  const methods = useForm(
    {
      defaultValues: {
        color: 'red',
        first: '',
        second: '',
        third: '',
        forth: '',
        last: DEFAULT_LAST_CONTENT
      }
    }
  )

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + '</span>'
    },
  }

  const firstImageRef = useRef<HTMLDivElement>(null)
  const secondImageRef = useRef<HTMLDivElement>(null)
  const thirdImageRef = useRef<HTMLDivElement>(null)
  const forthImageRef = useRef<HTMLDivElement>(null)
  const lastImageRef = useRef<HTMLDivElement>(null)
  const firstCreateImage = useCreateImage(firstImageRef)
  const secondCreateImage = useCreateImage(secondImageRef)
  const thirdCreateImage = useCreateImage(thirdImageRef)
  const forthCreateImage = useCreateImage(forthImageRef)
  const lastCreateImage = useCreateImage(lastImageRef)

  const { isOpen, onClose, onOpen } = useDisclosure()

  const watchColor = methods.watch('color')
  const [color, setColor] = useState('')

  const reload = () => {
    firstCreateImage.createImage()
    secondCreateImage.createImage()
    thirdCreateImage.createImage()
    forthCreateImage.createImage()
    lastCreateImage.createImage()
  }

  useEffect(() => {
    setColor(watchColor)
  }, [watchColor])

  useEffect(() => {
    if (isOpen) {
      firstCreateImage.createImage()
      secondCreateImage.createImage()
      thirdCreateImage.createImage()
      forthCreateImage.createImage()
      lastCreateImage.createImage()
    }
  }, [
    isOpen,
    firstCreateImage,
    secondCreateImage,
    thirdCreateImage,
    forthCreateImage,
    lastCreateImage
  ])

  return (
    <FormProvider {...methods}>
      <SwipeComponent pagination={pagination}>
        {[
          (<Box mt={'50px'} p={6} key={'set'}><SettingArea color={color}/></Box>),
          (<Box mt={'50px'} p={6} key={'1'}>
            <CreatePost
              color={color}
              type="question"
              fieldName='first'
              preViewOpen={onOpen}
              imageRef={firstImageRef}
            />
          </Box>),
          (<Box mt={'50px'} p={6} key={'2'}>
            <CreatePost
              color={color}
              type="research"
              fieldName='second'
              preViewOpen={onOpen}
              imageRef={secondImageRef}
            />
          </Box>),
          (<Box mt={'50px'} p={6} key={'3'}>
            <CreatePost
              color={color}
              type="startled"
              fieldName='third'
              preViewOpen={onOpen}
              imageRef={thirdImageRef}
            />
          </Box>),
          (<Box mt={'50px'} p={6} key={'4'}>
            <CreatePost
              color={color}
              type="creativity"
              fieldName='forth'
              preViewOpen={onOpen}
              imageRef={forthImageRef}
            />
          </Box>),
          (<Box mt={'50px'} p={6} key={'last'}>
            <CreatePost
              color={color}
              type="welcome"
              fieldName='last'
              preViewOpen={onOpen}
              imageRef={lastImageRef}
            />
          </Box>),
        ]}
      </SwipeComponent>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>プレビュー</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SwipeComponent navigation>{[
              (<Fragment key={1}>
                {firstCreateImage.imageSrc === '' ? (
                  <Spinner />
                ): (
                  <Image
                  src={firstCreateImage.imageSrc}
                  alt="Description of Image"
                  width={500}
                  height={500}
                />
                )}
              </Fragment>),
              (<Fragment key={2}>
                {secondCreateImage.imageSrc === '' ? (
                  <Spinner />
                ): (
                  <Image
                  src={secondCreateImage.imageSrc}
                  alt="Description of Image"
                  width={500}
                  height={500}
                />
                )}
              </Fragment>),
              (<Fragment key={3}>
                {thirdCreateImage.imageSrc === '' ? (
                  <Spinner />
                ): (
                  <Image
                  src={thirdCreateImage.imageSrc}
                  alt="Description of Image"
                  width={500}
                  height={500}
                />
                )}
              </Fragment>),
              (<Fragment key={4}>
                {forthCreateImage.imageSrc === '' ? (
                  <Spinner />
                ): (
                  <Image
                  src={forthCreateImage.imageSrc}
                  alt="Description of Image"
                  width={500}
                  height={500}
                />
                )}
              </Fragment>),
              (<Fragment key={5}>
                {lastCreateImage.imageSrc === '' ? (
                  <Spinner />
                ): (
                  <Image
                  src={lastCreateImage.imageSrc}
                  alt="Description of Image"
                  width={500}
                  height={500}
                />
                )}
              </Fragment>)
            ]}
            </SwipeComponent>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} w={'full'} colorScheme='blue'>Close</Button>
            <Button onClick={reload} ml={3} colorScheme='blue'>reLoad</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormProvider>
  )
}
