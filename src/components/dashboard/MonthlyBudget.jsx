// import React from 'react';
// import {
//   Box,
//   Heading,
//   VStack,
//   HStack,
//   Text,
//   Progress,
//   Badge,
//   Button,
//   useColorModeValue,
//   CircularProgress,
//   CircularProgressLabel,
//   SimpleGrid,
//   Icon,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatArrow,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Input,
//   FormControl,
//   FormLabel,
//   Select,
// } from '@chakra-ui/react';
// import {
//   FiTrendingUp,
//   FiTrendingDown,
//   FiTarget,
//   FiEdit3,
//   FiPlus,
// } from 'react-icons/fi';
// import useExpenses from "../../hooks/useExpenses";
// import { formatCurrency } from '../../utils/formatters';

// const DEFAULT_BUDGETS = {
//   Food: 500,
//   Transportation: 200,
//   Housing: 1200,
//   Healthcare: 300,
//   Education: 150,
//   Other: 200,
// };

// const MonthlyBudget = () => {
//   const { expenses } = useExpenses();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [budgets, setBudgets] = React.useState(DEFAULT_BUDGETS);
//   const [editingCategory, setEditingCategory] = React.useState('');
//   const [budgetAmount, setBudgetAmount] = React.useState('');
  
//   const bgColor = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');

//   // Calculate current month expenses by category
//   const currentMonthExpenses = React.useMemo(() => {
//     const currentMonth = new Date().getMonth();
//     const currentYear = new Date().getFullYear();
    
//     const monthlyExpenses = expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate.getMonth() === currentMonth && 
//              expenseDate.getFullYear() === currentYear;
//     });

//     const categoryTotals = {};
//     monthlyExpenses.forEach(expense => {
//       categoryTotals[expense.category] = (categoryTotals[expense.category] || 0) + expense.amount;
//     });

//     return categoryTotals;
//   }, [expenses]);

//   const totalBudget = Object.values(budgets).reduce((sum, budget) => sum + budget, 0);
//   const totalSpent = Object.values(currentMonthExpenses).reduce((sum, spent) => sum + spent, 0);
//   const remainingBudget = totalBudget - totalSpent;
//   const budgetUsedPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

//   const handleEditBudget = (category) => {
//     setEditingCategory(category);
//     setBudgetAmount(budgets[category]?.toString() || '');
//     onOpen();
//   };

//   const handleSaveBudget = () => {
//     if (editingCategory && budgetAmount) {
//       setBudgets(prev => ({
//         ...prev,
//         [editingCategory]: parseFloat(budgetAmount)
//       }));
//       onClose();
//     }
//   };

//   const BudgetCategoryCard = ({ category, budget, spent = 0 }) => {
//     const percentage = budget > 0 ? (spent / budget) * 100 : 0;
//     const isOverBudget = percentage > 100;
//     const remaining = budget - spent;
    
//     const getProgressColor = () => {
//       if (percentage <= 50) return 'green';
//       if (percentage <= 80) return 'yellow';
//       return 'red';
//     };

//     return (
//       <Box
//         p={4}
//         borderRadius="lg"
//         border="1px"
//         borderColor={borderColor}
//         bg={bgColor}
//         position="relative"
//       >
//         <HStack justify="space-between" mb={3}>
//           <VStack align="start" spacing={1}>
//             <Text fontWeight="semibold" fontSize="sm">
//               {category}
//             </Text>
//             <Text fontSize="xs" color="gray.500">
//               {formatCurrency(spent)} of {formatCurrency(budget)}
//             </Text>
//           </VStack>
//           <Button
//             size="xs"
//             variant="ghost"
//             onClick={() => handleEditBudget(category)}
//           >
//             <FiEdit3 />
//           </Button>
//         </HStack>
        
//         <Progress
//           value={Math.min(percentage, 100)}
//           colorScheme={getProgressColor()}
//           size="md"
//           borderRadius="full"
//           mb={2}
//         />
        
