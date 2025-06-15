// // src/components/ui/NotificationPanel.jsx
// import React from 'react';
// import {
//   Box,
//   VStack,
//   HStack,
//   Text,
//   IconButton,
//   Badge,
//   Button,
//   Divider,
//   Flex,
//   useColorModeValue,
//   Popover,
//   PopoverTrigger,
//   PopoverContent,
//   PopoverHeader,
//   PopoverBody,
//   PopoverFooter,
//   PopoverCloseButton,
//   ScrollBox,
//   Empty
// } from '@chakra-ui/react';
// import {
//   MdNotifications,
//   MdClose,
//   MdCheckCircle,
//   MdClear,
//   MdMarkEmailRead
// } from 'react-icons/md';
// import { useNotifications } from '../../context/NotificationContext';

// const NotificationItem = ({ notification, onMarkAsRead, onRemove }) => {
//   const itemBg = useColorModeValue('gray.50', 'gray.700');
//   const unreadBg = useColorModeValue('blue.50', 'blue.900');
//   const textColor = useColorModeValue('gray.800', 'white');
//   const timeColor = useColorModeValue('gray.500', 'gray.400');
  
//   const getStatusColor = (type) => {
//     switch (type) {
//       case 'error': return 'red';
//       case 'warning': return 'orange';
//       case 'success': return 'green';
//       default: return 'blue';
//     }
//   };

//   const formatTime = (timestamp) => {
//     const date = new Date(timestamp);
//     const now = new Date();
//     const diff = now - date;
    
//     if (diff < 60000) return 'Just now';
//     if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
//     if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
//     return date.toLocaleDateString();
//   };

//   return (
//     <Box
//       p={3}
//       bg={notification.read ? itemBg : unreadBg}
//       borderRadius="md"
//       borderLeft={notification.read ? 'none' : '4px solid'}
//       borderLeftColor={`${getStatusColor(notification.type)}.500`}
//       transition="all 0.2s"
//       _hover={{ transform: 'translateY(-1px)', shadow: 'sm' }}
//     >
//       <HStack justify="space-between" align="start">
//         <HStack spacing={3} flex={1}>
//           <Text fontSize="lg">{notification.icon}</Text>
//           <VStack align="start" spacing={1} flex={1}>
//             <HStack justify="space-between" w="full">
//               <Text fontWeight="semibold" color={textColor} fontSize="sm">
//                 {notification.title}
//               </Text>
//               <Text fontSize="xs" color={timeColor}>
//                 {formatTime(notification.timestamp)}
//               </Text>
//             </HStack>
//             <Text fontSize="sm" color={textColor} opacity={0.8}>
//               {notification.message}
//             </Text>
//             {notification.category && (
//               <Badge
//                 size="sm"
//                 colorScheme={getStatusColor(notification.type)}
//                 variant="subtle"
//               >
//                 {notification.category}
//               </Badge>
//             )}
//           </VStack>
//         </HStack>
//         <VStack spacing={1}>
//           {!notification.read && (
//             <IconButton
//               icon={<MdCheckCircle />}
//               size="xs"
//               variant="ghost"
//               colorScheme="green"
//               onClick={() => onMarkAsRead(notification.id)}
//               aria-label="Mark as read"
//             />
//           )}
//           <IconButton
//             icon={<MdClose />}
//             size="xs"
//             variant="ghost"
//             colorScheme="red"
//             onClick={() => onRemove(notification.id)}
//             aria-label="Remove notification"
//           />
//         </VStack>
//       </HStack>
//     </Box>
//   );
// };

// const NotificationPanel = () => {
//   const {
//     notifications,
//     unreadCount,
//     markAsRead,
//     removeNotification,
//     markAllAsRead,
//     clearAllNotifications
//   } = useNotifications();

//   const headerBg = useColorModeValue('gray.100', 'gray.600');
//   const footerBg = useColorModeValue('gray.50', 'gray.700');

//   return (
//     <Popover placement="bottom-end" closeOnBlur={true}>
//       <PopoverTrigger>
//         <IconButton
//           icon={<MdNotifications />}
//           variant="ghost"
//           size="md"
//           position="relative"
//           aria-label="Notifications"
//         >
//           {unreadCount > 0 && (
//             <Badge
//               position="absolute"
//               top="-1"
//               right="-1"
//               colorScheme="red"
//               borderRadius="full"
//               fontSize="xs"
//               minW="18px"
//               h="18px"
//               display="flex"
//               alignItems="center"
//               justifyContent="center"
//             >
//               {unreadCount > 99 ? '99+' : unreadCount}
//             </Badge>
//           )}
//         </IconButton>
//       </PopoverTrigger>
      
//       <PopoverContent w="400px" maxW="90vw">
//         <PopoverCloseButton />
        
//         <PopoverHeader bg={headerBg} borderTopRadius="md">
//           <HStack justify="space-between" align="center">
//             <Text fontWeight="bold">Notifications</Text>
//             {unreadCount > 0 && (
//               <Badge colorScheme="blue" borderRadius="full">
//                 {unreadCount} new
//               </Badge>
//             )}
//           </HStack>
//         </PopoverHeader>

//         <PopoverBody p={0} maxH="400px" overflowY="auto">
//           {notifications.length === 0 ? (
//             <Box p={8} textAlign="center">
//               <Text fontSize="lg" mb={2}>🔔</Text>
//               <Text color="gray.500" fontSize="sm">
//                 No notifications yet
//               </Text>
//             </Box>
//           ) : (
//             <VStack spacing={2} p={3} align="stretch">
//               {notifications.map((notification) => (
//                 <NotificationItem
//                   key={notification.id}
//                   notification={notification}
//                   onMarkAsRead={markAsRead}
//                   onRemove={removeNotification}
//                 />
//               ))}
//             </VStack>
//           )}
//         </PopoverBody>

