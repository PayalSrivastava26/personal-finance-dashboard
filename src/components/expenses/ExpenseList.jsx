// import React, { useEffect, useState } from 'react';
// import {
//   Box,
//   Heading,
//   VStack,
//   HStack,
//   Text,
//   Input,
//   Select,
//   Button,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Badge,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   useColorModeValue,
//   InputGroup,
//   InputLeftElement,
//   Avatar,
//   useDisclosure,
//   Stat,
//   StatLabel,
//   StatNumber,
//   SimpleGrid,
//   Spinner,
//   Center,
//   Alert,
//   AlertIcon,
// } from '@chakra-ui/react';
// import {
//   FiSearch,
//   FiMoreVertical,
//   FiEdit2,
//   FiTrash2,
//   FiDownload,
//   FiShoppingCart,
//   FiTruck,
//   FiHome,
//   FiHeart,
//   FiBook,
//   FiDollarSign,
// } from 'react-icons/fi';

// // Firebase imports
// import { collection, query, where, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
// import { db } from '../../config/firebase'; // Fixed path based on your structure

// import DeleteConfirmation from '../common/DeleteConfirmation';
// import EmptyState from '../common/EmptyState';

// const categoryIcons = {
//   'Food & Dining': FiShoppingCart,
//   Transportation: FiTruck,
//   Housing: FiHome,
//   Healthcare: FiHeart,
//   Education: FiBook,
//   Other: FiDollarSign,
// };

// const categoryColors = {
//   'Food & Dining': 'green',
//   Transportation: 'blue',
//   Housing: 'purple',
//   Healthcare: 'red',
//   Education: 'orange',
//   Other: 'gray',
// };

// // Utility functions (you might want to move these to a separate utils file)
// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//   }).format(amount);
// };

// const formatDate = (dateString) => {
//   return new Date(dateString).toLocaleDateString('en-IN', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });
// };

// const ExpenseList = () => {
//   // State for expenses and Firebase
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // UI state
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedExpense, setSelectedExpense] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [sortBy, setSortBy] = useState('date');
//   const [sortOrder, setSortOrder] = useState('desc');
  
//   const bgColor = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const rowHoverBg = useColorModeValue('gray.50', 'gray.700');

//   // Replace with actual user ID from authentication
//   const userId = "demoUser123";

//   // Fetch expenses from Firestore
//   useEffect(() => {
//     const q = query(
//       collection(db, 'expenses'), 
//       where('userId', '==', userId)
//     );
    
//     const unsubscribe = onSnapshot(q, 
//       (querySnapshot) => {
//         const expensesData = [];
//         querySnapshot.forEach((doc) => {
//           expensesData.push({
//             id: doc.id,
//             ...doc.data()
//           });
//         });
//         setExpenses(expensesData);
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Error fetching expenses:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, [userId]);

//   // Delete expense from Firestore
//   const deleteExpense = async (expenseId) => {
//     try {
//       await deleteDoc(doc(db, 'expenses', expenseId));
//       console.log("Expense deleted successfully");
//     } catch (err) {
//       console.error("Error deleting expense:", err);
//       setError(err.message);
//     }
//   };

//   // Filter and sort expenses
//   const filteredExpenses = React.useMemo(() => {
//     let filtered = expenses.filter(expense => {
//       const matchesSearch = expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            expense.title?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = !categoryFilter || expense.category === categoryFilter;
//       return matchesSearch && matchesCategory;
//     });

//     // Sort expenses
//     filtered.sort((a, b) => {
//       let comparison = 0;
      
//       switch (sortBy) {
//         case 'date':
//           comparison = new Date(a.date) - new Date(b.date);
//           break;
//         case 'amount':
//           comparison = a.amount - b.amount;
//           break;
//         case 'description':
//           comparison = (a.description || a.title || '').localeCompare(b.description || b.title || '');
//           break;
//         case 'category':
//           comparison = (a.category || '').localeCompare(b.category || '');
//           break;
//         default:
//           comparison = 0;
//       }
      
//       return sortOrder === 'asc' ? comparison : -comparison;
//     });

//     return filtered;
//   }, [expenses, searchTerm, categoryFilter, sortBy, sortOrder]);

//   // Calculate statistics
//   const stats = React.useMemo(() => {
//     const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
//     const average = filteredExpenses.length > 0 ? total / filteredExpenses.length : 0;
//     const thisMonth = filteredExpenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       const now = new Date();
//       return expenseDate.getMonth() === now.getMonth() && 
//              expenseDate.getFullYear() === now.getFullYear();
//     }).reduce((sum, expense) => sum + expense.amount, 0);

