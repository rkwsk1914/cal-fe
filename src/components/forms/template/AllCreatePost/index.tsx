import * as React from 'react'

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

  const { getValues } = methods



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
            <SettingArea />
          </TabPanel>
          <TabPanel>
            <CreatePost color={getValues('color')} type="question" fieldName='first' />
          </TabPanel>
          <TabPanel>
            <CreatePost color={getValues('color')} type="research" fieldName='second' />
          </TabPanel>
          <TabPanel>
            <CreatePost color={getValues('color')} type="startled" fieldName='third' />
          </TabPanel>
          <TabPanel>
            <CreatePost color={getValues('color')} type="creativity" fieldName='forth' />
          </TabPanel>
          <TabPanel>
            <CreatePost
              color={getValues('color')}
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
