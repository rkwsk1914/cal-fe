import * as React from 'react'

import { HamburgerIcon } from '@chakra-ui/icons'
import {
  IconButton,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Divider,
  FormControl, FormLabel, Switch,
  useDisclosure,
  useColorMode,
} from '@chakra-ui/react'

import { LinkMenu } from '@/components/molecules/LinkMenu'

import styles from './style.module.scss'

type ListItemType = {
  href?: string
  label: string
  subList?: ListItemType[]
}

type Props = {
  list: ListItemType[]
};

export const SiteMenu: React.FC<Props> = (
  {
    list
  }
): JSX.Element => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <>
      <IconButton
        aria-label='Site Menu'
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Site Menu</DrawerHeader>

          <DrawerBody>
            <FormControl>
              <div className={styles.themeButtonArea}>
                <FormLabel htmlFor='isChecked' marginBottom={'0px'}>{colorMode}:</FormLabel>
                <Switch id='isChecked' onChange={toggleColorMode} defaultChecked={colorMode === 'dark'} />
              </div>
            </FormControl>
            <Divider />
            <div className={styles.menuArea}>
              <LinkMenu list={list} />
            </div>
          </DrawerBody>

          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}