//     return { total, average, thisMonth, count: filteredExpenses.length };
//   }, [filteredExpenses]);

//   const handleDelete = (expense) => {
//     setSelectedExpense(expense);
//     onOpen();
//   };

//   const confirmDelete = () => {
//     if (selectedExpense) {
//       deleteExpense(selectedExpense.id);
//       setSelectedExpense(null);
//       onClose();
//     }
//   };

//   const handleSort = (field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('desc');
//     }
//   };

//   const categories = [...new Set(expenses.map(expense => expense.category).filter(Boolean))];

//   // Loading state
//   if (loading) {
//     return (
//       <Center h="400px">
//         <VStack>
//           <Spinner size="xl" color="blue.500" />
//           <Text>Loading your expenses...</Text>
//         </VStack>
//       </Center>
//     );
//   }

//   // Error state
//   if (error) {
//     return (
//       <Alert status="error">
//         <AlertIcon />
//         Error loading expenses: {error}
//       </Alert>
//     );
//   }

//   return (
//     <>
//       <VStack spacing={6} align="stretch">
//         {/* Page Header */}
//         <Box>
//           <Heading size="lg" mb={2}>
//             Expense History
//           </Heading>
//           <Text color="gray.600">
//             View and manage all your expenses
//           </Text>
//         </Box>

//         {/* Statistics Cards */}
//         <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
//           <Stat
//             bg={bgColor}
//             p={4}
//             borderRadius="lg"
//             border="1px"
//             borderColor={borderColor}
//           >
//             <StatLabel fontSize="sm">Total Expenses</StatLabel>
//             <StatNumber fontSize="xl" color="red.500">
//               {formatCurrency(stats.total)}
//             </StatNumber>
//           </Stat>
//           <Stat
//             bg={bgColor}
//             p={4}
//             borderRadius="lg"
//             border="1px"
//             borderColor={borderColor}
//           >
//             <StatLabel fontSize="sm">This Month</StatLabel>
//             <StatNumber fontSize="xl" color="blue.500">
//               {formatCurrency(stats.thisMonth)}
//             </StatNumber>
//           </Stat>
//           <Stat
//             bg={bgColor}
//             p={4}
//             borderRadius="lg"
//             border="1px"
//             borderColor={borderColor}
//           >
//             <StatLabel fontSize="sm">Average</StatLabel>
//             <StatNumber fontSize="xl" color="green.500">
//               {formatCurrency(stats.average)}
//             </StatNumber>
//           </Stat>
//           <Stat
//             bg={bgColor}
//             p={4}
//             borderRadius="lg"
//             border="1px"
//             borderColor={borderColor}
//           >
//             <StatLabel fontSize="sm">Total Count</StatLabel>
//             <StatNumber fontSize="xl" color="purple.500">
//               {stats.count}
//             </StatNumber>
//           </Stat>
//         </SimpleGrid>

//         {/* Filters and Search */}
//         <Box
//           bg={bgColor}
//           p={6}
//           borderRadius="xl"
//           border="1px"
//           borderColor={borderColor}
//           boxShadow="sm"
//         >
//           <VStack spacing={4}>
//             <HStack justify="space-between" w="full">
//               <Text fontWeight="semibold">Filters & Search</Text>
//               <HStack>
//                 <Button
//                   size="sm"
//                   leftIcon={<FiDownload />}
//                   variant="outline"
//                   colorScheme="blue"
//                 >
//                   Export
//                 </Button>
//                 <Button
//                   size="sm"
//                   onClick={() => {
//                     setSearchTerm('');
//                     setCategoryFilter('');
//                     setSortBy('date');
//                     setSortOrder('desc');
//                   }}
//                 >
//                   Reset
//                 </Button>
//               </HStack>
//             </HStack>
            
//             <HStack spacing={4} w="full">
//               <InputGroup flex={2}>
//                 <InputLeftElement pointerEvents="none">
//                   <FiSearch color="gray.400" />
//                 </InputLeftElement>
//                 <Input
//                   placeholder="Search expenses..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                 />
//               </InputGroup>
              
//               <Select
//                 placeholder="All Categories"
//                 value={categoryFilter}
//                 onChange={(e) => setCategoryFilter(e.target.value)}
//                 flex={1}
//               >
//                 {categories.map(category => (
//                   <option key={category} value={category}>
//                     {category}
//                   </option>
//                 ))}
//               </Select>
              
