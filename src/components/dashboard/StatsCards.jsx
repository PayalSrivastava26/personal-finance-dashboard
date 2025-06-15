// import React from 'react';
// import {
//   Box,
//   Flex,
//   Text,
//   Icon,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatHelpText,
//   StatArrow,
//   useColorModeValue
// } from '@chakra-ui/react';
// import { FiDollarSign, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

// const StatCard = ({ 
//   title, 
//   value, 
//   change, 
//   changeType = 'neutral', // 'increase', 'decrease', 'neutral'
//   icon = FiDollarSign,
//   colorScheme = 'blue'
// }) => {
//   const bg = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const iconBg = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);
//   const iconColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.200`);

//   return (
//     <Box
//       bg={bg}
//       p={6}
//       rounded="lg"
//       shadow="sm"
//       border="1px"
//       borderColor={borderColor}
//       _hover={{ shadow: 'md' }}
//       transition="all 0.2s"
//     >
//       <Flex align="center" justify="space-between">
//         <Stat>
//           <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
//             {title}
//           </StatLabel>
//           <StatNumber fontSize="2xl" fontWeight="bold" mb={2}>
//             {value}
//           </StatNumber>
//           {change && (
//             <StatHelpText mb={0}>
//               <StatArrow type={changeType} />
//               {change}
//             </StatHelpText>
//           )}
//         </Stat>
//         <Box
//           p={3}
//           rounded="lg"
//           bg={iconBg}
//         >
//           <Icon
//             as={icon}
//             w={6}
//             h={6}
//             color={iconColor}
//           />
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// export default StatCard;
// import React from 'react';
// import {
//   Box,
//   Flex,
//   Text,
//   Icon,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatHelpText,
//   StatArrow,
//   useColorModeValue,
//   SimpleGrid
// } from '@chakra-ui/react';
// import { 
//   FiDollarSign, 
//   FiTrendingUp, 
//   FiTrendingDown, 
//   FiShoppingCart,
//   FiCreditCard,
//   FiCalendar
// } from 'react-icons/fi';
// import useExpenses from '../../hooks/useExpenses';

// const StatCard = ({ 
//   title, 
//   value, 
//   change, 
//   changeType = 'neutral', // 'increase', 'decrease', 'neutral'
//   icon = FiDollarSign,
//   colorScheme = 'blue'
// }) => {
//   const bg = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const iconBg = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);
//   const iconColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.200`);

//   return (
//     <Box
//       bg={bg}
//       p={6}
//       rounded="lg"
//       shadow="sm"
//       border="1px"
//       borderColor={borderColor}
//       _hover={{ shadow: 'md' }}
//       transition="all 0.2s"
//     >
//       <Flex align="center" justify="space-between">
//         <Stat>
//           <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
//             {title}
//           </StatLabel>
//           <StatNumber fontSize="2xl" fontWeight="bold" mb={2}>
//             {value}
//           </StatNumber>
//           {change && (
//             <StatHelpText mb={0}>
//               <StatArrow type={changeType} />
//               {change}
//             </StatHelpText>
//           )}
//         </Stat>
//         <Box
//           p={3}
//           rounded="lg"
//           bg={iconBg}
//         >
//           <Icon
//             as={icon}
//             w={6}
//             h={6}
//             color={iconColor}
//           />
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// const StatsCards = () => {
//   const { expenses, stats, loading } = useExpenses();
  
//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount || 0);
//   };

//   // Calculate stats from expenses or use provided stats
//   const calculateStats = () => {
//     if (stats) {
//       return stats;
//     }

//     const currentMonth = new Date().getMonth();
//     const currentYear = new Date().getFullYear();
//     const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//     const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

//     const thisMonthExpenses = expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate.getMonth() === currentMonth && 
//              expenseDate.getFullYear() === currentYear;
//     });

//     const lastMonthExpenses = expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate.getMonth() === lastMonth && 
//              expenseDate.getFullYear() === lastMonthYear;
//     });

//     const thisMonthTotal = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
//     const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
//     const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

//     return {
//       thisMonth: thisMonthTotal,
//       lastMonth: lastMonthTotal,
//       total: totalExpenses,
//       thisMonthTransactions: thisMonthExpenses.length,
//       totalTransactions: expenses.length,
//       avgDaily: thisMonthTotal / new Date().getDate(),
//     };
//   };

//   const calculatedStats = calculateStats();
//   const monthlyBudget = 3000; // You can make this configurable
//   const remaining = monthlyBudget - calculatedStats.thisMonth;
//   const budgetUsed = (calculatedStats.thisMonth / monthlyBudget) * 100;
//   const monthlyChange = calculatedStats.lastMonth > 0 
//     ? ((calculatedStats.thisMonth - calculatedStats.lastMonth) / calculatedStats.lastMonth) * 100 
//     : 0;

//   // Show loading state
//   if (loading) {
//     return (
//       <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
//         {[1, 2, 3, 4].map(i => (
//           <StatCard
//             key={i}
//             title="Loading..."
//             value="--"
//             colorScheme="gray"
//           />
//         ))}
//       </SimpleGrid>
//     );
//   }

//   return (
//     <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
//       <StatCard
//         title="This Month"
//         value={formatCurrency(calculatedStats.thisMonth)}
//         change={`${Math.abs(monthlyChange).toFixed(1)}% from last month`}
//         changeType={monthlyChange >= 0 ? 'increase' : 'decrease'}
//         icon={FiDollarSign}
//         colorScheme="blue"
//       />
      
//       <StatCard
//         title="Remaining Budget"
//         value={formatCurrency(remaining)}
//         change={`${budgetUsed.toFixed(1)}% used`}
//         changeType={remaining > 0 ? 'decrease' : 'increase'}
//         icon={FiCreditCard}
//         colorScheme={remaining > 0 ? 'green' : 'red'}
//       />
      
