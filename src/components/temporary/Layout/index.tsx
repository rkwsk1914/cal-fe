import * as React from 'react'

import { HamburgerIcon } from '@chakra-ui/icons'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Box
} from '@chakra-ui/react'
import NextLink from 'next/link'

interface Props {
  children?: React.ReactNode
}

export const Layout: React.FC<Props> = ({
  children
}): JSX.Element => {
  return (
    <Box p={4}>
      <Menu>
        <MenuButton
          as={IconButton}
          aria-label='Options'
          icon={<HamburgerIcon />}
          variant='outline'
        />
        <MenuList>
          <MenuItem as={NextLink} href='/'>
            HOME
          </MenuItem>
          <MenuItem as={NextLink} href='/fixed-cost'>
            固定費
          </MenuItem>
          <MenuItem as={NextLink} href='/test'>
            テスト
          </MenuItem>
        </MenuList>
      </Menu>
      <Box px={0}>
        {children}
      </Box>
    </Box>
  )
}
