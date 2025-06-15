import React from 'react'
import { IconButton, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FiSun, FiMoon } from 'react-icons/fi'  // Changed to Feather icons

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const SwitchIcon = useColorModeValue(FiMoon, FiSun)  // Using Feather icons
  
  return (
    <IconButton
      aria-label="Toggle theme"
      icon={<SwitchIcon />}
      onClick={toggleColorMode}
      variant="ghost"
      size="md"
      _hover={{
        transform: 'rotate(180deg)',
        transition: 'all 0.3s'
      }}
    />
  )
}

export default ThemeToggle