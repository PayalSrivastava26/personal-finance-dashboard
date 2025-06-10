import React from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Avatar,
  Badge,
  IconButton,
  useColorModeValue,
  Divider,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react';
import {
  FiShoppingCart,
  FiTruck,
  FiHome,
  FiHeart,
  FiBook,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiDollarSign,
} from 'react-icons/fi';
import useExpenses from '../../hooks/useExpenses';
import { formatCurrency, formatDate } from '../../utils/formatters';
import DeleteConfirmation from '../common/DeleteConfirmation';

const categoryIcons = {
  Food: FiShoppingCart,
  Transportation: FiTruck,
  Housing: FiHome,
  Healthcare: FiHeart,
  Education: FiBook,
  Other: FiDollarSign,
};

const categoryColors = {
  Food: 'green',
  Transportation: 'blue',
  Housing: 'purple',
  Healthcare: 'red',
  Education: 'orange',
  Other: 'gray',
};

const RecentTransactions = ({ limit = 5 }) => {
  const { expenses, deleteExpense } = useExpenses();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExpense, setSelectedExpense] = React.useState(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  const recentExpenses = React.useMemo(() => {
    return [...expenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  }, [expenses, limit]);

  const handleDelete = (expense) => {
    setSelectedExpense(expense);
    onOpen();
  };

  const confirmDelete = () => {
    if (selectedExpense) {
      deleteExpense(selectedExpense.id);
      setSelectedExpense(null);
      onClose();
    }
  };

  const TransactionItem = ({ expense }) => {
    const IconComponent = categoryIcons[expense.category] || FiDollarSign;
    const colorScheme = categoryColors[expense.category] || 'gray';

    return (
      <HStack
        p={4}
        spacing={4}
        borderRadius="lg"
        _hover={{ bg: hoverBg }}
        transition="all 0.2s"
        cursor="pointer"
        w="full"
      >
        <Avatar
          size="md"
          bg={`${colorScheme}.100`}
          color={`${colorScheme}.600`}
          icon={<IconComponent size="18" />}
        />
        
        <VStack align="start" spacing={1} flex={1}>
          <HStack justify="space-between" w="full">
            <Text fontWeight="semibold" fontSize="sm">
              {expense.description}
            </Text>
            <Text fontWeight="bold" color={`${colorScheme}.500`}>
              -{formatCurrency(expense.amount)}
            </Text>
          </HStack>
          
          <HStack spacing={2}>
            <Badge 
              size="sm" 
              colorScheme={colorScheme}
              variant="subtle"
            >
              {expense.category}
            </Badge>
            <Text fontSize="xs" color="gray.500">
              {formatDate(expense.date)}
            </Text>
          </HStack>
        </VStack>
        
        <Menu>
          <MenuButton
            as={IconButton}
            icon={<FiMoreVertical />}
            variant="ghost"
            size="sm"
            colorScheme="gray"
          />
          <MenuList>
            <MenuItem icon={<FiEdit2 />}>
              Edit Transaction
            </MenuItem>
            <MenuItem 
              icon={<FiTrash2 />} 
              color="red.500"
              onClick={() => handleDelete(expense)}
            >
              Delete Transaction
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    );
  };

  return (
    <>
      <Box
        bg={bgColor}
        p={6}
        borderRadius="xl"
        border="1px"
        borderColor={borderColor}
        boxShadow="sm"
      >
        <HStack justify="space-between" mb={6}>
          <Heading size="md" color="gray.700">
            Recent Transactions
          </Heading>
          <Button variant="ghost" size="sm" colorScheme="blue">
            View All
          </Button>
        </HStack>

        {recentExpenses.length === 0 ? (
          <VStack py={8} spacing={3}>
            <Text color="gray.500" textAlign="center">
              No transactions yet
            </Text>
            <Text fontSize="sm" color="gray.400" textAlign="center">
              Add your first expense to see it here
            </Text>
          </VStack>
        ) : (
          <VStack spacing={0} divider={<Divider />}>
            {recentExpenses.map((expense, index) => (
              <TransactionItem key={expense.id} expense={expense} />
            ))}
          </VStack>
        )}
        
        {expenses.length > limit && (
          <Box mt={4} textAlign="center">
            <Button variant="outline" size="sm" colorScheme="blue">
              Load More Transactions
            </Button>
          </Box>
        )}
      </Box>

      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        title="Delete Transaction"
        message={`Are you sure you want to delete "${selectedExpense?.description}"? This action cannot be undone.`}
      />
    </>
  );
};

export default RecentTransactions;