//       <StatCard
//         title="Total Transactions"
//         value={calculatedStats.thisMonthTransactions}
//         change="This month"
//         changeType="neutral"
//         icon={FiShoppingCart}
//         colorScheme="purple"
//       />
      
//       <StatCard
//         title="Daily Average"
//         value={formatCurrency(calculatedStats.avgDaily)}
//         change="Based on current month"
//         changeType="neutral"
//         icon={calculatedStats.avgDaily > 100 ? FiTrendingUp : FiTrendingDown}
//         colorScheme="orange"
//       />
//     </SimpleGrid>
//   );
// };

// export { StatCard };
// export default StatsCards;  


// import React from 'react';
// import {
//   Box,
//   Flex,
//   Text,
//   Icon,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatHelpText,
//   StatArrow,
//   useColorModeValue,
//   SimpleGrid
// } from '@chakra-ui/react';
// import { 
//   FiDollarSign, 
//   FiTrendingUp, 
//   FiTrendingDown, 
//   FiShoppingCart,
//   FiCreditCard,
//   FiCalendar
// } from 'react-icons/fi';
// import { useExpenseContext } from '../../context/ExpenseContext';

// const StatCard = ({ 
//   title, 
//   value, 
//   change, 
//   changeType = 'neutral', // 'increase', 'decrease', 'neutral'
//   icon = FiDollarSign,
//   colorScheme = 'blue'
// }) => {
//   const bg = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const iconBg = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);
//   const iconColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.200`);

//   return (
//     <Box
//       bg={bg}
//       p={6}
//       rounded="lg"
//       shadow="sm"
//       border="1px"
//       borderColor={borderColor}
//       _hover={{ shadow: 'md' }}
//       transition="all 0.2s"
//     >
//       <Flex align="center" justify="space-between">
//         <Stat>
//           <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
//             {title}
//           </StatLabel>
//           <StatNumber fontSize="2xl" fontWeight="bold" mb={2}>
//             {value}
//           </StatNumber>
//           {change && (
//             <StatHelpText mb={0}>
//               <StatArrow type={changeType} />
//               {change}
//             </StatHelpText>
//           )}
//         </Stat>
//         <Box
//           p={3}
//           rounded="lg"
//           bg={iconBg}
//         >
//           <Icon
//             as={icon}
//             w={6}
//             h={6}
//             color={iconColor}
//           />
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// const StatsCards = () => {
//   // Use ExpenseContext directly instead of useExpenses hook
//   const { 
//     expenses, 
//     loading, 
//     getThisMonthTotal, 
//     getRemainingBudget, 
//     getDailyAverage,
//     monthlyBudget,
//     getCurrentMonthExpenses 
//   } = useExpenseContext();
  
//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount || 0);
//   };

//   // Calculate additional stats
//   const calculateAdditionalStats = () => {
//     const currentMonth = new Date().getMonth();
//     const currentYear = new Date().getFullYear();
//     const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//     const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

//     const lastMonthExpenses = expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate.getMonth() === lastMonth && 
//              expenseDate.getFullYear() === lastMonthYear;
//     });

//     const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => 
//       sum + (parseFloat(expense.amount) || 0), 0
//     );

//     return {
//       lastMonthTotal
//     };
//   };

//   // Show loading state
//   if (loading) {
//     return (
//       <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
//         {[1, 2, 3, 4].map(i => (
//           <StatCard
//             key={i}
//             title="Loading..."
//             value="--"
//             colorScheme="gray"
//           />
//         ))}
//       </SimpleGrid>
//     );
//   }

//   // Get calculated values from context
//   const thisMonthTotal = getThisMonthTotal();
//   const remainingBudget = getRemainingBudget();
//   const dailyAverage = getDailyAverage();
//   const currentMonthExpenses = getCurrentMonthExpenses();
//   const { lastMonthTotal } = calculateAdditionalStats();

//   // Calculate percentage changes
//   const budgetUsed = monthlyBudget > 0 ? (thisMonthTotal / monthlyBudget) * 100 : 0;
//   const monthlyChange = lastMonthTotal > 0 
//     ? ((thisMonthTotal - lastMonthTotal) / lastMonthTotal) * 100 
//     : 0;

//   return (
//     <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
//       <StatCard
//         title="This Month"
//         value={formatCurrency(thisMonthTotal)}
//         change={`${Math.abs(monthlyChange).toFixed(1)}% from last month`}
//         changeType={monthlyChange >= 0 ? 'increase' : 'decrease'}
//         icon={FiDollarSign}
//         colorScheme="blue"
//       />
      
//       <StatCard
//         title="Remaining Budget"
//         value={formatCurrency(remainingBudget)}
//         change={`${budgetUsed.toFixed(1)}% used`}
//         changeType={remainingBudget > 0 ? 'decrease' : 'increase'}
//         icon={FiCreditCard}
//         colorScheme={remainingBudget > 0 ? 'green' : 'red'}
//       />
      
//       <StatCard
//         title="Total Transactions"
//         value={currentMonthExpenses.length}
//         change="This month"
//         changeType="neutral"
//         icon={FiShoppingCart}
//         colorScheme="purple"
//       />
      
//       <StatCard
//         title="Daily Average"
//         value={formatCurrency(dailyAverage)}
//         change="Based on current month"
//         changeType="neutral"
//         icon={dailyAverage > 100 ? FiTrendingUp : FiTrendingDown}
//         colorScheme="orange"
//       />
//     </SimpleGrid>
//   );
// };