//               <Select
//                 value={`${sortBy}-${sortOrder}`}
//                 onChange={(e) => {
//                   const [field, order] = e.target.value.split('-');
//                   setSortBy(field);
//                   setSortOrder(order);
//                 }}
//                 flex={1}
//               >
//                 <option value="date-desc">Date (Newest)</option>
//                 <option value="date-asc">Date (Oldest)</option>
//                 <option value="amount-desc">Amount (High to Low)</option>
//                 <option value="amount-asc">Amount (Low to High)</option>
//                 <option value="description-asc">Description (A-Z)</option>
//                 <option value="category-asc">Category (A-Z)</option>
//               </Select>
//             </HStack>
//           </VStack>
//         </Box>

//         {/* Expenses Table */}
//         <Box
//           bg={bgColor}
//           borderRadius="xl"
//           border="1px"
//           borderColor={borderColor}
//           boxShadow="sm"
//           overflow="hidden"
//         >
//           {filteredExpenses.length === 0 ? (
//             <EmptyState
//               title="No expenses found"
//               description={searchTerm || categoryFilter 
//                 ? "Try adjusting your search or filter criteria"
//                 : "Start by adding your first expense"
//               }
//               actionLabel="Add Expense"
//               onAction={() => {/* Navigate to add expense */}}
//             />
//           ) : (
//             <Table variant="simple">
//               <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
//                 <Tr>
//                   <Th 
//                     cursor="pointer" 
//                     onClick={() => handleSort('description')}
//                     _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
//                   >
//                     Description
//                   </Th>
//                   <Th 
//                     cursor="pointer" 
//                     onClick={() => handleSort('category')}
//                     _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
//                   >
//                     Category
//                   </Th>
//                   <Th 
//                     cursor="pointer" 
//                     onClick={() => handleSort('amount')}
//                     _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
//                     isNumeric
//                   >
//                     Amount
//                   </Th>
//                   <Th 
//                     cursor="pointer" 
//                     onClick={() => handleSort('date')}
//                     _hover={{ bg: useColorModeValue('gray.100', 'gray.600') }}
//                   >
//                     Date
//                   </Th>
//                   <Th width="60px">Actions</Th>
//                 </Tr>
//               </Thead>
//               <Tbody>
//                 {filteredExpenses.map((expense) => {
//                   const IconComponent = categoryIcons[expense.category] || FiDollarSign;
//                   const colorScheme = categoryColors[expense.category] || 'gray';
                  
//                   return (
//                     <Tr key={expense.id} _hover={{ bg: rowHoverBg }}>
//                       <Td>
//                         <HStack>
//                           <Avatar
//                             size="sm"
//                             bg={`${colorScheme}.100`}
//                             color={`${colorScheme}.600`}
//                             icon={<IconComponent size="16" />}
//                           />
//                           <VStack align="start" spacing={0}>
//                             <Text fontWeight="medium">
//                               {expense.title || expense.description}
//                             </Text>
//                             {expense.description && expense.title && (
//                               <Text fontSize="sm" color="gray.500">
//                                 {expense.description}
//                               </Text>
//                             )}
//                           </VStack>
//                         </HStack>
//                       </Td>
//                       <Td>
//                         <Badge colorScheme={colorScheme} variant="subtle">
//                           {expense.category}
//                         </Badge>
//                       </Td>
//                       <Td isNumeric>
//                         <Text fontWeight="bold" color={`${colorScheme}.500`}>
//                           {formatCurrency(expense.amount)}
//                         </Text>
//                       </Td>
//                       <Td>
//                         <Text fontSize="sm" color="gray.600">
//                           {formatDate(expense.date)}
//                         </Text>
//                       </Td>
//                       <Td>
//                         <Menu>
//                           <MenuButton
//                             as={IconButton}
//                             icon={<FiMoreVertical />}
//                             variant="ghost"
//                             size="sm"
//                           />
//                           <MenuList>
//                             <MenuItem icon={<FiEdit2 />}>
//                               Edit
//                             </MenuItem>
//                             <MenuItem 
//                               icon={<FiTrash2 />}
//                               color="red.500"
//                               onClick={() => handleDelete(expense)}
//                             >
//                               Delete
//                             </MenuItem>
//                           </MenuList>
//                         </Menu>
//                       </Td>
//                     </Tr>
//                   );
//                 })}
//               </Tbody>
//             </Table>
//           )}
//         </Box>
//       </VStack>

//       <DeleteConfirmation
//         isOpen={isOpen}
//         onClose={onClose}
//         onConfirm={confirmDelete}
//         title="Delete Expense"
//         message={`Are you sure you want to delete "${selectedExpense?.title || selectedExpense?.description}"? This action cannot be undone.`}
//       />
//     </>
//   );
// };