//         {notifications.length > 0 && (
//           <PopoverFooter bg={footerBg} borderBottomRadius="md">
//             <HStack justify="space-between">
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 leftIcon={<MdMarkEmailRead />}
//                 onClick={markAllAsRead}
//                 isDisabled={unreadCount === 0}
//               >
//                 Mark all read
//               </Button>
//               <Button
//                 size="sm"
//                 variant="ghost"
//                 leftIcon={<MdClear />}
//                 onClick={clearAllNotifications}
//                 colorScheme="red"
//               >
//                 Clear all
//               </Button>
//             </HStack>
//           </PopoverFooter>
//         )}
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default NotificationPanel;
import React from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  IconButton,
  Badge,
  Button,
  Divider,
  Flex,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverCloseButton,
  Center,
} from '@chakra-ui/react';
import {
  MdNotifications,
  MdClose,
  MdCheckCircle,
  MdClear,
  MdMarkEmailRead,
} from 'react-icons/md';
import { useNotifications } from '../../context/NotificationContext';

const NotificationItem = ({ notification, onMarkAsRead, onRemove }) => {
  const itemBg = useColorModeValue('gray.50', 'gray.700');
  const unreadBg = useColorModeValue('blue.50', 'blue.900');
  const textColor = useColorModeValue('gray.800', 'white');
  const timeColor = useColorModeValue('gray.500', 'gray.400');

  const getStatusColor = (type) => {
    switch (type) {
      case 'error': return 'red';
      case 'warning': return 'orange';
      case 'success': return 'green';
      default: return 'blue';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <Box
      p={3}
      bg={notification.read ? itemBg : unreadBg}
      borderRadius="md"
      borderLeft={notification.read ? 'none' : '4px solid'}
      borderLeftColor={`${getStatusColor(notification.type)}.500`}
      transition="all 0.2s"
      _hover={{ transform: 'translateY(-1px)', shadow: 'sm' }}
    >
      <HStack justify="space-between" align="start">
        <HStack spacing={3} flex={1}>
          <Text fontSize="lg">{notification.icon}</Text>
          <VStack align="start" spacing={1} flex={1}>
            <HStack justify="space-between" w="full">
              <Text fontWeight="semibold" color={textColor} fontSize="sm">
                {notification.title}
              </Text>
              <Text fontSize="xs" color={timeColor}>
                {formatTime(notification.timestamp)}
              </Text>
            </HStack>
            <Text fontSize="sm" color={textColor} opacity={0.8}>
              {notification.message}
            </Text>
            {notification.category && (
              <Badge
                size="sm"
                colorScheme={getStatusColor(notification.type)}
                variant="subtle"
              >
                {notification.category}
              </Badge>
            )}
          </VStack>
        </HStack>
        <VStack spacing={1}>
          {!notification.read && (
            <IconButton
              icon={<MdCheckCircle />}
              size="xs"
              variant="ghost"
              colorScheme="green"
              onClick={() => onMarkAsRead(notification.id)}
              aria-label="Mark as read"
            />
          )}
          <IconButton
            icon={<MdClose />}
            size="xs"
            variant="ghost"
            colorScheme="red"
            onClick={() => onRemove(notification.id)}
            aria-label="Remove notification"
          />
        </VStack>
      </HStack>
    </Box>
  );
};

const NotificationPanel = () => {
  const {
    notifications,
    unreadCount,
    markAsRead,
    removeNotification,
    markAllAsRead,
    clearAllNotifications,
  } = useNotifications();

  const headerBg = useColorModeValue('gray.100', 'gray.600');
  const footerBg = useColorModeValue('gray.50', 'gray.700');

  return (
    <Popover placement="bottom-end" closeOnBlur={true}>
      <PopoverTrigger>
        <IconButton
          icon={<MdNotifications />}
          variant="ghost"
          size="md"
          position="relative"
          aria-label="Notifications"
        >
          {unreadCount > 0 && (
            <Badge
              position="absolute"
              top="-1"
              right="-1"
              colorScheme="red"
              borderRadius="full"
              fontSize="xs"
              minW="18px"
              h="18px"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {unreadCount > 99 ? '99+' : unreadCount}
            </Badge>
          )}
        </IconButton>
      </PopoverTrigger>

      <PopoverContent w="400px" maxW="90vw">
        <PopoverCloseButton />
        <PopoverHeader bg={headerBg} borderTopRadius="md">
          <HStack justify="space-between" align="center">
            <Text fontWeight="bold">Notifications</Text>
            {unreadCount > 0 && (
              <Badge colorScheme="blue" borderRadius="full">
                {unreadCount} new
              </Badge>
            )}
          </HStack>
        </PopoverHeader>

        <PopoverBody p={0} maxH="400px" overflowY="auto">
          {notifications.length === 0 ? (
            <Box p={8} textAlign="center">
              <Text fontSize="4xl" mb={2}>📭</Text>
              <Text color="gray.500" fontSize="sm">
                No notifications yet
              </Text>
            </Box>
          ) : (
            <VStack spacing={2} p={3} align="stretch">
              {notifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  onMarkAsRead={markAsRead}
                  onRemove={removeNotification}
                />
              ))}
            </VStack>
          )}
        </PopoverBody>

        {notifications.length > 0 && (
          <PopoverFooter bg={footerBg} borderBottomRadius="md">
            <HStack justify="space-between">
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<MdMarkEmailRead />}
                onClick={markAllAsRead}
                isDisabled={unreadCount === 0}
              >
                Mark all read
              </Button>
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<MdClear />}
                onClick={clearAllNotifications}
                colorScheme="red"
              >
                Clear all
              </Button>
            </HStack>
          </PopoverFooter>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default NotificationPanel;