// export { StatCard };
// export default StatsCards;
// import React, { useEffect } from 'react';
// import {
//   Box,
//   Flex,
//   Text,
//   Icon,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatHelpText,
//   StatArrow,
//   useColorModeValue,
//   SimpleGrid
// } from '@chakra-ui/react';
// import { 
//   FiDollarSign, 
//   FiTrendingUp, 
//   FiTrendingDown, 
//   FiShoppingCart,
//   FiCreditCard,
//   FiCalendar
// } from 'react-icons/fi';
// import { useExpenseContext } from '../../context/ExpenseContext';

// const StatCard = ({ 
//   title, 
//   value, 
//   change, 
//   changeType = 'neutral',
//   icon = FiDollarSign,
//   colorScheme = 'blue'
// }) => {
//   const bg = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const iconBg = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);
//   const iconColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.200`);

//   return (
//     <Box
//       bg={bg}
//       p={6}
//       rounded="lg"
//       shadow="sm"
//       border="1px"
//       borderColor={borderColor}
//       _hover={{ shadow: 'md' }}
//       transition="all 0.2s"
//     >
//       <Flex align="center" justify="space-between">
//         <Stat>
//           <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
//             {title}
//           </StatLabel>
//           <StatNumber fontSize="2xl" fontWeight="bold" mb={2}>
//             {value}
//           </StatNumber>
//           {change && (
//             <StatHelpText mb={0}>
//               <StatArrow type={changeType} />
//               {change}
//             </StatHelpText>
//           )}
//         </Stat>
//         <Box
//           p={3}
//           rounded="lg"
//           bg={iconBg}
//         >
//           <Icon
//             as={icon}
//             w={6}
//             h={6}
//             color={iconColor}
//           />
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// const StatsCards = () => {
//   const context = useExpenseContext();
  
//   // DEBUG: Log everything to console
//   useEffect(() => {
//     console.log('=== STATS CARDS DEBUG ===');
//     console.log('Context:', context);
//     console.log('Expenses:', context?.expenses);
//     console.log('Loading:', context?.loading);
//     console.log('Functions available:', {
//       getThisMonthTotal: typeof context?.getThisMonthTotal,
//       getRemainingBudget: typeof context?.getRemainingBudget,
//       getDailyAverage: typeof context?.getDailyAverage,
//       getCurrentMonthExpenses: typeof context?.getCurrentMonthExpenses
//     });
    
//     if (context?.expenses) {
//       console.log('Total expenses:', context.expenses.length);
//       console.log('Sample expense:', context.expenses[0]);
//     }
//   }, [context]);

//   // Format currency
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 0,
//     }).format(amount || 0);
//   };

//   // Check if context exists
//   if (!context) {
//     console.error('ExpenseContext not found! Make sure ExpenseProvider wraps this component.');
//     return (
//       <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
//         <StatCard
//           title="Error"
//           value="Context Missing"
//           colorScheme="red"
//         />
//       </SimpleGrid>
//     );
//   }

//   const { 
//     expenses = [], 
//     loading = true, 
//     getThisMonthTotal, 
//     getRemainingBudget, 
//     getDailyAverage,
//     getCurrentMonthExpenses,
//     monthlyBudget = 2550
//   } = context;

//   // Show loading state
//   if (loading) {
//     return (
//       <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
//         {[1, 2, 3, 4].map(i => (
//           <StatCard
//             key={i}
//             title="Loading..."
//             value="Loading..."
//             colorScheme="gray"
//           />
//         ))}
//       </SimpleGrid>
//     );
//   }

//   // Manual calculations if functions don't exist
//   const getCurrentMonthExpensesManual = () => {
//     const now = new Date();
//     const currentMonth = now.getMonth();
//     const currentYear = now.getFullYear();
    
//     return expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate.getMonth() === currentMonth && 
//              expenseDate.getFullYear() === currentYear;
//     });
//   };

//   const getThisMonthTotalManual = () => {
//     const thisMonthExpenses = getCurrentMonthExpensesManual();
//     return thisMonthExpenses.reduce((total, expense) => {
//       return total + (parseFloat(expense.amount) || 0);
//     }, 0);
//   };

//   const getDailyAverageManual = () => {
//     const thisMonthTotal = getThisMonthTotalManual();
//     const currentDay = new Date().getDate();
//     return currentDay > 0 ? thisMonthTotal / currentDay : 0;
//   };

//   // Use context functions if available, otherwise manual calculations
//   const thisMonthTotal = getThisMonthTotal ? getThisMonthTotal() : getThisMonthTotalManual();
//   const remainingBudget = getRemainingBudget ? getRemainingBudget() : (monthlyBudget - thisMonthTotal);
//   const dailyAverage = getDailyAverage ? getDailyAverage() : getDailyAverageManual();
//   const currentMonthExpenses = getCurrentMonthExpenses ? getCurrentMonthExpenses() : getCurrentMonthExpensesManual();

//   // Calculate additional stats
//   const budgetUsed = monthlyBudget > 0 ? (thisMonthTotal / monthlyBudget) * 100 : 0;

//   console.log('=== CALCULATED VALUES ===');
//   console.log('This Month Total:', thisMonthTotal);
//   console.log('Remaining Budget:', remainingBudget);
//   console.log('Daily Average:', dailyAverage);
//   console.log('Current Month Expenses Count:', currentMonthExpenses.length);
//   console.log('Budget Used %:', budgetUsed);

//   return (
//     <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
//       <StatCard
//         title="This Month"
//         value={formatCurrency(thisMonthTotal)}
//         change={`Total expenses this month`}
//         changeType="neutral"
//         icon={FiDollarSign}
//         colorScheme="blue"
//       />
      