// export default ExpenseList;
// import React, { useState, useRef, useEffect, useCallback, useId, useMemo, useContext } from 'react';
// import {
//   Box,
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Text,
//   Badge,
//   IconButton,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   useDisclosure,
//   Spinner,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
//   Input,
//   Select,
//   HStack,
//   VStack,
//   Button,
//   useToast,
//   Heading,
//   SimpleGrid,
//   Stat,
//   StatLabel,
//   StatNumber,
//   InputGroup,
//   InputLeftElement,
//   Avatar,
//   Center,
//   useColorModeValue
// } from '@chakra-ui/react';
// import {
//   FiSearch,
//   FiMoreVertical,
//   FiEdit2,
//   FiTrash2,
//   FiDownload,
//   FiShoppingCart,
//   FiTruck,
//   FiHome,
//   FiHeart,
//   FiBook,
//   FiDollarSign,
// } from 'react-icons/fi';
// import { useExpenseContext } from '../../context/ExpenseContext';
// import DeleteConfirmation from '../common/DeleteConfirmation';
// import EmptyState from '../common/EmptyState';

// const categoryIcons = {
//   'Food & Dining': FiShoppingCart,
//   'Food': FiShoppingCart,
//   Transportation: FiTruck,
//   Housing: FiHome,
//   Healthcare: FiHeart,
//   Education: FiBook,
//   Other: FiDollarSign,
// };

// const categoryColors = {
//   'Food & Dining': 'green',
//   'Food': 'green', 
//   Transportation: 'blue',
//   Housing: 'purple',
//   Healthcare: 'red',
//   Education: 'orange',
//   Other: 'gray',
// };

// // Utility functions
// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-IN', {
//     style: 'currency',
//     currency: 'INR',
//   }).format(amount);
// };

// const formatDate = (dateString) => {
//   return new Date(dateString).toLocaleDateString('en-IN', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });
// };

// const ExpenseList = () => {
//   // All useState hooks at the top - MAINTAIN CONSISTENT ORDER
//   const [searchTerm, setSearchTerm] = useState('');
//   const [categoryFilter, setCategoryFilter] = useState('');
//   const [sortBy, setSortBy] = useState('date');
//   const [sortOrder, setSortOrder] = useState('desc');
//   const [selectedExpense, setSelectedExpense] = useState(null);

//   // All useColorModeValue hooks
//   const bgColor = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const rowHoverBg = useColorModeValue('gray.50', 'gray.700');

//   // All useDisclosure hooks
//   const { isOpen, onOpen, onClose } = useDisclosure();

//   // All useToast hooks
//   const toast = useToast();

//   // All context hooks
//   const { 
//     expenses, 
//     loading, 
//     deleteExpense, 
//     getCurrentMonthExpenses,
//     getThisMonthTotal,
//     getDailyAverage
//   } = useExpenseContext();

//   // All useEffect hooks
//   useEffect(() => {
//     // Any side effects here
//   }, []);

//   // All useCallback hooks
//   const handleDelete = useCallback((expense) => {
//     setSelectedExpense(expense);
//     onOpen();
//   }, [onOpen]);

//   const confirmDelete = useCallback(async () => {
//     if (selectedExpense) {
//       try {
//         await deleteExpense(selectedExpense.id);
//         toast({
//           title: "Expense deleted",
//           description: "The expense has been successfully deleted.",
//           status: "success",
//           duration: 3000,
//           isClosable: true,
//         });
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to delete expense. Please try again.",
//           status: "error",
//           duration: 3000,
//           isClosable: true,
//         });
//       }
//       setSelectedExpense(null);
//       onClose();
//     }
//   }, [selectedExpense, deleteExpense, toast, onClose]);

//   const handleSort = useCallback((field) => {
//     if (sortBy === field) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(field);
//       setSortOrder('desc');
//     }
//   }, [sortBy, sortOrder]);

//   // All useMemo hooks
//   const filteredExpenses = useMemo(() => {
//     if (!expenses) return [];
    
//     let filtered = expenses.filter(expense => {
//       const matchesSearch = expense.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            expense.title?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = !categoryFilter || expense.category === categoryFilter;
//       return matchesSearch && matchesCategory;
//     });

//     // Sort expenses
//     filtered.sort((a, b) => {
//       let comparison = 0;
      
