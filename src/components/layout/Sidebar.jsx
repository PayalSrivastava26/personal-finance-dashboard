// src/components/layout/Sidebar.jsx
import React from 'react'
import {
  Box,
  VStack,
  Button,
  Heading,
  useColorModeValue
} from '@chakra-ui/react'
import {
  MdDashboard,
  MdAdd,
  MdList,
  MdAnalytics,
  MdSettings
} from 'react-icons/md'

const Sidebar = ({ activeTab, setActiveTab }) => {
  const sidebarBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: MdDashboard },
    { id: 'add-expense', label: 'Add Expense', icon: MdAdd },
    { id: 'expenses', label: 'View Expenses', icon: MdList },
    { id: 'analytics', label: 'Analytics', icon: MdAnalytics },
    { id: 'settings', label: 'Settings', icon: MdSettings }
  ]

  return (
    <Box
      w="250px"
      h="100vh"
      bg={sidebarBg}
      borderRight="1px"
      borderColor={borderColor}
      position="fixed"
      left="0"
      top="0"
      overflowY="auto"
      p={6}
      zIndex={10}
    >
      <VStack align="stretch" spacing={2}>
        <Box mb={8}>
          <Heading size="lg" color="brand.500" textAlign="center">
            💰 FinTrack 
          </Heading>
        </Box>
        
        {menuItems.map((item) => (
          <Button
            key={item.id}
            leftIcon={<item.icon />}
            variant={activeTab === item.id ? 'solid' : 'ghost'}
            colorScheme={activeTab === item.id ? 'brand' : 'gray'}
            justifyContent="flex-start"
            onClick={() => setActiveTab(item.id)}
            size="lg"
            mb={1}
            borderRadius="lg"
            _hover={{
              transform: 'translateX(4px)',
              transition: 'all 0.2s'
            }}
          >
            {item.label}
          </Button>
        ))}
      </VStack>
    </Box>
  )
}

export default Sidebar