//       <StatCard
//         title="Remaining Budget"
//         value={formatCurrency(remainingBudget)}
//         change={`${budgetUsed.toFixed(1)}% used`}
//         changeType={remainingBudget > 0 ? 'decrease' : 'increase'}
//         icon={FiCreditCard}
//         colorScheme={remainingBudget > 0 ? 'green' : 'red'}
//       />
      
//       <StatCard
//         title="Total Transactions"
//         value={currentMonthExpenses.length}
//         change="This month"
//         changeType="neutral"
//         icon={FiShoppingCart}
//         colorScheme="purple"
//       />
      
//       <StatCard
//         title="Daily Average"
//         value={formatCurrency(dailyAverage)}
//         change="Based on current month"
//         changeType="neutral"
//         icon={dailyAverage > 100 ? FiTrendingUp : FiTrendingDown}
//         colorScheme="orange"
//       />
//     </SimpleGrid>
//   );
// };

// export { StatCard };
// export default StatsCards;


// import React, { useEffect } from 'react';
// import {
//   Box,
//   Flex,
//   Text,
//   Icon,
//   Stat,
//   StatLabel,
//   StatNumber,
//   StatHelpText,
//   StatArrow,
//   useColorModeValue,
//   SimpleGrid
// } from '@chakra-ui/react';
// import {
//   FiDollarSign,
//   FiTrendingUp,
//   FiTrendingDown,
//   FiShoppingCart,
//   FiCreditCard
// } from 'react-icons/fi';
// import { useExpenseContext } from '../../context/ExpenseContext';

// // ✅ Date parser for handling both string and Firestore Timestamp
// const parseExpenseDate = (rawDate) => {
//   if (!rawDate) return new Date('Invalid');
//   if (typeof rawDate === 'string') return new Date(rawDate);
//   if (typeof rawDate.toDate === 'function') return rawDate.toDate();
//   return new Date(rawDate);
// };

// const StatCard = ({
//   title,
//   value,
//   change,
//   changeType = 'neutral',
//   icon = FiDollarSign,
//   colorScheme = 'blue'
// }) => {
//   const bg = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const iconBg = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);
//   const iconColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.200`);

//   return (
//     <Box
//       bg={bg}
//       p={6}
//       rounded="lg"
//       shadow="sm"
//       border="1px"
//       borderColor={borderColor}
//       _hover={{ shadow: 'md' }}
//       transition="all 0.2s"
//     >
//       <Flex align="center" justify="space-between">
//         <Stat>
//           <StatLabel color="gray.500" fontSize="sm" fontWeight="medium">
//             {title}
//           </StatLabel>
//           <StatNumber fontSize="2xl" fontWeight="bold" mb={2}>
//             {value}
//           </StatNumber>
//           {change && (
//             <StatHelpText mb={0}>
//               <StatArrow type={changeType} />
//               {change}
//             </StatHelpText>
//           )}
//         </Stat>
//         <Box p={3} rounded="lg" bg={iconBg}>
//           <Icon as={icon} w={6} h={6} color={iconColor} />
//         </Box>
//       </Flex>
//     </Box>
//   );
// };

// const StatsCards = () => {
//   const context = useExpenseContext();

//   useEffect(() => {
//     console.log('=== STATS CARDS DEBUG ===');
//     console.log('Context:', context);
//     console.log('Expenses:', context?.expenses);
//   }, [context]);

//   // ✅ Fixed to use INR currency format
//   const formatCurrency = (amount) => {
//     return new Intl.NumberFormat('en-IN', {
//       style: 'currency',
//       currency: 'INR',
//       minimumFractionDigits: 0,
//       maximumFractionDigits: 2,
//     }).format(amount || 0);
//   };

//   if (!context) {
//     console.error('ExpenseContext not found!');
//     return (
//       <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
//         <StatCard
//           title="Error"
//           value="Context Missing"
//           colorScheme="red"
//         />
//       </SimpleGrid>
//     );
//   }

//   const {
//     expenses = [],
//     loading = true,
//     getThisMonthTotal,
//     getRemainingBudget,
//     getDailyAverage,
//     getCurrentMonthExpenses,
//     monthlyBudget = 2550
//   } = context;

//   if (loading) {
//     return (
//       <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
//         {[1, 2, 3, 4].map(i => (
//           <StatCard
//             key={i}
//             title="Loading..."
//             value="Loading..."
//             colorScheme="gray"
//           />
//         ))}
//       </SimpleGrid>
//     );
//   }

//   // ✅ Use context functions directly (they're already implemented correctly)
//   const thisMonthTotal = getThisMonthTotal();
//   const remainingBudget = getRemainingBudget();
//   const dailyAverage = getDailyAverage();
//   const currentMonthExpenses = getCurrentMonthExpenses();

//   const budgetUsed = monthlyBudget > 0 ? (thisMonthTotal / monthlyBudget) * 100 : 0;

//   return (
//     <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
//       <StatCard
//         title="This Month"
//         value={formatCurrency(thisMonthTotal)}
//         change="Total expenses this month"
//         changeType="neutral"
//         icon={FiDollarSign}
//         colorScheme="blue"
//       />
//       <StatCard
//         title="Remaining Budget"
//         value={formatCurrency(remainingBudget)}
//         change={`${budgetUsed.toFixed(1)}% used`}
//         changeType={remainingBudget > 0 ? 'decrease' : 'increase'}
//         icon={FiCreditCard}
//         colorScheme={remainingBudget > 0 ? 'green' : 'red'}
//       />
//       <StatCard
//         title="Total Transactions"
//         value={currentMonthExpenses.length}
//         change="This month"
//         changeType="neutral"
//         icon={FiShoppingCart}
//         colorScheme="purple"
//       />
//       <StatCard
//         title="Daily Average"
//         value={formatCurrency(dailyAverage)}
//         change="Based on current month"
//         changeType="neutral"
//         icon={dailyAverage > 100 ? FiTrendingUp : FiTrendingDown}
//         colorScheme="orange"
//       />
//     </SimpleGrid>
//   );
// };