//       switch (sortBy) {
//         case 'date':
//           comparison = new Date(a.date) - new Date(b.date);
//           break;
//         case 'amount':
//           comparison = a.amount - b.amount;
//           break;
//         case 'description':
//           comparison = (a.description || a.title || '').localeCompare(b.description || b.title || '');
//           break;
//         case 'category':
//           comparison = (a.category || '').localeCompare(b.category || '');
//           break;
//         default:
//           comparison = 0;
//       }
      
//       return sortOrder === 'asc' ? comparison : -comparison;
//     });

//     return filtered;
//   }, [expenses, searchTerm, categoryFilter, sortBy, sortOrder]);

//   const stats = useMemo(() => {
//     if (!filteredExpenses.length) {
//       return { total: 0, average: 0, thisMonth: 0, count: 0 };
//     }
    
//     const total = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
//     const average = total / filteredExpenses.length;
//     const thisMonth = filteredExpenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       const now = new Date();
//       return expenseDate.getMonth() === now.getMonth() && 
//              expenseDate.getFullYear() === now.getFullYear();
//     }).reduce((sum, expense) => sum + expense.amount, 0);

//     return { total, average, thisMonth, count: filteredExpenses.length };
//   }, [filteredExpenses]);

//   const categories = useMemo(() => {
//     if (!expenses) return [];
//     return [...new Set(expenses.map(expense => expense.category).filter(Boolean))];
//   }, [expenses]);

//   // Loading state
//   if (loading) {
//     return (
//       <Center h="400px">
//         <VStack>
//           <Spinner size="xl" color="blue.500" />
//           <Text>Loading your expenses...</Text>
//         </VStack>
//       </Center>
//     );
//   }

//   return (
//     <VStack spacing={6} align="stretch">
//       {/* Page Header */}
//       <Box>
//         <Heading size="lg" mb={2}>
//           Expense History
//         </Heading>
//         <Text color="gray.600">
//           View and manage all your expenses
//         </Text>
//       </Box>

//       {/* Statistics Cards */}
//       <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
//         <Stat
//           bg={bgColor}
//           p={4}
//           borderRadius="lg"
//           border="1px"
//           borderColor={borderColor}
//         >
//           <StatLabel fontSize="sm">Total Expenses</StatLabel>
//           <StatNumber fontSize="xl" color="red.500">
//             {formatCurrency(stats.total)}
//           </StatNumber>
//         </Stat>
//         <Stat
//           bg={bgColor}
//           p={4}
//           borderRadius="lg"
//           border="1px"
//           borderColor={borderColor}
//         >
//           <StatLabel fontSize="sm">This Month</StatLabel>
//           <StatNumber fontSize="xl" color="blue.500">
//             {formatCurrency(stats.thisMonth)}
//           </StatNumber>
//         </Stat>
//         <Stat
//           bg={bgColor}
//           p={4}
//           borderRadius="lg"
//           border="1px"
//           borderColor={borderColor}
//         >
//           <StatLabel fontSize="sm">Average</StatLabel>
//           <StatNumber fontSize="xl" color="green.500">
//             {formatCurrency(stats.average)}
//           </StatNumber>
//         </Stat>
//         <Stat
//           bg={bgColor}
//           p={4}
//           borderRadius="lg"
//           border="1px"
//           borderColor={borderColor}
//         >
//           <StatLabel fontSize="sm">Total Count</StatLabel>
//           <StatNumber fontSize="xl" color="purple.500">
//             {stats.count}
//           </StatNumber>
//         </Stat>
//       </SimpleGrid>

      
//               {/* Filters and Search */}
//       <Box
//         bg={bgColor}
//         p={6}
//         borderRadius="xl"
//         border="1px"
//         borderColor={borderColor}
//         boxShadow="sm"
//       >
//         <VStack spacing={4}>
//           <HStack justify="space-between" w="full">
//             <Text fontWeight="semibold">Filters & Search</Text>
//             <HStack>
//               <Button
//                 size="sm"
//                 leftIcon={<FiDownload />}
//                 variant="outline"
//                 colorScheme="blue"
//               >
//                 Export
//               </Button>
//               <Button
//                 size="sm"
//                 onClick={() => {
//                   setSearchTerm('');
//                   setCategoryFilter('');
//                   setSortBy('date');
//                   setSortOrder('desc');
//                 }}
//               >
//                 Reset
//               </Button>
//             </HStack>
//           </HStack>

//           <HStack spacing={4} w="full">
//             <InputGroup flex={2}>
//               <InputLeftElement pointerEvents="none">
//                 <FiSearch color="gray.400" />
//               </InputLeftElement>
//               <Input
//                 placeholder="Search expenses..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </InputGroup>

