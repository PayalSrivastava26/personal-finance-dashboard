
// import React from 'react'
// import { Box, Heading, Text, VStack } from '@chakra-ui/react'
// import StatsCards from './StatsCards'
// import ExpenseChart from './ExpenseChart'
// // import RecentTransactions from './RecentTransactions'
// import MonthlyBudget from './MonthlyBudget'

// const Dashboard = () => {
//   return (
//     <VStack spacing={8} align="stretch">
//       <Box>
//         <Heading size="xl" mb={2}>
//           Welcome back! 👋
//         </Heading>
//         <Text color="gray.500" fontSize="lg">
//           Here's what's happening with your finances today.
//         </Text>
//       </Box>
      
//       <StatsCards />
//       <ExpenseChart />
//       <Box display="grid" gridTemplateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
//         {/* <RecentTransactions /> */}
//         <MonthlyBudget />
//       </Box>
//     </VStack>
//   )
// }

// export default Dashboard
// import React from 'react'
// import StatsCards from './StatsCards'
// import { Box, Text } from '@chakra-ui/react'

// const Dashboard = () => {
//   return (
//     <Box p={6}>
//       <Text>🚀 Dashboard loaded</Text>
//     </Box>
//   )
// }

// export default Dashboard
// src/components/dashboard/Dashboard.jsx

// import React from 'react';
// import { Box, VStack } from '@chakra-ui/react';
// import StatsCards from './StatsCards';

// const Dashboard = () => {
//   return (
//     <Box p={4}>
//       <VStack spacing={6} align="stretch">
//         <StatsCards />
//       </VStack>
//     </Box>
//   );
// };

// export default Dashboard;


// src/components/dashboard/Dashboard.jsx

// import React from 'react';
// import { Box, VStack } from '@chakra-ui/react';
// import StatsCards from './StatsCards';
// import ExpenseChart from './ExpenseChart';

// const Dashboard = () => {
//   return (
//     <Box p={4}>
//       <VStack spacing={6} align="stretch">
//         <StatsCards />
//         <ExpenseChart />
//       </VStack>
//     </Box>
//   );
// };

// export default Dashboard;

// import React from 'react';
import { Box, VStack } from '@chakra-ui/react';
import StatsCards from './StatsCards';
import ExpenseChart from './ExpenseChart';
import NotificationPanel from '../ui/NotificationPanel';
import MonthlyBudget from './MonthlyBudget';

const Dashboard = () => {
  return (
    <Box p={4}>
      <VStack spacing={6} align="stretch">
        <NotificationPanel />   {/* 👈 Display notifications at the top */}
        <StatsCards />
        <ExpenseChart />
        <MonthlyBudget />
      </VStack>
    </Box>
  );
};

export default Dashboard;
