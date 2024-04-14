import * as React from 'react'

import { SettingsIcon, DragHandleIcon, EditIcon, CalendarIcon } from '@chakra-ui/icons'
import {
  Tabs,
  TabList,
  Tab,
  Box,
  Drawer,
  DrawerHeader,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Link,
  Heading,
  Divider
} from '@chakra-ui/react'

import styles from './style.module.scss'

type Props = {
  children?: React.ReactNode
  menu?: React.ReactNode
  setting?: React.ReactNode
  defaultIndex?: number
  title?: string
};

export const AppFrame: React.FC<Props> = (
  {
    children,
    menu,
    setting,
    defaultIndex,
    title
  }
): JSX.Element => {
  const right = useDisclosure()
  const left = useDisclosure()
  return (
    <div className={styles.app}>
      <Box w='100%' p={4}>
        <Heading as='h4' size='md'>
          {title}
        </Heading>
      </Box>
      <Divider mb={2} />
      <Tabs
        variant="unstyled"
        isFitted
        defaultIndex={defaultIndex}
        width={'100%'}
        h={'100%'}>
        <TabList>
          <Tab onClick={left.onOpen}><DragHandleIcon />&nbsp;menu</Tab>
          <Tab><Link p={0}><CalendarIcon />&nbsp;top</Link></Tab>
          <Tab><Link p={0}><EditIcon />&nbsp;opt</Link></Tab>
          <Tab onClick={right.onOpen}><SettingsIcon />&nbsp;set</Tab>
        </TabList>
      </Tabs>
      <Divider mt={2} />
      <Box className={styles.content}>
        {children}
      </Box>
      <Drawer
        isOpen={left.isOpen}
        placement='left'
        onClose={left.onClose}
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />
          <DrawerBody>
            {menu}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Drawer
        isOpen={right.isOpen}
        placement='right'
        onClose={right.onClose}
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />
          <DrawerBody>
            {setting}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