//             <Select
//               placeholder="All Categories"
//               value={categoryFilter}
//               onChange={(e) => setCategoryFilter(e.target.value)}
//               flex={1}
//             >
//               {categories.map(category => (
//                 <option key={category} value={category}>
//                   {category}
//                 </option>
//               ))}
//             </Select>

//             <Select
//               value={`${sortBy}-${sortOrder}`}
//               onChange={(e) => {
//                 const [field, order] = e.target.value.split('-');
//                 setSortBy(field);
//                 setSortOrder(order);
//               }}
//               flex={1}
//             >
//               <option value="date-desc">Date (Newest)</option>
//               <option value="date-asc">Date (Oldest)</option>
//               <option value="amount-desc">Amount (High to Low)</option>
//               <option value="amount-asc">Amount (Low to High)</option>
//               <option value="description-asc">Description (A-Z)</option>
//               <option value="category-asc">Category (A-Z)</option>
//             </Select>
//           </HStack>
//         </VStack>
//       </Box>

//       {/* Expenses Table */}
//       <Box
//         bg={bgColor}
//         borderRadius="xl"
//         border="1px"
//         borderColor={borderColor}
//         boxShadow="sm"
//         overflow="hidden"
//       >
//         {filteredExpenses.length === 0 ? (
//           <EmptyState
//             title="No expenses found"
//             description={
//               searchTerm || categoryFilter
//                 ? "Try adjusting your search or filter criteria"
//                 : "Start by adding your first expense"
//             }
//           />
//         ) : (
//           <Table variant="simple">
//             <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
//               <Tr>
//                 <Th cursor="pointer" onClick={() => handleSort('description')}>Description</Th>
//                 <Th cursor="pointer" onClick={() => handleSort('category')}>Category</Th>
//                 <Th isNumeric cursor="pointer" onClick={() => handleSort('amount')}>Amount</Th>
//                 <Th cursor="pointer" onClick={() => handleSort('date')}>Date</Th>
//                 <Th width="60px">Actions</Th>
//               </Tr>
//             </Thead>
//             <Tbody>
//               {filteredExpenses.map((expense) => {
//                 const IconComponent = categoryIcons[expense.category] || FiDollarSign;
//                 const colorScheme = categoryColors[expense.category] || 'gray';

//                 return (
//                   <Tr key={expense.id} _hover={{ bg: rowHoverBg }}>
//                     <Td>
//                       <HStack>
//                         <Avatar
//                           size="sm"
//                           bg={`${colorScheme}.100`}
//                           color={`${colorScheme}.600`}
//                           icon={<IconComponent size="16" />}
//                         />
//                         <VStack align="start" spacing={0}>
//                           <Text fontWeight="medium">
//                             {expense.title || expense.description}
//                           </Text>
//                           {expense.description && expense.title && (
//                             <Text fontSize="sm" color="gray.500">
//                               {expense.description}
//                             </Text>
//                           )}
//                         </VStack>
//                       </HStack>
//                     </Td>
//                     <Td>
//                       <Badge colorScheme={colorScheme} variant="subtle">
//                         {expense.category}
//                       </Badge>
//                     </Td>
//                     <Td isNumeric>
//                       <Text fontWeight="bold" color={`${colorScheme}.500`}>
//                         {formatCurrency(expense.amount)}
//                       </Text>
//                     </Td>
//                     <Td>
//                       <Text fontSize="sm" color="gray.600">
//                         {formatDate(expense.date)}
//                       </Text>
//                     </Td>
//                     <Td>
//                       <Menu>
//                         <MenuButton
//                           as={IconButton}
//                           icon={<FiMoreVertical />}
//                           variant="ghost"
//                           size="sm"
//                         />
//                         <MenuList>
//                           <MenuItem icon={<FiEdit2 />}>Edit</MenuItem>
//                           <MenuItem
//                             icon={<FiTrash2 />}
//                             color="red.500"
//                             onClick={() => handleDelete(expense)}
//                           >
//                             Delete
//                           </MenuItem>
//                         </MenuList>
//                       </Menu>
//                     </Td>
//                   </Tr>
//                 );
//               })}
//             </Tbody>
//           </Table>
//         )}
//       </Box>

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmation
//         isOpen={isOpen}
//         onClose={onClose}
//         onConfirm={confirmDelete}
//         title="Delete Expense"
//         message={`Are you sure you want to delete "${selectedExpense?.title || selectedExpense?.description}"? This action cannot be undone.`}
//       />
//     </VStack>
//   );
// };