// export { StatCard };
// export default StatsCards;



// import React from 'react';
// import { 
//   Box, 
//   Text, 
//   SimpleGrid, 
//   Flex, 
//   Icon,
//   useColorModeValue 
// } from '@chakra-ui/react';
// import { useExpenseContext } from '../../context/ExpenseContext';
// import { formatCurrency } from '../../utils/formatters';
// import { CreditCard, Target, TrendingUp, Calendar } from 'lucide-react';

// const StatsCards = () => {
//   const {
//     getThisMonthTotal,
//     getRemainingBudget,
//     monthlyBudget,
//     getCurrentMonthExpenses,
//     getDailyAverage
//   } = useExpenseContext();

//   const thisMonthTotal = getThisMonthTotal();
//   const remainingBudget = getRemainingBudget();
//   const expenseCount = getCurrentMonthExpenses().length;
//   const dailyAverage = getDailyAverage();

//   const cardBg = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');

//   const stats = [
//     {
//       title: 'Total Spent This Month',
//       value: formatCurrency(thisMonthTotal),
//       icon: CreditCard,
//       color: 'red.500',
//       bgColor: 'red.50',
//       change: `${expenseCount} transactions`,
//     },
//     {
//       title: 'Remaining Budget',
//       value: formatCurrency(remainingBudget),
//       icon: Target,
//       color: remainingBudget >= 0 ? 'green.500' : 'red.500',
//       bgColor: remainingBudget >= 0 ? 'green.50' : 'red.50',
//       change: remainingBudget >= 0 ? 'Under budget' : 'Over budget',
//     },
//     {
//       title: 'Monthly Budget',
//       value: formatCurrency(monthlyBudget),
//       icon: Target,
//       color: 'blue.500',
//       bgColor: 'blue.50',
//       change: `${((thisMonthTotal / monthlyBudget) * 100).toFixed(1)}% used`,
//     },
//     {
//       title: 'Daily Average',
//       value: formatCurrency(dailyAverage),
//       icon: TrendingUp,
//       color: 'purple.500',
//       bgColor: 'purple.50',
//       change: 'This month',
//     }
//   ];

//   return (
//     <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
//       {stats.map((stat, index) => (
//         <Box
//           key={index}
//           bg={cardBg}
//           p={6}
//           rounded="lg"
//           shadow="sm"
//           border="1px"
//           borderColor={borderColor}
//           _hover={{ shadow: 'md' }}
//           transition="all 0.2s"
//         >
//           <Flex justify="space-between" align="center">
//             <Box flex={1}>
//               <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
//                 {stat.title}
//               </Text>
//               <Text fontSize="2xl" fontWeight="bold" color={stat.color} mb={1}>
//                 {stat.value}
//               </Text>
//               <Text fontSize="xs" color="gray.500">
//                 {stat.change}
//               </Text>
//             </Box>
//             <Box p={3} rounded="full" bg={stat.bgColor} flexShrink={0}>
//               <Icon as={stat.icon} w={6} h={6} color={stat.color} />
//             </Box>
//           </Flex>
//         </Box>
//       ))}
//     </SimpleGrid>
//   );
// };

// export default StatsCards;




// import React from 'react';
// import {
//   Box,
//   Heading,
//   VStack,
//   HStack,
//   Text,
//   Avatar,
//   Badge,
//   IconButton,
//   useColorModeValue,
//   Divider,
//   Button,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   useDisclosure,
//   Spinner,
//   Center,
// } from '@chakra-ui/react';
// import {
//   FiShoppingCart,
//   FiTruck,
//   FiHome,
//   FiHeart,
//   FiBook,
//   FiMoreVertical,
//   FiEdit2,
//   FiTrash2,
//   FiDollarSign,
// } from 'react-icons/fi';
// import useExpenses from '../../hooks/useExpenses';
// import { formatCurrency, formatDate } from '../../utils/formatters';
// import DeleteConfirmation from '../common/DeleteConfirmation';

// const categoryIcons = {
//   Food: FiShoppingCart,
//   Transportation: FiTruck,
//   Housing: FiHome,
//   Healthcare: FiHeart,
//   Education: FiBook,
//   Other: FiDollarSign,
// };

// const categoryColors = {
//   Food: 'green',
//   Transportation: 'blue',
//   Housing: 'purple',
//   Healthcare: 'red',
//   Education: 'orange',
//   Other: 'gray',
// };

// const RecentTransactions = ({ limit = 5 }) => {
//   const { expenses, deleteExpense, loading, error } = useExpenses();
//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedExpense, setSelectedExpense] = React.useState(null);
  
//   const bgColor = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const hoverBg = useColorModeValue('gray.50', 'gray.700');

//   const recentExpenses = React.useMemo(() => {
//     if (!expenses || expenses.length === 0) return [];
    
//     return [...expenses]
//       .sort((a, b) => {
//         // Handle different date formats
//         const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
//         const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
//         return dateB - dateA;
//       })
//       .slice(0, limit);
//   }, [expenses, limit]);

//   const handleDelete = (expense) => {
//     setSelectedExpense(expense);
//     onOpen();
//   };

//   const confirmDelete = async () => {
//     if (selectedExpense) {
//       try {
//         await deleteExpense(selectedExpense.id);
//         setSelectedExpense(null);
//         onClose();
//       } catch (error) {
//         console.error('Error deleting expense:', error);
//         // You can add toast notification here if needed
//       }
//     }
//   };