//         <HStack justify="space-between">
//           <Text fontSize="xs" color={remaining >= 0 ? 'green.500' : 'red.500'}>
//             {remaining >= 0 ? 'Remaining' : 'Over by'}: {formatCurrency(Math.abs(remaining))}
//           </Text>
//           <Badge
//             size="sm"
//             colorScheme={isOverBudget ? 'red' : getProgressColor()}
//             variant="subtle"
//           >
//             {percentage.toFixed(0)}%
//           </Badge>
//         </HStack>
//       </Box>
//     );
//   };

//   return (
//     <>
//       <Box
//         bg={bgColor}
//         p={6}
//         borderRadius="xl"
//         border="1px"
//         borderColor={borderColor}
//         boxShadow="sm"
//       >
//         <HStack justify="space-between" mb={6}>
//           <Heading size="md" color="gray.700">
//             Monthly Budget
//           </Heading>
//           <Text fontSize="sm" color="gray.500">
//             {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
//           </Text>
//         </HStack>

//         {/* Budget Overview */}
//         <Box mb={6} p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
//             <Stat>
//               <StatLabel fontSize="xs">Total Budget</StatLabel>
//               <StatNumber fontSize="lg">{formatCurrency(totalBudget)}</StatNumber>
//             </Stat>
//             <Stat>
//               <StatLabel fontSize="xs">Total Spent</StatLabel>
//               <StatNumber fontSize="lg" color={budgetUsedPercentage > 100 ? 'red.500' : 'blue.500'}>
//                 {formatCurrency(totalSpent)}
//               </StatNumber>
//             </Stat>
//             <Stat>
//               <StatLabel fontSize="xs">Remaining</StatLabel>
//               <StatNumber fontSize="lg" color={remainingBudget >= 0 ? 'green.500' : 'red.500'}>
//                 <StatArrow type={remainingBudget >= 0 ? 'increase' : 'decrease'} />
//                 {formatCurrency(Math.abs(remainingBudget))}
//               </StatNumber>
//             </Stat>
//           </SimpleGrid>
          
//           <Box mt={4}>
//             <HStack justify="space-between" mb={2}>
//               <Text fontSize="sm" fontWeight="medium">Overall Progress</Text>
//               <Text fontSize="sm" color="gray.600">
//                 {budgetUsedPercentage.toFixed(1)}%
//               </Text>
//             </HStack>
//             <Progress
//               value={Math.min(budgetUsedPercentage, 100)}
//               colorScheme={budgetUsedPercentage > 100 ? 'red' : budgetUsedPercentage > 80 ? 'yellow' : 'green'}
//               size="lg"
//               borderRadius="full"
//             />
//           </Box>
//         </Box>

//         {/* Category Budgets */}
//         <VStack spacing={4}>
//           <HStack justify="space-between" w="full">
//             <Text fontWeight="semibold">Category Breakdown</Text>
//             <Button size="sm" leftIcon={<FiPlus />} colorScheme="blue" variant="ghost">
//               Add Category
//             </Button>
//           </HStack>
          
//           <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
//             {Object.entries(budgets).map(([category, budget]) => (
//               <BudgetCategoryCard
//                 key={category}
//                 category={category}
//                 budget={budget}
//                 spent={currentMonthExpenses[category] || 0}
//               />
//             ))}
//           </SimpleGrid>
//         </VStack>

//         {/* Budget Tips */}
//         <Box mt={6} p={4} bg="blue.50" borderRadius="lg" border="1px" borderColor="blue.200">
//           <HStack>
//             <Icon as={FiTarget} color="blue.500" />
//             <VStack align="start" spacing={1}>
//               <Text fontSize="sm" fontWeight="semibold" color="blue.700">
//                 Budget Tip
//               </Text>
//               <Text fontSize="xs" color="blue.600">
//                 {budgetUsedPercentage > 90 
//                   ? "You're approaching your budget limit. Consider reviewing your expenses."
//                   : budgetUsedPercentage > 50
//                   ? "You're on track! Keep monitoring your spending to stay within budget."
//                   : "Great job! You're well within your budget this month."
//                 }
//               </Text>
//             </VStack>
//           </HStack>
//         </Box>
//       </Box>