// export default ExpenseList;
// ✅ ExpenseList.jsx - Cleaned & Verified
import React, { useState, useCallback, useMemo } from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, Text, Badge, IconButton, Menu,
  MenuButton, MenuList, MenuItem, useDisclosure, Spinner, Input, Select,
  HStack, VStack, Button, useToast, Heading, SimpleGrid, Stat, StatLabel,
  StatNumber, InputGroup, InputLeftElement, Avatar, Center, useColorModeValue
} from '@chakra-ui/react';
import {
  FiSearch, FiMoreVertical, FiEdit2, FiTrash2, FiDownload,
  FiShoppingCart, FiTruck, FiHome, FiHeart, FiBook, FiDollarSign
} from 'react-icons/fi';
import { useExpenseContext } from '../../context/ExpenseContext';
import DeleteConfirmation from '../common/DeleteConfirmation';
import EmptyState from '../common/EmptyState';

// 🏷️ Icon & Color maps
const categoryIcons = {
  'Food & Dining': FiShoppingCart, Food: FiShoppingCart,
  Transportation: FiTruck, Housing: FiHome,
  Healthcare: FiHeart, Education: FiBook,
  Other: FiDollarSign,
};

const categoryColors = {
  'Food & Dining': 'green', Food: 'green',
  Transportation: 'blue', Housing: 'purple',
  Healthcare: 'red', Education: 'orange',
  Other: 'gray',
};

// 💰 Format currency
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);

// 📅 Format date
const formatDate = (dateString) =>
  new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric', month: 'short', day: 'numeric'
  });

