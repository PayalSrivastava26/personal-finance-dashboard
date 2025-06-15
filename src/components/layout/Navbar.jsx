// import React from 'react'
// import {
//   Box,
//   Flex,
//   Input,
//   HStack,
//   IconButton,
//   Avatar,
//   InputGroup,
//   InputLeftElement,
//   useColorModeValue
// } from '@chakra-ui/react'
// import {
//   MdSearch,
//   MdNotifications
// } from 'react-icons/md'
// import ThemeToggle from '../ui/ThemeToggle'

// const Navbar = () => {
//   const navbarBg = useColorModeValue('white', 'gray.800')
//   const borderColor = useColorModeValue('gray.200', 'gray.700')
  
//   return (
//     <Box
//       w="calc(100% - 250px)"
//       h="60px"
//       bg={navbarBg}
//       borderBottom="1px"
//       borderColor={borderColor}
//       position="fixed"
//       top="0"
//       right="0"
//       zIndex={5}
//       px={6}
//       display="flex"
//       alignItems="center"
//       justifyContent="space-between"
//     >
//       <Box flex={1} maxW="400px">
//         <InputGroup>
//           <InputLeftElement>
//             <MdSearch color="gray.500" />
//           </InputLeftElement>
//           <Input
//             placeholder="Search transactions..."
//             bg={useColorModeValue('gray.50', 'gray.700')}
//             border="1px"
//             borderColor={useColorModeValue('gray.200', 'gray.600')}
//             _focus={{
//               borderColor: 'brand.500',
//               boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)'
//             }}
//           />
//         </InputGroup>
//       </Box>
      
//       <HStack spacing={4}>
//         <ThemeToggle />
//         <IconButton
//           aria-label="Notifications"
//           icon={<MdNotifications />}
//           variant="ghost"
//           size="md"
//           position="relative"
//           _after={{
//             content: '""',
//             position: 'absolute',
//             top: '8px',
//             right: '8px',
//             width: '8px',
//             height: '8px',
//             borderRadius: 'full',
//             bg: 'red.500'
//           }}
//         />
//         <Avatar 
//           size="sm" 
//           name="Payal Srivastava" 
//           bg="brand.500" 
//           color="white"
//           cursor="pointer"
//           _hover={{
//             transform: 'scale(1.05)',
//             transition: 'all 0.2s'
//           }}
//         />
//       </HStack>
//     </Box>
//   )
// }

// export default Navbar
// src/components/layout/Navbar.jsx
import React from 'react'
import {
  Box,
  Flex,
  Input,
  HStack,
  IconButton,
  Avatar,
  InputGroup,
  InputLeftElement,
  useColorModeValue
} from '@chakra-ui/react'
import {
  MdSearch
} from 'react-icons/md'
import ThemeToggle from '../ui/ThemeToggle'
import NotificationPanel from '../ui/NotificationPanel'

const Navbar = () => {
  const navbarBg = useColorModeValue('white', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.700')
     
  return (
    <Box
      bg={navbarBg}
      borderBottom="1px"
      borderBottomColor={borderColor}
      px={6}
      py={4}
    >
      <Flex justify="space-between" align="center">
        <InputGroup maxW="400px">
          <InputLeftElement>
            <MdSearch color="gray.400" />
          </InputLeftElement>
          <Input
            placeholder="Search transactions..."
            variant="filled"
            bg={useColorModeValue('gray.100', 'gray.700')}
            border="none"
            _focus={{
              bg: useColorModeValue('white', 'gray.600'),
              borderColor: 'blue.500'
            }}
          />
        </InputGroup>
        
        <HStack spacing={4}>
          <ThemeToggle />
          <NotificationPanel />
          <Avatar
            size="sm"
            name="User"
            bg="blue.500"
            color="white"
          />
        </HStack>
      </Flex>
    </Box>
  )
}

export default Navbar