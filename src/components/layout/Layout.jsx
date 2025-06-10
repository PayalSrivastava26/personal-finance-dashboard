// src/components/layout/Layout.jsx
import React from 'react'
import { Box, Flex } from '@chakra-ui/react'
import Sidebar from './Sidebar'
import Navbar from './Navbar'

const Layout = ({ children, activeTab, setActiveTab }) => {
  return (
    <Flex>
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Box flex={1} ml="250px">
        <Navbar />
        <Box mt="60px" minH="calc(100vh - 60px)">
          {children}
        </Box>
      </Box>
    </Flex>
  )
}

export default Layout