const ExpenseList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedExpense, setSelectedExpense] = useState(null);

  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const rowHoverBg = useColorModeValue('gray.50', 'gray.700');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // 🔗 Get data from context
  const {
    expenses, loading, deleteExpense
  } = useExpenseContext();

  // 🗑️ Delete logic
  const handleDelete = useCallback((expense) => {
    setSelectedExpense(expense);
    onOpen();
  }, [onOpen]);

  const confirmDelete = useCallback(async () => {
    if (!selectedExpense) return;

    try {
      await deleteExpense(selectedExpense.id);
      toast({
        title: "Expense deleted",
        description: "The expense has been successfully deleted.",
        status: "success", duration: 3000, isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete expense. Please try again.",
        status: "error", duration: 3000, isClosable: true,
      });
    }

    setSelectedExpense(null);
    onClose();
  }, [selectedExpense, deleteExpense, toast, onClose]);

  // 🔃 Sorting logic
  const handleSort = useCallback((field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  }, [sortBy, sortOrder]);

  // 🔍 Filtering & Sorting
  const filteredExpenses = useMemo(() => {
    if (!expenses) return [];

    let filtered = expenses.filter(expense => {
      const search = searchTerm.toLowerCase();
      const matchesSearch =
        expense.description?.toLowerCase().includes(search) ||
        expense.title?.toLowerCase().includes(search);
      const matchesCategory = !categoryFilter || expense.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    // Sort
    filtered.sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'date') cmp = new Date(a.date) - new Date(b.date);
      else if (sortBy === 'amount') cmp = a.amount - b.amount;
      else if (sortBy === 'description') cmp = (a.description || a.title || '').localeCompare(b.description || b.title || '');
      else if (sortBy === 'category') cmp = (a.category || '').localeCompare(b.category || '');
      return sortOrder === 'asc' ? cmp : -cmp;
    });

    return filtered;
  }, [expenses, searchTerm, categoryFilter, sortBy, sortOrder]);

  // 📊 Stats
  const stats = useMemo(() => {
    const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
    const average = filteredExpenses.length ? total / filteredExpenses.length : 0;
    const now = new Date();
    const thisMonth = filteredExpenses
      .filter(e => new Date(e.date).getMonth() === now.getMonth())
      .reduce((sum, e) => sum + e.amount, 0);

    return { total, average, thisMonth, count: filteredExpenses.length };
  }, [filteredExpenses]);

  const categories = useMemo(() => {
    if (!expenses) return [];
    return [...new Set(expenses.map(e => e.category).filter(Boolean))];
  }, [expenses]);

  // ⏳ Loading state
  if (loading) {
    return (
      <Center h="400px">
        <VStack>
          <Spinner size="xl" color="blue.500" />
          <Text>Loading your expenses...</Text>
        </VStack>
      </Center>
    );
  }

  return (
    <VStack spacing={6} align="stretch">
      {/* Header */}
      <Box>
        <Heading size="lg" mb={2}>Expense History</Heading>
        <Text color="gray.600">View and manage all your expenses</Text>
      </Box>

      {/* Stats Cards */}
      <SimpleGrid columns={{ base: 1, md: 4 }} spacing={4}>
        {['Total Expenses', 'This Month', 'Average', 'Total Count'].map((label, idx) => (
          <Stat key={label} bg={bgColor} p={4} borderRadius="lg" border="1px" borderColor={borderColor}>
            <StatLabel fontSize="sm">{label}</StatLabel>
            <StatNumber fontSize="xl" color={['red', 'blue', 'green', 'purple'][idx] + '.500'}>
              {idx === 3 ? stats.count : formatCurrency([stats.total, stats.thisMonth, stats.average][idx])}
            </StatNumber>
          </Stat>
        ))}
      </SimpleGrid>

      {/* Filter Section */}
      <Box bg={bgColor} p={6} borderRadius="xl" border="1px" borderColor={borderColor} boxShadow="sm">
        <VStack spacing={4}>
          <HStack justify="space-between" w="full">
            <Text fontWeight="semibold">Filters & Search</Text>
            <HStack>
              <Button size="sm" leftIcon={<FiDownload />} variant="outline" colorScheme="blue">Export</Button>
              <Button size="sm" onClick={() => {
                setSearchTerm(''); setCategoryFilter(''); setSortBy('date'); setSortOrder('desc');
              }}>Reset</Button>
            </HStack>
          </HStack>

          <HStack spacing={4} w="full">
            <InputGroup flex={2}>
              <InputLeftElement pointerEvents="none"><FiSearch color="gray.400" /></InputLeftElement>
              <Input placeholder="Search expenses..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </InputGroup>
            <Select placeholder="All Categories" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} flex={1}>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </Select>
            <Select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [field, order] = e.target.value.split('-');
                setSortBy(field); setSortOrder(order);
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

      {/* Expense Table */}
      <Box bg={bgColor} borderRadius="xl" border="1px" borderColor={borderColor} boxShadow="sm" overflow="hidden">
        {filteredExpenses.length === 0 ? (
          <EmptyState
            title="No expenses found"
            description={searchTerm || categoryFilter ? "Try adjusting your search or filter criteria" : "Start by adding your first expense"}
          />
        ) : (
          <Table variant="simple">
            <Thead bg={useColorModeValue('gray.50', 'gray.700')}>
              <Tr>
                <Th onClick={() => handleSort('description')} cursor="pointer">Description</Th>
                <Th onClick={() => handleSort('category')} cursor="pointer">Category</Th>
                <Th isNumeric onClick={() => handleSort('amount')} cursor="pointer">Amount</Th>
                <Th onClick={() => handleSort('date')} cursor="pointer">Date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredExpenses.map(expense => {
                const Icon = categoryIcons[expense.category] || FiDollarSign;
                const color = categoryColors[expense.category] || 'gray';

                return (
                  <Tr key={expense.id} _hover={{ bg: rowHoverBg }}>
                    <Td>
                      <HStack>
                        <Avatar size="sm" bg={`${color}.100`} color={`${color}.600`} icon={<Icon size="16" />} />
                        <VStack align="start" spacing={0}>
                          <Text fontWeight="medium">{expense.title || expense.description}</Text>
                          {expense.title && expense.description && (
                            <Text fontSize="sm" color="gray.500">{expense.description}</Text>
                          )}
                        </VStack>
                      </HStack>
                    </Td>
                    <Td><Badge colorScheme={color}>{expense.category}</Badge></Td>
                    <Td isNumeric><Text fontWeight="bold" color={`${color}.500`}>{formatCurrency(expense.amount)}</Text></Td>
                    <Td><Text fontSize="sm" color="gray.600">{formatDate(expense.date)}</Text></Td>
                    <Td>
                      <Menu>
                        <MenuButton as={IconButton} icon={<FiMoreVertical />} variant="ghost" size="sm" />
                        <MenuList>
                          <MenuItem icon={<FiEdit2 />}>Edit</MenuItem>
                          <MenuItem icon={<FiTrash2 />} color="red.500" onClick={() => handleDelete(expense)}>Delete</MenuItem>
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

      <DeleteConfirmation
        isOpen={isOpen}
        onClose={onClose}
        onConfirm={confirmDelete}
        title="Delete Expense"
        message={`Are you sure you want to delete "${selectedExpense?.title || selectedExpense?.description}"? This action cannot be undone.`}
      />
    </VStack>
  );
};

export default ExpenseList;
