// src/components/dashboard/Dashboard.jsx
import React from 'react'
import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import StatsCards from './StatsCards'
import ExpenseChart from './ExpenseChart'
import RecentTransactions from './RecentTransactions'
import MonthlyBudget from './MonthlyBudget'

const Dashboard = () => {
  return (
    <VStack spacing={8} align="stretch">
      <Box>
        <Heading size="xl" mb={2}>
          Welcome back! 👋
        </Heading>
        <Text color="gray.500" fontSize="lg">
          Here's what's happening with your finances today.
        </Text>
      </Box>
      
      <StatsCards />
      <ExpenseChart />
      <Box display="grid" gridTemplateColumns={{ base: '1fr', lg: '2fr 1fr' }} gap={6}>
        <RecentTransactions />
        <MonthlyBudget />
      </Box>
    </VStack>
  )
}

export default Dashboard