//   const TransactionItem = ({ expense }) => {
//     const IconComponent = categoryIcons[expense.category] || FiDollarSign;
//     const colorScheme = categoryColors[expense.category] || 'gray';

//     return (
//       <HStack
//         p={4}
//         spacing={4}
//         borderRadius="lg"
//         _hover={{ bg: hoverBg }}
//         transition="all 0.2s"
//         cursor="pointer"
//         w="full"
//       >
//         <Avatar
//           size="md"
//           bg={`${colorScheme}.100`}
//           color={`${colorScheme}.600`}
//           icon={<IconComponent size="18" />}
//         />
        
//         <VStack align="start" spacing={1} flex={1}>
//           <HStack justify="space-between" w="full">
//             <Text fontWeight="semibold" fontSize="sm">
//               {expense.description || 'Expense'}
//             </Text>
//             <Text fontWeight="bold" color={`${colorScheme}.500`}>
//               -{formatCurrency(expense.amount || 0)}
//             </Text>
//           </HStack>
          
//           <HStack spacing={2}>
//             <Badge 
//               size="sm" 
//               colorScheme={colorScheme}
//               variant="subtle"
//             >
//               {expense.category || 'Other'}
//             </Badge>
//             <Text fontSize="xs" color="gray.500">
//               {formatDate(expense.date)}
//             </Text>
//           </HStack>
//         </VStack>
        
//         <Menu>
//           <MenuButton
//             as={IconButton}
//             icon={<FiMoreVertical />}
//             variant="ghost"
//             size="sm"
//             colorScheme="gray"
//           />
//           <MenuList>
//             <MenuItem icon={<FiEdit2 />}>
//               Edit Transaction
//             </MenuItem>
//             <MenuItem 
//               icon={<FiTrash2 />} 
//               color="red.500"
//               onClick={() => handleDelete(expense)}
//             >
//               Delete Transaction
//             </MenuItem>
//           </MenuList>
//         </Menu>
//       </HStack>
//     );
//   };

//   // Show loading spinner while fetching data
//   if (loading) {
//     return (
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
//             Recent Transactions
//           </Heading>
//           <Button variant="ghost" size="sm" colorScheme="blue">
//             View All
//           </Button>
//         </HStack>
        
//         <Center py={8}>
//           <VStack spacing={3}>
//             <Spinner size="md" color="blue.500" />
//             <Text color="gray.500" fontSize="sm">
//               Loading transactions...
//             </Text>
//           </VStack>
//         </Center>
//       </Box>
//     );
//   }

//   // Show error state if there's an error
//   if (error) {
//     return (
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
//             Recent Transactions
//           </Heading>
//           <Button variant="ghost" size="sm" colorScheme="blue">
//             View All
//           </Button>
//         </HStack>
        
//         <VStack py={8} spacing={3}>
//           <Text color="red.500" textAlign="center">
//             Error loading transactions
//           </Text>
//           <Text fontSize="sm" color="gray.400" textAlign="center">
//             Please try refreshing the page
//           </Text>
//         </VStack>
//       </Box>
//     );
//   }

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
//             Recent Transactions
//           </Heading>
//           <Button variant="ghost" size="sm" colorScheme="blue">
//             View All
//           </Button>
//         </HStack>

//         {recentExpenses.length === 0 ? (
//           <VStack py={8} spacing={3}>
//             <Text color="gray.500" textAlign="center">
//               No transactions yet
//             </Text>
//             <Text fontSize="sm" color="gray.400" textAlign="center">
//               Add your first expense to see it here
//             </Text>
//           </VStack>
//         ) : (
//           <VStack spacing={0} divider={<Divider />}>
//             {recentExpenses.map((expense, index) => (
//               <TransactionItem key={expense.id || index} expense={expense} />
//             ))}
//           </VStack>
//         )}
        
//         {expenses && expenses.length > limit && (
//           <Box mt={4} textAlign="center">
//             <Button variant="outline" size="sm" colorScheme="blue">
//               Load More Transactions
//             </Button>
//           </Box>
//         )}
//       </Box>

//       <DeleteConfirmation
//         isOpen={isOpen}
//         onClose={onClose}
//         onConfirm={confirmDelete}
//         title="Delete Transaction"
//         message={`Are you sure you want to delete "${selectedExpense?.description}"? This action cannot be undone.`}
//       />
//     </>
//   );
// };

// export default RecentTransactions;
// 
// 
// import React from 'react';
// import {
//   Box,
//   Text,
//   Flex,
//   Icon,
//   Badge,
//   Button,
//   IconButton,
//   VStack,
//   HStack,
//   Divider,
//   useColorModeValue,
//   Skeleton,
//   SkeletonText
// } from '@chakra-ui/react';
// import { useExpenseContext } from '../../context/ExpenseContext';
// import { formatCurrency, formatRelativeDate } from '../../utils/formatters';
// import { Trash2, ArrowUpRight, Calendar, Tag } from 'lucide-react';

// const RecentTransactions = () => {
//   const { getRecentExpenses, deleteExpense, loading } = useExpenseContext();
  
//   const recentExpenses = getRecentExpenses(8);
  
//   const cardBg = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const hoverBg = useColorModeValue('gray.50', 'gray.700');

//   const getCategoryColor = (category) => {
//     const colors = {
//       Food: 'orange',
//       Transportation: 'blue',
//       Healthcare: 'red',
//       Housing: 'green',
//       Education: 'purple',
//       Entertainment: 'pink',
//       Shopping: 'yellow',
//       Other: 'gray'
//     };
//     return colors[category] || colors.Other;
//   };

