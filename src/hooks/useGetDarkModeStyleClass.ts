import { useColorMode } from '@chakra-ui/react'
import clsx from 'clsx'

export const useGetDarkModeStyleClass = (
  parentClassName: string, styleDark: string
): string => {
  const { colorMode } = useColorMode()
  const isDarkMode = colorMode === 'dark'
  const className = clsx(parentClassName, {
    [styleDark]: isDarkMode,
  })
  return className
}