//       {/* Edit Budget Modal */}
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Edit Budget - {editingCategory}</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <FormLabel>Budget Amount</FormLabel>
//               <Input
//                 type="number"
//                 value={budgetAmount}
//                 onChange={(e) => setBudgetAmount(e.target.value)}
//                 placeholder="Enter budget amount"
//               />
//             </FormControl>
//             <HStack mt={4} spacing={3}>
//               <Button colorScheme="blue" onClick={handleSaveBudget}>
//                 Save Budget
//               </Button>
//               <Button variant="ghost" onClick={onClose}>
//                 Cancel
//               </Button>
//             </HStack>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default MonthlyBudget;




// import React from 'react';
// import {
//   Box,
//   Heading,
//   VStack,
//   HStack,
//   Text,
//   Progress,
//   Badge,
//   Button,
//   useColorModeValue,
//   SimpleGrid,
//   Icon,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatArrow,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Input,
//   FormControl,
//   FormLabel,
// } from '@chakra-ui/react';
// import {
//   FiTarget,
//   FiEdit3,
//   FiPlus,
// } from 'react-icons/fi';
// import useExpenses from '../../hooks/useExpenses';
// import { formatCurrency } from '../../utils/formatters';

// const DEFAULT_BUDGETS = {
//   Food: 500,
//   Transportation: 200,
//   Housing: 1200,
//   Healthcare: 300,
//   Education: 150,
//   Other: 200,
// };

// const MonthlyBudget = () => {
//   const { expenses = [] } = useExpenses() || {};
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [budgets, setBudgets] = React.useState(DEFAULT_BUDGETS);
//   const [editingCategory, setEditingCategory] = React.useState('');
//   const [budgetAmount, setBudgetAmount] = React.useState('');

//   const bgColor = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');

//   // Calculate current month expenses by category safely
//   const currentMonthExpenses = React.useMemo(() => {
//     try {
//       const now = new Date();
//       const currentMonth = now.getMonth();
//       const currentYear = now.getFullYear();

//       const monthlyExpenses = expenses.filter((expense) => {
//         if (!expense.date) return false;
//         const expenseDate = new Date(expense.date);
//         return (
//           expenseDate.getMonth() === currentMonth &&
//           expenseDate.getFullYear() === currentYear
//         );
//       });

//       const categoryTotals = {};
//       monthlyExpenses.forEach((expense) => {
//         const cat = expense.category || 'Other';
//         categoryTotals[cat] = (categoryTotals[cat] || 0) + (expense.amount || 0);
//       });

//       return categoryTotals;
//     } catch (error) {
//       console.error('Error calculating currentMonthExpenses:', error);
//       return {};
//     }
//   }, [expenses]);

//   const totalBudget = Object.values(budgets).reduce((sum, budget) => sum + budget, 0);
//   const totalSpent = Object.values(currentMonthExpenses).reduce((sum, spent) => sum + spent, 0);
//   const remainingBudget = totalBudget - totalSpent;
//   const budgetUsedPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

//   const handleEditBudget = (category) => {
//     setEditingCategory(category);
//     setBudgetAmount(budgets[category]?.toString() || '');
//     onOpen();
//   };

//   const handleSaveBudget = () => {
//     if (editingCategory && budgetAmount !== '') {
//       setBudgets((prev) => ({
//         ...prev,
//         [editingCategory]: parseFloat(budgetAmount),
//       }));
//       onClose();
//     }
//   };

//   const BudgetCategoryCard = ({ category, budget, spent = 0 }) => {
//     const percentage = budget > 0 ? (spent / budget) * 100 : 0;
//     const isOverBudget = percentage > 100;
//     const remaining = budget - spent;

//     const getProgressColor = () => {
//       if (percentage <= 50) return 'green';
//       if (percentage <= 80) return 'yellow';
//       return 'red';
//     };

//     return (
//       <Box
//         p={4}
//         borderRadius="lg"
//         border="1px"
//         borderColor={borderColor}
//         bg={bgColor}
//         position="relative"
//       >
//         <HStack justify="space-between" mb={3}>
//           <VStack align="start" spacing={1}>
//             <Text fontWeight="semibold" fontSize="sm">
//               {category}
//             </Text>
//             <Text fontSize="xs" color="gray.500">
//               {formatCurrency(spent)} of {formatCurrency(budget)}
//             </Text>
//           </VStack>
//           <Button size="xs" variant="ghost" onClick={() => handleEditBudget(category)}>
//             <FiEdit3 />
//           </Button>
//         </HStack>