//   if (loading) {
//     return (
//       <Box bg={cardBg} rounded="lg" shadow="sm" border="1px" borderColor={borderColor} p={6}>
//         <Skeleton height="24px" width="200px" mb={4} />
//         <VStack spacing={3}>
//           {[...Array(5)].map((_, i) => (
//             <Box key={i} width="100%">
//               <Skeleton height="64px" rounded="md" />
//             </Box>
//           ))}
//         </VStack>
//       </Box>
//     );
//   }

//   return (
//     <Box bg={cardBg} rounded="lg" shadow="sm" border="1px" borderColor={borderColor}>
//       <Box p={6} borderBottom="1px" borderColor={borderColor}>
//         <Flex justify="space-between" align="center">
//           <Text fontSize="lg" fontWeight="semibold" color="gray.900">
//             <Icon as={Calendar} w={5} h={5} mr={2} color="blue.500" />
//             Recent Transactions
//           </Text>
//           <Button
//             variant="ghost"
//             colorScheme="blue"
//             size="sm"
//             rightIcon={<Icon as={ArrowUpRight} w={4} h={4} />}
//           >
//             View All
//           </Button>
//         </Flex>
//       </Box>
      
//       <Box>
//         {recentExpenses.length === 0 ? (
//           <Box p={8} textAlign="center">
//             <Icon as={Calendar} w={12} h={12} color="gray.300" mx="auto" mb={4} />
//             <Text color="gray.500" fontSize="sm">No transactions yet</Text>
//             <Text color="gray.400" fontSize="xs" mt={1}>
//               Your recent expenses will appear here
//             </Text>
//           </Box>
//         ) : (
//           <VStack spacing={0} divider={<Divider />}>
//             {recentExpenses.map((expense) => (
//               <Box
//                 key={expense.id}
//                 p={4}
//                 w="100%"
//                 _hover={{ bg: hoverBg }}
//                 transition="background-color 0.2s"
//                 role="group"
//               >
//                 <Flex justify="space-between" align="center">
//                   <Box flex={1} minW={0}>
//                     <Flex justify="space-between" align="center" mb={2}>
//                       <Text fontWeight="medium" color="gray.900" truncate pr={2}>
//                         {expense.description}
//                       </Text>
//                       <Text fontWeight="semibold" color="red.500" flexShrink={0}>
//                         {formatCurrency(expense.amount)}
//                       </Text>
//                     </Flex>
//                     <Flex justify="space-between" align="center">
//                       <HStack spacing={2}>
//                         <Badge
//                           colorScheme={getCategoryColor(expense.category)}
//                           variant="subtle"
//                           fontSize="xs"
//                         >
//                           <Icon as={Tag} w={3} h={3} mr={1} />
//                           {expense.category}
//                         </Badge>
//                       </HStack>
//                       <Text fontSize="sm" color="gray.500">
//                         {formatRelativeDate(expense.date)}
//                       </Text>
//                     </Flex>
//                   </Box>
//                   <IconButton
//                     icon={<Icon as={Trash2} w={4} h={4} />}
//                     size="sm"
//                     variant="ghost"
//                     colorScheme="red"
//                     onClick={() => deleteExpense(expense.id)}
//                     title="Delete transaction"
//                     ml={3}
//                     opacity={0}
//                     _groupHover={{ opacity: 1 }}
//                     transition="opacity 0.2s"
//                   />
//                 </Flex>
//               </Box>
//             ))}
//           </VStack>
//         )}
//       </Box>
//     </Box>
//   );
// };
// console.log("Recent Expenses:", recentExpenses);


// export default RecentTransactions;
// import React from 'react';
// import {
//   Box,
//   Text,
//   Flex,
//   Icon,
//   Badge,
//   Button,
//   IconButton,
//   VStack,
//   HStack,
//   Divider,
//   useColorModeValue,
//   Skeleton,
// } from '@chakra-ui/react';
// import { useExpenseContext } from '../../context/ExpenseContext';
// import { formatCurrency, formatRelativeDate } from '../../utils/formatters';
// import { Trash2, ArrowUpRight, Calendar, Tag } from 'lucide-react';

// const RecentTransactions = () => {
//   const { getRecentExpenses, deleteExpense, loading } = useExpenseContext();
  
//   const recentExpenses = getRecentExpenses(8);
  
//   const cardBg = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const hoverBg = useColorModeValue('gray.50', 'gray.700');

//   const getCategoryColor = (category) => {
//     const colors = {
//       Food: 'orange',
//       Transportation: 'blue',
//       Healthcare: 'red',
//       Housing: 'green',
//       Education: 'purple',
//       Entertainment: 'pink',
//       Shopping: 'yellow',
//       Other: 'gray'
//     };
//     return colors[category] || colors.Other;
//   };

//   if (loading) {
//     return (
//       <Box bg={cardBg} rounded="lg" shadow="sm" border="1px" borderColor={borderColor} p={6}>
//         <Skeleton height="24px" width="200px" mb={4} />
//         <VStack spacing={3}>
//           {[...Array(5)].map((_, i) => (
//             <Box key={i} width="100%">
//               <Skeleton height="64px" rounded="md" />
//             </Box>
//           ))}
//         </VStack>
//       </Box>
//     );
//   }

//   return (
//     <Box bg={cardBg} rounded="lg" shadow="sm" border="1px" borderColor={borderColor}>
//       <Box p={6} borderBottom="1px" borderColor={borderColor}>
//         <Flex justify="space-between" align="center">
//           <Text fontSize="lg" fontWeight="semibold" color="gray.900">
//             <Icon as={Calendar} w={5} h={5} mr={2} color="blue.500" />
//             Recent Transactions
//           </Text>
//           <Button
//             variant="ghost"
//             colorScheme="blue"
//             size="sm"
//             rightIcon={<Icon as={ArrowUpRight} w={4} h={4} />}
//           >
//             View All
//           </Button>
//         </Flex>
//       </Box>
      
