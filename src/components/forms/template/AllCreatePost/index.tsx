import * as React from 'react'
import { useState, useEffect } from 'react'

import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react'
import { useForm, FormProvider } from 'react-hook-form'

import { DEFAULT_LAST_CONTENT } from '@/const/defaultLastContent'

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

  const { isOpen, onClose } = useDisclosure()

  const watchColor = methods.watch('color')
  const [color, setColor] = useState('')

  useEffect(() => {
    setColor(watchColor)
  }, [watchColor])

  return (
    <FormProvider {...methods}>
      <Tabs isFitted>
        <TabList>
          <Tab>Set</Tab>
          <Tab>1</Tab>
          <Tab>2</Tab>
          <Tab>3</Tab>
          <Tab>4</Tab>
          <Tab>Last</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <SettingArea color={color}/>
          </TabPanel>
          <TabPanel>
            <CreatePost color={color} type="question" fieldName='first' />
          </TabPanel>
          <TabPanel>
            <CreatePost color={color} type="research" fieldName='second' />
          </TabPanel>
          <TabPanel>
            <CreatePost color={color} type="startled" fieldName='third' />
          </TabPanel>
          <TabPanel>
            <CreatePost color={color} type="creativity" fieldName='forth' />
          </TabPanel>
          <TabPanel>
            <CreatePost
              color={color}
              type="welcome"
              fieldName='last'
            />
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>プレビュー</ModalHeader>
          <ModalCloseButton />
          <ModalBody>

          </ModalBody>

          <ModalFooter>

          </ModalFooter>
        </ModalContent>
      </Modal>
    </FormProvider>
  )
}
