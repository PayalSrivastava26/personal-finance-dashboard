import React from 'react';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Text,
  Progress,
  Badge,
  Button,
  useColorModeValue,
  CircularProgress,
  CircularProgressLabel,
  SimpleGrid,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  StatArrow,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  Select,
} from '@chakra-ui/react';
import {
  FiTrendingUp,
  FiTrendingDown,
  FiTarget,
  FiEdit3,
  FiPlus,
} from 'react-icons/fi';
import useExpenses from "../../hooks/useExpenses";
import { formatCurrency } from '../../utils/formatters';

const DEFAULT_BUDGETS = {
  Food: 500,
  Transportation: 200,
  Housing: 1200,
  Healthcare: 300,
  Education: 150,
  Other: 200,
};

const MonthlyBudget = () => {
  const { expenses } = useExpenses();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [budgets, setBudgets] = React.useState(DEFAULT_BUDGETS);
  const [editingCategory, setEditingCategory] = React.useState('');
  const [budgetAmount, setBudgetAmount] = React.useState('');
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Calculate current month expenses by category
  const currentMonthExpenses = React.useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const monthlyExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });

    const categoryTotals = {};
    monthlyExpenses.forEach(expense => {
      categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
    });

    return categoryTotals;
  }, [expenses]);

  const totalBudget = Object.values(budgets).reduce((sum, budget) => sum + budget, 0);
  const totalSpent = Object.values(currentMonthExpenses).reduce((sum, spent) => sum + spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetUsedPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const handleEditBudget = (category) => {
    setEditingCategory(category);
    setBudgetAmount(budgets[category]?.toString() || '');
    onOpen();
  };

  const handleSaveBudget = () => {
    if (editingCategory && budgetAmount) {
      setBudgets(prev => ({
        ...prev,
        [editingCategory]: parseFloat(budgetAmount)
      }));
      onClose();
    }
  };

  const BudgetCategoryCard = ({ category, budget, spent = 0 }) => {
    const percentage = budget > 0 ? (spent / budget) * 100 : 0;
    const isOverBudget = percentage > 100;
    const remaining = budget - spent;
    
    const getProgressColor = () => {
      if (percentage <= 50) return 'green';
      if (percentage <= 80) return 'yellow';
      return 'red';
    };

    return (
      <Box
        p={4}
        borderRadius="lg"
        border="1px"
        borderColor={borderColor}
        bg={bgColor}
        position="relative"
      >
        <HStack justify="space-between" mb={3}>
          <VStack align="start" spacing={1}>
            <Text fontWeight="semibold" fontSize="sm">
              {category}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {formatCurrency(spent)} of {formatCurrency(budget)}
            </Text>
          </VStack>
          <Button
            size="xs"
            variant="ghost"
            onClick={() => handleEditBudget(category)}
          >
            <FiEdit3 />
          </Button>
        </HStack>
        
        <Progress
          value={Math.min(percentage, 100)}
          colorScheme={getProgressColor()}
          size="md"
          borderRadius="full"
          mb={2}
        />
        
        <HStack justify="space-between">
          <Text fontSize="xs" color={remaining >= 0 ? 'green.500' : 'red.500'}>
            {remaining >= 0 ? 'Remaining' : 'Over by'}: {formatCurrency(Math.abs(remaining))}
          </Text>
          <Badge
            size="sm"
            colorScheme={isOverBudget ? 'red' : getProgressColor()}
            variant="subtle"
          >
            {percentage.toFixed(0)}%
          </Badge>
        </HStack>
      </Box>
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
            Monthly Budget
          </Heading>
          <Text fontSize="sm" color="gray.500">
            {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
        </HStack>

        {/* Budget Overview */}
        <Box mb={6} p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
            <Stat>
              <StatLabel fontSize="xs">Total Budget</StatLabel>
              <StatNumber fontSize="lg">{formatCurrency(totalBudget)}</StatNumber>
            </Stat>
            <Stat>
              <StatLabel fontSize="xs">Total Spent</StatLabel>
              <StatNumber fontSize="lg" color={budgetUsedPercentage > 100 ? 'red.500' : 'blue.500'}>
                {formatCurrency(totalSpent)}
              </StatNumber>
            </Stat>
            <Stat>
              <StatLabel fontSize="xs">Remaining</StatLabel>
              <StatNumber fontSize="lg" color={remainingBudget >= 0 ? 'green.500' : 'red.500'}>
                <StatArrow type={remainingBudget >= 0 ? 'increase' : 'decrease'} />
                {formatCurrency(Math.abs(remainingBudget))}
              </StatNumber>
            </Stat>
          </SimpleGrid>
          
          <Box mt={4}>
            <HStack justify="space-between" mb={2}>
              <Text fontSize="sm" fontWeight="medium">Overall Progress</Text>
              <Text fontSize="sm" color="gray.600">
                {budgetUsedPercentage.toFixed(1)}%
              </Text>
            </HStack>
            <Progress
              value={Math.min(budgetUsedPercentage, 100)}
              colorScheme={budgetUsedPercentage > 100 ? 'red' : budgetUsedPercentage > 80 ? 'yellow' : 'green'}
              size="lg"
              borderRadius="full"
            />
          </Box>
        </Box>

        {/* Category Budgets */}
        <VStack spacing={4}>
          <HStack justify="space-between" w="full">
            <Text fontWeight="semibold">Category Breakdown</Text>
            <Button size="sm" leftIcon={<FiPlus />} colorScheme="blue" variant="ghost">
              Add Category
            </Button>
          </HStack>
          
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
            {Object.entries(budgets).map(([category, budget]) => (
              <BudgetCategoryCard
                key={category}
                category={category}
                budget={budget}
                spent={currentMonthExpenses[category] || 0}
              />
            ))}
          </SimpleGrid>
        </VStack>

        {/* Budget Tips */}
        <Box mt={6} p={4} bg="blue.50" borderRadius="lg" border="1px" borderColor="blue.200">
          <HStack>
            <Icon as={FiTarget} color="blue.500" />
            <VStack align="start" spacing={1}>
              <Text fontSize="sm" fontWeight="semibold" color="blue.700">
                Budget Tip
              </Text>
              <Text fontSize="xs" color="blue.600">
                {budgetUsedPercentage > 90 
                  ? "You're approaching your budget limit. Consider reviewing your expenses."
                  : budgetUsedPercentage > 50
                  ? "You're on track! Keep monitoring your spending to stay within budget."
                  : "Great job! You're well within your budget this month."
                }
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Box>

      {/* Edit Budget Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Budget - {editingCategory}</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Budget Amount</FormLabel>
              <Input
                type="number"
                value={budgetAmount}
                onChange={(e) => setBudgetAmount(e.target.value)}
                placeholder="Enter budget amount"
              />
            </FormControl>
            <HStack mt={4} spacing={3}>
              <Button colorScheme="blue" onClick={handleSaveBudget}>
                Save Budget
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </HStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MonthlyBudget;