//       <Box>
//         {recentExpenses.length === 0 ? (
//           <Box p={8} textAlign="center">
//             <Icon as={Calendar} w={12} h={12} color="gray.300" mx="auto" mb={4} />
//             <Text color="gray.500" fontSize="sm">No transactions yet</Text>
//             <Text color="gray.400" fontSize="xs" mt={1}>
//               Your recent expenses will appear here
//             </Text>
//           </Box>
//         ) : (
//           <VStack spacing={0} divider={<Divider />}>
//             {recentExpenses.map((expense) => (
//               <Box
//                 key={expense.id}
//                 p={4}
//                 w="100%"
//                 _hover={{ bg: hoverBg }}
//                 transition="background-color 0.2s"
//                 role="group"
//               >
//                 <Flex justify="space-between" align="center">
//                   <Box flex={1} minW={0}>
//                     <Flex justify="space-between" align="center" mb={2}>
//                       <Text fontWeight="medium" color="gray.900" pr={2} isTruncated>
//                         {expense.description}
//                       </Text>
//                       <Text fontWeight="semibold" color="red.500" flexShrink={0}>
//                         {formatCurrency(expense.amount)}
//                       </Text>
//                     </Flex>
//                     <Flex justify="space-between" align="center">
//                       <HStack spacing={2}>
//                         <Badge
//                           colorScheme={getCategoryColor(expense.category)}
//                           variant="subtle"
//                           fontSize="xs"
//                         >
//                           <Icon as={Tag} w={3} h={3} mr={1} />
//                           {expense.category}
//                         </Badge>
//                       </HStack>
//                       <Text fontSize="sm" color="gray.500">
//                         {formatRelativeDate(expense.date)}
//                       </Text>
//                     </Flex>
//                   </Box>
//                   <IconButton
//                     icon={<Icon as={Trash2} w={4} h={4} />}
//                     size="sm"
//                     variant="ghost"
//                     colorScheme="red"
//                     onClick={() => deleteExpense(expense.id)}
//                     title="Delete transaction"
//                     ml={3}
//                     opacity={0}
//                     _groupHover={{ opacity: 1 }}
//                     transition="opacity 0.2s"
//                   />
//                 </Flex>
//               </Box>
//             ))}
//           </VStack>
//         )}
//       </Box>
//     </Box>
//   );
// };

// export default RecentTransactions;
import React from 'react';
import { 
  Box, 
  Text, 
  SimpleGrid, 
  Flex, 
  Icon,
  useColorModeValue 
} from '@chakra-ui/react';
import { useExpenseContext } from '../../context/ExpenseContext';
import { formatCurrency } from '../../utils/formatters';
import { CreditCard, Target, TrendingUp } from 'lucide-react';

const StatsCards = () => {
  const {
    getThisMonthTotal,
    getRemainingBudget,
    monthlyBudget,
    getCurrentMonthExpenses,
    getDailyAverage
  } = useExpenseContext();

  // Safe fallback values to prevent crash
  const thisMonthTotal = typeof getThisMonthTotal === 'function' ? getThisMonthTotal() || 0 : 0;
  const remainingBudget = typeof getRemainingBudget === 'function' ? getRemainingBudget() || 0 : 0;
  const currentExpenses = typeof getCurrentMonthExpenses === 'function' ? getCurrentMonthExpenses() || [] : [];
  const expenseCount = Array.isArray(currentExpenses) ? currentExpenses.length : 0;
  const dailyAverage = typeof getDailyAverage === 'function' ? getDailyAverage() || 0 : 0;

  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const stats = [
    {
      title: 'Total Spent This Month',
      value: formatCurrency(thisMonthTotal),
      icon: CreditCard,
      color: 'red.500',
      bgColor: 'red.50',
      change: `${expenseCount} transactions`,
    },
    {
      title: 'Remaining Budget',
      value: formatCurrency(remainingBudget),
      icon: Target,
      color: remainingBudget >= 0 ? 'green.500' : 'red.500',
      bgColor: remainingBudget >= 0 ? 'green.50' : 'red.50',
      change: remainingBudget >= 0 ? 'Under budget' : 'Over budget',
    },
    {
      title: 'Monthly Budget',
      value: formatCurrency(monthlyBudget || 0),
      icon: Target,
      color: 'blue.500',
      bgColor: 'blue.50',
      change:
        monthlyBudget > 0
          ? `${((thisMonthTotal / monthlyBudget) * 100).toFixed(1)}% used`
          : 'No budget set',
    },
    {
      title: 'Daily Average',
      value: formatCurrency(dailyAverage),
      icon: TrendingUp,
      color: 'purple.500',
      bgColor: 'purple.50',
      change: 'This month',
    }
  ];

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
      {stats.map((stat, index) => (
        <Box
          key={index}
          bg={cardBg}
          p={6}
          rounded="lg"
          shadow="sm"
          border="1px"
          borderColor={borderColor}
          _hover={{ shadow: 'md' }}
          transition="all 0.2s"
        >
          <Flex justify="space-between" align="center">
            <Box flex={1}>
              <Text fontSize="sm" fontWeight="medium" color="gray.600" mb={1}>
                {stat.title}
              </Text>
              <Text fontSize="2xl" fontWeight="bold" color={stat.color} mb={1}>
                {stat.value}
              </Text>
              <Text fontSize="xs" color="gray.500">
                {stat.change}
              </Text>
            </Box>
            <Box p={3} rounded="full" bg={stat.bgColor} flexShrink={0}>
              <Icon as={stat.icon} w={6} h={6} color={stat.color} />
            </Box>
          </Flex>
        </Box>
      ))}
    </SimpleGrid>
  );
};

export default StatsCards;