//         <Progress
//           value={Math.min(percentage, 100)}
//           colorScheme={getProgressColor()}
//           size="md"
//           borderRadius="full"
//           mb={2}
//         />

//         <HStack justify="space-between">
//           <Text fontSize="xs" color={remaining >= 0 ? 'green.500' : 'red.500'}>
//             {remaining >= 0 ? 'Remaining' : 'Over by'}: {formatCurrency(Math.abs(remaining))}
//           </Text>
//           <Badge size="sm" colorScheme={isOverBudget ? 'red' : getProgressColor()} variant="subtle">
//             {percentage.toFixed(0)}%
//           </Badge>
//         </HStack>
//       </Box>
//     );
//   };

//   return (
//     <>
//       <Box
//         bg={bgColor}
//         p={6}
//         borderRadius="xl"
//         border="1px"
//         borderColor={borderColor}
//         boxShadow="sm"
//       >
//         <HStack justify="space-between" mb={6}>
//           <Heading size="md" color="gray.700">
//             Monthly Budget
//           </Heading>
//           <Text fontSize="sm" color="gray.500">
//             {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
//           </Text>
//         </HStack>

//         {/* Budget Overview */}
//         <Box mb={6} p={4} bg={useColorModeValue('gray.50', 'gray.700')} borderRadius="lg">
//           <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
//             <Stat>
//               <StatLabel fontSize="xs">Total Budget</StatLabel>
//               <StatNumber fontSize="lg">{formatCurrency(totalBudget)}</StatNumber>
//             </Stat>
//             <Stat>
//               <StatLabel fontSize="xs">Total Spent</StatLabel>
//               <StatNumber
//                 fontSize="lg"
//                 color={budgetUsedPercentage > 100 ? 'red.500' : 'blue.500'}
//               >
//                 {formatCurrency(totalSpent)}
//               </StatNumber>
//             </Stat>
//             <Stat>
//               <StatLabel fontSize="xs">Remaining</StatLabel>
//               <StatNumber
//                 fontSize="lg"
//                 color={remainingBudget >= 0 ? 'green.500' : 'red.500'}
//               >
//                 <StatArrow type={remainingBudget >= 0 ? 'increase' : 'decrease'} />
//                 {formatCurrency(Math.abs(remainingBudget))}
//               </StatNumber>
//             </Stat>
//           </SimpleGrid>

//           <Box mt={4}>
//             <HStack justify="space-between" mb={2}>
//               <Text fontSize="sm" fontWeight="medium">Overall Progress</Text>
//               <Text fontSize="sm" color="gray.600">{budgetUsedPercentage.toFixed(1)}%</Text>
//             </HStack>
//             <Progress
//               value={Math.min(budgetUsedPercentage, 100)}
//               colorScheme={
//                 budgetUsedPercentage > 100
//                   ? 'red'
//                   : budgetUsedPercentage > 80
//                   ? 'yellow'
//                   : 'green'
//               }
//               size="lg"
//               borderRadius="full"
//             />
//           </Box>
//         </Box>

//         {/* Category Budgets */}
//         <VStack spacing={4}>
//           <HStack justify="space-between" w="full">
//             <Text fontWeight="semibold">Category Breakdown</Text>
//             <Button size="sm" leftIcon={<FiPlus />} colorScheme="blue" variant="ghost">
//               Add Category
//             </Button>
//           </HStack>

//           <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full">
//             {Object.entries(budgets).map(([category, budget]) => (
//               <BudgetCategoryCard
//                 key={category}
//                 category={category}
//                 budget={budget}
//                 spent={currentMonthExpenses[category] || 0}
//               />
//             ))}
//           </SimpleGrid>
//         </VStack>

//         {/* Budget Tips */}
//         <Box mt={6} p={4} bg="blue.50" borderRadius="lg" border="1px" borderColor="blue.200">
//           <HStack>
//             <Icon as={FiTarget} color="blue.500" />
//             <VStack align="start" spacing={1}>
//               <Text fontSize="sm" fontWeight="semibold" color="blue.700">
//                 Budget Tip
//               </Text>
//               <Text fontSize="xs" color="blue.600">
//                 {budgetUsedPercentage > 90
//                   ? "You're approaching your budget limit. Consider reviewing your expenses."
//                   : budgetUsedPercentage > 50
//                   ? "You're on track! Keep monitoring your spending to stay within budget."
//                   : "Great job! You're well within your budget this month."
//                 }
//               </Text>
//             </VStack>
//           </HStack>
//         </Box>
//       </Box>

