import React from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Input,
  Select,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Badge,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  Flex,
  Avatar,
  useDisclosure,
  Stat,
  StatLabel,
  StatNumber,
  SimpleGrid,
  Divider,
} from '@chakra-ui/react';
import {
  FiSearch,
  FiFilter,
  FiMoreVertical,
  FiEdit2,
  FiTrash2,
  FiDownload,
  FiCalendar,
  FiDollarSign,
  FiShoppingCart,
  FiTruck,
  FiHome,
  FiHeart,
  FiBook,
} from 'react-icons/fi';
import useExpenses from '../../hooks/useExpenses'; // ✅ Fixed: Changed from named import to default import
import { formatCurrency, formatDate } from '../../utils/formatters';
import DeleteConfirmation from '../common/DeleteConfirmation';
import EmptyState from '../common/EmptyState';// Vite will look for .js/.jsx/.ts/etc.




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

const ExpenseList = () => {
  const { expenses, deleteExpense } = useExpenses();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedExpense, setSelectedExpense] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [categoryFilter, setCategoryFilter] = React.useState('');
  const [sortBy, setSortBy] = React.useState('date');
  const [sortOrder, setSortOrder] = React.useState('desc');
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const rowHoverBg = useColorModeValue('gray.50', 'gray.700');

  // Filter and sort expenses
  const filteredExpenses = React.useMemo(() => {
    let filtered = expenses.filter(expense => {
      const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !categoryFilter || expense.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    // Sort expenses
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'description':
          comparison = a.description.localeCompare(b.description);
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [expenses, searchTerm, categoryFilter, sortBy, sortOrder]);

  // Calculate statistics
  const stats = React.useMemo(() => {
    const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const average = filteredExpenses.length > 0 ? total / filteredExpenses.length : 0;
    const thisMonth = filteredExpenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      const now = new Date();
      return expenseDate.getMonth() === now.getMonth() && 
             expenseDate.getFullYear() === now.getFullYear();
    }).reduce((sum, expense) => sum + expense.amount, 0);

    return { total, average, thisMonth, count: filteredExpenses.length };
  }, [filteredExpenses]);

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

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const categories = [...new Set(expenses.map(expense => expense.category))];

  return (
    <>
      <VStack spacing={6} align="stretch">
        {/* Page Header */}
        <Box>
          <Heading size="lg" mb={2}>
            Expense History
          </Heading>
          <Text color="gray.600">
            View and manage all your expenses
          </Text>
        </Box>

        {/* Statistics Cards */}
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
          <Stat
            bg={bgColor}
            p={4}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="sm">Total Expenses</StatLabel>
            <StatNumber fontSize="xl" color="red.500">
              {formatCurrency(stats.total)}
            </StatNumber>
          </Stat>
          <Stat
            bg={bgColor}
            p={4}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="sm">This Month</StatLabel>
            <StatNumber fontSize="xl" color="blue.500">
              {formatCurrency(stats.thisMonth)}
            </StatNumber>
          </Stat>
          <Stat
            bg={bgColor}
            p={4}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="sm">Average</StatLabel>
            <StatNumber fontSize="xl" color="green.500">
              {formatCurrency(stats.average)}
            </StatNumber>
          </Stat>
          <Stat
            bg={bgColor}
            p={4}
            borderRadius="lg"
            border="1px"
            borderColor={borderColor}
          >
            <StatLabel fontSize="sm">Total Count</StatLabel>
            <StatNumber fontSize="xl" color="purple.500">
              {stats.count}
            </StatNumber>
          </Stat>
        </SimpleGrid>

        {/* Filters and Search */}
        <Box
          bg={bgColor}
          p={6}
          borderRadius="xl"
          border="1px"
          borderColor={borderColor}
          boxShadow="sm"
        >
          <VStack spacing={4}>
            <HStack justify="space-between" w="full">
              <Text fontWeight="semibold">Filters & Search</Text>
              <HStack>
                <Button
                  size="sm"
                  leftIcon={<FiDownload />}
                  variant="outline"
                  colorScheme="blue"
                >
                  Export
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    setSearchTerm('');
                    setCategoryFilter('');
                    setSortBy('date');
                    setSortOrder('desc');
                  }}
                >
                  Reset
                </Button>
              </HStack>
            </HStack>
            
            <HStack spacing={4} w="full">
              <InputGroup flex={2}>
                <InputLeftElement pointerEvents="none">
                  <FiSearch color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Search expenses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
              
              <Select
                placeholder="All Categories"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                flex={1}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
              
              <Select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split('-');
                  setSortBy(field);
                  setSortOrder(order);
                }}
                flex={1}
              >
                <option value="date-desc">Date (Newest)</option>
                <option value="date-asc">Date (Oldest)</option>
                <option value="amount-desc">Amount (High to Low)</option>
                <option value="amount-asc">Amount (Low to High)</option>
                <option value="description-asc">Description (A-Z)</option>
                <option value="category-asc">Category (A-Z)</option>
              </Select>
            </HStack>
          </VStack>
        </Box>

        {/* Expenses Table */}
        <Box
          bg={bgColor}
          borderRadius="xl"
          border="1px"
          borderColor={borderColor}
          boxShadow="sm"
          overflow="hidden"
        >
          {filteredExpenses.length === 0 ? (
            <EmptyState
              title="No expenses found"
              description={searchTerm || categoryFilter 
                ? "Try adjusting your search or filter criteria"
                : "Start by adding your first expense"
              }
              actionLabel="Add Expense" // ✅ Fixed: Changed from actionText to actionLabel
              onAction={() => {/* Navigate to add expense */}}
            />
          ) : (
            <Table variant="simple">
              <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
                <Tr>
                  <Th 
                    cursor="pointer" 
                    onClick={() => handleSort('description')}
                    _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                  >
                    Description
                  </Th>
                  <Th 
                    cursor="pointer" 
                    onClick={() => handleSort('category')}
                    _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                  >
                    Category
                  </Th>
                  <Th 
                    cursor="pointer" 
                    onClick={() => handleSort('amount')}
                    _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                    isNumeric
                  >
                    Amount
                  </Th>
                  <Th 
                    cursor="pointer" 
                    onClick={() => handleSort('date')}
                    _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
                  >
                    Date
                  </Th>
                  <Th width="60px">Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {filteredExpenses.map((expense) => {
                  const IconComponent = categoryIcons[expense.category] || FiDollarSign;
                  const colorScheme = categoryColors[expense.category] || 'gray';
                  
                  return (
                    <Tr key={expense.id} _hover={{ bg: rowHoverBg }}>
                      <Td>
                        <HStack>
                          <Avatar
                            size="sm"
                            bg={`${colorScheme}.100`}
                            color={`${colorScheme}.600`}
                            icon={<IconComponent size="16" />}
                          />
                          <Text fontWeight="medium">{expense.description}</Text>
                        </HStack>
                      </Td>
                      <Td>
                        <Badge colorScheme={colorScheme} variant="subtle">
                          {expense.category}
                        </Badge>
                      </Td>
                      <Td isNumeric>
                        <Text fontWeight="bold" color={`${colorScheme}.500`}>
                          {formatCurrency(expense.amount)}
                        </Text>
                      </Td>
                      <Td>
                        <Text fontSize="sm" color="gray.600">
                          {formatDate(expense.date)}
                        </Text>
                      </Td>
                      <Td>
                        <Menu>
                          <MenuButton
                            as={IconButton}
                            icon={<FiMoreVertical />}
                            variant="ghost"
                            size="sm"
                          />
                          <MenuList>
                            <MenuItem icon={<FiEdit2 />}>
                              Edit
                            </MenuItem>
                            <MenuItem 
                              icon={<FiTrash2 />}
                              color="red.500"
                              onClick={() => handleDelete(expense)}
                            >
                              Delete
                            </MenuItem>
                          </MenuList>
                        </Menu>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          )}
        </Box>
      </VStack>

      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        title="Delete Expense"
        message={`Are you sure you want to delete "${selectedExpense?.description}"? This action cannot be undone.`}
      />
    </>
  );
};

export default ExpenseList;