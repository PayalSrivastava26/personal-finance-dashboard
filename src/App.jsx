// src/App.jsx
import React, { useState } from 'react'
import { Box } from '@chakra-ui/react'
import Layout from './components/layout/Layout'
import Dashboard from './components/dashboard/Dashboard'
import AddExpense from './components/expenses/AddExpense'
import ExpenseList from './components/expenses/ExpenseList'
import Analytics from './components/analytics/Analytics'
// import Settings from './components/settings/Settings'
import { ExpenseProvider } from './context/ExpenseContext'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'add-expense':
        return <AddExpense />
      case 'expenses':
        return <ExpenseList />
      case 'analytics':
        return <Analytics />
      case 'settings':
        return <Settings />
      default:
        return <Dashboard />
    }
  }

  return (
    <ExpenseProvider>
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        <Box p={6}>
          {renderContent()}
        </Box>
      </Layout>
    </ExpenseProvider>
  )
}

export default App