//       {/* Edit Budget Modal */}
//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Edit Budget - {editingCategory}</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormControl>
//               <FormLabel>Budget Amount</FormLabel>
//               <Input
//                 type="number"
//                 value={budgetAmount}
//                 onChange={(e) => setBudgetAmount(e.target.value)}
//                 placeholder="Enter budget amount"
//               />
//             </FormControl>
//             <HStack mt={4} spacing={3}>
//               <Button colorScheme="blue" onClick={handleSaveBudget}>
//                 Save Budget
//               </Button>
//               <Button variant="ghost" onClick={onClose}>
//                 Cancel
//               </Button>
//             </HStack>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </>
//   );
// };

// export default MonthlyBudget;


import React, { useState } from 'react';
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
  ModalFooter,
  useDisclosure,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  Skeleton,
  SkeletonText
} from '@chakra-ui/react';
import {
  FiTarget,
  FiEdit3,
  FiPlus,
} from 'react-icons/fi';
import {
  MdAccountBalanceWallet,
  MdCategory,
  MdSettings
} from 'react-icons/md';
import { useBudgetContext } from '../../context/BudgetContext';
import { useExpenseContext } from '../../context/ExpenseContext';
import { formatCurrency } from '../../utils/formatters';

const MonthlyBudget = () => {
  const {
    budgets,
    monthlyBudgetLimit,
    loading: budgetLoading,
    updateCategoryBudget,
    addNewCategory,
    getTotalBudget
  } = useBudgetContext();

  const { getExpensesByCategory } = useExpenseContext();
  
  const [editingCategory, setEditingCategory] = useState('');
  const [budgetAmount, setBudgetAmount] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryAmount, setNewCategoryAmount] = useState('');
  
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  // Get current month expenses by category
  const currentMonthExpenses = getExpensesByCategory();
  
  const totalBudget = getTotalBudget();
  const totalSpent = Object.values(currentMonthExpenses).reduce((sum, spent) => sum + spent, 0);
  const remainingBudget = totalBudget - totalSpent;
  const budgetUsedPercentage = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  const handleEditBudget = (category) => {
    setEditingCategory(category);
    setBudgetAmount(budgets[category]?.toString() || '');
    onEditOpen();
  };

  const handleSaveBudget = async () => {
    if (editingCategory && budgetAmount !== '') {
      await updateCategoryBudget(editingCategory, budgetAmount);
      onEditClose();
      setEditingCategory('');
      setBudgetAmount('');
      toast({
        title: 'Budget Updated',
        description: `${editingCategory} budget updated successfully!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleAddCategory = async () => {
    if (newCategoryName && newCategoryAmount) {
      const success = await addNewCategory(newCategoryName, newCategoryAmount);
      if (success) {
        setNewCategoryName('');
        setNewCategoryAmount('');
        onAddClose();
        toast({
          title: 'Category Added',
          description: `${newCategoryName} category added successfully!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Category already exists or invalid name!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
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
        transition="all 0.2s"
        _hover={{ shadow: 'md' }}
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
          <IconButton
            size="xs"
            icon={<FiEdit3 />}
            variant="ghost"
            onClick={() => handleEditBudget(category)}
            aria-label={`Edit ${category} budget`}
          />
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
          <Badge size="sm" colorScheme={isOverBudget ? 'red' : getProgressColor()} variant="subtle">
            {percentage.toFixed(0)}%
          </Badge>
        </HStack>
      </Box>
    );
  };

  if (budgetLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton height="20px" width="200px" />
        </CardHeader>
        <CardBody>
          <VStack spacing={4}>
            <Skeleton height="60px" width="100%" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </VStack>
        </CardBody>
      </Card>
    );
  }

  return (
    <>
      <Card
        boxShadow="lg"
        borderRadius="xl"
        overflow="hidden"
      >
        <CardHeader bg={useColorModeValue('blue.50', 'blue.900')} pb={4}>
          <HStack justify="space-between">
            <HStack>
              <Icon as={MdAccountBalanceWallet} boxSize={6} color="blue.500" />
              <Heading size="md" color={useColorModeValue('blue.700', 'blue.200')}>
                Monthly Budget
              </Heading>
            </HStack>
            <VStack align="end" spacing={0}>
              <Text fontSize="sm" color="gray.500">
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </Text>
              <Button size="xs" variant="ghost" rightIcon={<MdSettings />}>
                Settings
              </Button>
            </VStack>
          </HStack>
        </CardHeader>

        <CardBody>
          {/* Budget Overview */}
          <Box mb={6} p={4} bg={cardBg} borderRadius="lg">
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mb={4}>
              <Stat>
                <StatLabel fontSize="xs">Monthly Limit</StatLabel>
                <StatNumber fontSize="lg" color="blue.500">
                  {formatCurrency(monthlyBudgetLimit)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel fontSize="xs">Total Spent</StatLabel>
                <StatNumber
                  fontSize="lg"
                  color={budgetUsedPercentage > 100 ? 'red.500' : 'blue.500'}
                >
                  {formatCurrency(totalSpent)}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel fontSize="xs">Remaining</StatLabel>
                <StatNumber
                  fontSize="lg"
                  color={remainingBudget >= 0 ? 'green.500' : 'red.500'}
                >
                  <StatArrow type={remainingBudget >= 0 ? 'increase' : 'decrease'} />
                  {formatCurrency(Math.abs(remainingBudget))}
                </StatNumber>
              </Stat>
            </SimpleGrid>

            {/* Overall Progress */}
            <Box>
              <HStack justify="space-between" mb={2}>
                <Text fontSize="sm" fontWeight="medium">Overall Progress</Text>
                <Text fontSize="sm" color="gray.600">{budgetUsedPercentage.toFixed(1)}%</Text>
              </HStack>
              <Progress
                value={Math.min(budgetUsedPercentage, 100)}
                colorScheme={
                  budgetUsedPercentage > 100
                    ? 'red'
                    : budgetUsedPercentage > 80
                    ? 'yellow'
                    : 'green'
                }
                size="lg"
                borderRadius="full"
              />
            </Box>

            {/* Budget vs Category Total Warning */}
            {totalBudget > monthlyBudgetLimit && (
              <Alert status="warning" mt={4} borderRadius="md">
                <AlertIcon />
                <AlertTitle fontSize="sm">Budget Mismatch!</AlertTitle>
                <AlertDescription fontSize="xs">
                  Category budgets ({formatCurrency(totalBudget)}) exceed monthly limit by {formatCurrency(totalBudget - monthlyBudgetLimit)}
                </AlertDescription>
              </Alert>
            )}
          </Box>

          {/* Category Budgets */}
          <VStack spacing={4}>
            <HStack justify="space-between" w="full">
              <HStack>
                <Icon as={MdCategory} color="gray.500" />
                <Text fontWeight="semibold">Category Breakdown</Text>
              </HStack>
              <Button 
                size="sm" 
                leftIcon={<FiPlus />} 
                colorScheme="green" 
                variant="ghost"
                onClick={onAddOpen}
              >
                Add Category
              </Button>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4} w="full">
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
        </CardBody>
      </Card>

      {/* Edit Budget Modal */}
      <Modal isOpen={isEditOpen} onClose={onEditClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Budget - {editingCategory}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Budget Amount</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.400">
                  ₹
                </InputLeftElement>
                <Input
                  type="number"
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(e.target.value)}
                  placeholder="Enter budget amount"
                />
              </InputGroup>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSaveBudget}>
              Save Budget
            </Button>
            <Button variant="ghost" onClick={onEditClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Add Category Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Category Name</FormLabel>
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Budget Amount</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.400">
                    ₹
                  </InputLeftElement>
                  <Input
                    type="number"
                    value={newCategoryAmount}
                    onChange={(e) => setNewCategoryAmount(e.target.value)}
                    placeholder="Enter budget amount"
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={handleAddCategory}>
              Add Category
            </Button>
            <Button variant="ghost" onClick={onAddClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MonthlyBudget;