// // src/App.jsx
// import React, { useState } from 'react'
// import { Box } from '@chakra-ui/react'
// import Layout from './components/layout/Layout'
// import Dashboard from './components/dashboard/Dashboard'
// import AddExpense from './components/expenses/AddExpense'
// import ExpenseList from './components/expenses/ExpenseList'
// import Analytics from './components/analytics/Analytics'


// // In your routing setup:
// <Route path="/settings" element={<Settings />} />

// import { ExpenseProvider } from './context/ExpenseContext'

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard')

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <Dashboard />
//       case 'add-expense':
//         return <AddExpense />
//       case 'expenses':
//         return <ExpenseList />
//       case 'analytics':
//         return <Analytics />
//       case 'settings':
//         return <Settings />
//       default:
//         return <Dashboard />
//     }
//   }

//   return (
//     <ExpenseProvider>
//       <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
//         <Box p={6}>
//           {renderContent()}
//         </Box>
//       </Layout>
//     </ExpenseProvider>
//   )
// }

// export default App
// src/App.jsx
// import React, { useState } from 'react'
// import { Box } from '@chakra-ui/react'
// import Layout from './components/layout/Layout'
// import Dashboard from './components/dashboard/Dashboard'
// import AddExpense from './components/expenses/AddExpense'
// import ExpenseList from './components/expenses/ExpenseList'
// import Analytics from './components/analytics/Analytics'

// import { ExpenseProvider } from './context/ExpenseContext'

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard')

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <Dashboard />
//       case 'add-expense':
//         return <AddExpense />
//       case 'expenses':
//         return <ExpenseList />
//       case 'analytics':
//         return <Analytics />
//       /
//       default:
//         return <Dashboard />
//     }
//   }

//   return (
//     <ExpenseProvider>
//       <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
//         <Box p={6}>
//           {renderContent()}
//         </Box>
//       </Layout>
//     </ExpenseProvider>
//   )
// }

// export default App
// import React, { useState } from 'react'
// import { ChakraProvider, Box } from '@chakra-ui/react'
// import theme from './theme/theme'
// import Layout from './components/layout/Layout'
// import Dashboard from './components/dashboard/Dashboard'
// import AddExpense from './components/expenses/AddExpense'
// import ExpenseList from './components/expenses/ExpenseList'
// // Remove this line: import Analytics from './components/analytics/Analytics'
// import { ExpenseProvider } from './context/ExpenseContext'

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard')

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <Dashboard />
//       case 'add-expense':
//         return <AddExpense />
//       case 'expenses':
//         return <ExpenseList />
//       // Comment out or remove this case:
//       // case 'analytics':
//       //   return <Analytics />
//       default:
//         return <Dashboard />
//     }
//   }

//   return (
//     <ChakraProvider theme={theme}>
//       <ExpenseProvider>
//         <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
//           <Box p={6}>
//             {renderContent()}
//           </Box>
//         </Layout>
//       </ExpenseProvider>
//     </ChakraProvider>
//   )
// }

// export default App
// import React, { useState } from 'react'
// import { ChakraProvider, Box } from '@chakra-ui/react'
// import theme from './theme/theme'
// import Layout from './components/layout/Layout'
// import Dashboard from './components/dashboard/Dashboard'
// import AddExpense from './components/expenses/AddExpense'
// import ExpenseList from './components/expenses/ExpenseList'
// // Removed Analytics import - component doesn't exist
// import { ExpenseProvider } from './context/ExpenseContext'

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard')

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <Dashboard />
//       case 'add-expense':
//         return <AddExpense />
//       case 'expenses':
//         return <ExpenseList />
//       // Removed analytics case - component doesn't exist
//       default:
//         return <Dashboard />
//     }
//   }

//   return (
//     <ChakraProvider theme={theme}>
//       <ExpenseProvider>
//         <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
//           <Box p={6}>
//             {renderContent()}
//           </Box>
//         </Layout>
//       </ExpenseProvider>
//     </ChakraProvider>
//   )
// }

// export default App
// import React, { useState } from 'react'
// import { ChakraProvider, Box } from '@chakra-ui/react'
// // Comment out the theme import temporarily
// // import theme from './theme/theme'
// import Layout from './components/layout/Layout'
// import Dashboard from './components/dashboard/Dashboard'
// import AddExpense from './components/expenses/AddExpense'
// import ExpenseList from './components/expenses/ExpenseList'
// import { ExpenseProvider } from './context/ExpenseContext'

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard')

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <Dashboard />
//       case 'add-expense':
//         return <AddExpense />
//       case 'expenses':
//         return <ExpenseList />
//       default:
//         return <Dashboard />
//     }
//   }

//   return (
//     <ChakraProvider> {/* Remove theme prop temporarily */}
//       <ExpenseProvider>
//         <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
//           <Box p={6}>
//             {renderContent()}
//           </Box>
//         </Layout>
//       </ExpenseProvider>
//     </ChakraProvider>
//   )
// }

// export default App

// src/App.jsx
// src/App.jsx
// import React, { useState } from 'react'
// import { ChakraProvider, Box } from '@chakra-ui/react'
// import Layout from './components/layout/Layout'
// import Dashboard from './components/dashboard/Dashboard'
// import AddExpense from './components/expenses/AddExpense'
// import ExpenseList from './components/expenses/ExpenseList'
// import { ExpenseProvider } from './context/ExpenseContext'

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard')

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <Dashboard />
//       case 'add-expense':
//         return <AddExpense />
//       case 'expenses':
//         return <ExpenseList />
//       default:
//         return <Dashboard />
//     }
//   }

//   return (
//     <ChakraProvider>
//       <ExpenseProvider>
//         <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
//           <Box p={6}>
//             {renderContent()}
//           </Box>
//         </Layout>
//       </ExpenseProvider>
//     </ChakraProvider>
//   )
// }

// export default App
// import React, { useState } from 'react'
// import { ChakraProvider, Box } from '@chakra-ui/react'
// import Layout from './components/layout/Layout'
// import Dashboard from './components/dashboard/Dashboard'
// import AddExpense from './components/expenses/AddExpense'
// import ExpenseList from './components/expenses/ExpenseList'
// import SetBudget from './components/budget/SetBudget'
// import { ExpenseProvider } from './context/ExpenseContext'
// import { BudgetProvider } from './context/BudgetContext'

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard')
  
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <Dashboard />
//       case 'add-expense':
//         return <AddExpense />
//       case 'expenses':
//         return <ExpenseList />
//       case 'set-budget':
//         return <SetBudget />
//       default:
//         return <Dashboard />
//     }
//   }
  
//   return (
//     <ChakraProvider>
//       <ExpenseProvider>
//         <BudgetProvider>
//           <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
//             <Box p={6}>
//               {renderContent()}
//             </Box>
//           </Layout>
//         </BudgetProvider>
//       </ExpenseProvider>
//     </ChakraProvider>
//   )
// }

// export default App
// import React, { useState } from 'react'
// import { ChakraProvider, Box } from '@chakra-ui/react'
// import Layout from './components/layout/Layout'
// import Dashboard from './components/dashboard/Dashboard'
// import AddExpense from './components/expenses/AddExpense'
// import ExpenseList from './components/expenses/ExpenseList'
// import SetBudget from './components/budget/SetBudget'
// import settings from './components/Settings'
// import { ExpenseProvider } from './context/ExpenseContext'
// import { BudgetProvider } from './context/BudgetContext'

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard')
  
//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <Dashboard />
//       case 'add-expense':
//         return <AddExpense />
//       case 'expenses':
//         return <ExpenseList />
//       case 'set-budget':
//         return <SetBudget />
//       case 'settings':
//         return <Settings />
//       default:
//         return <Dashboard />
//     }
//   }
  
//   return (
//     <ChakraProvider>
//       <ExpenseProvider>
//         <BudgetProvider>
//           <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
//             <Box p={6}>
//               {renderContent()}
//             </Box>
//           </Layout>
//         </BudgetProvider>
//       </ExpenseProvider>
//     </ChakraProvider>
//   )
// }

// export default App
// import React, { useState } from 'react';
// import { ChakraProvider, Box } from '@chakra-ui/react';
// import Layout from './components/layout/Layout';
// import Dashboard from './components/dashboard/Dashboard';
// import AddExpense from './components/expenses/AddExpense';
// import ExpenseList from './components/expenses/ExpenseList';
// import SetBudget from './components/budget/SetBudget';
// import Settings from './components/settings/Settings'; // ✅ fixed import casing
// import { ExpenseProvider } from './context/ExpenseContext';
// import { BudgetProvider } from './context/BudgetContext';

// function App() {
//   const [activeTab, setActiveTab] = useState('dashboard');

//   const renderContent = () => {
//     switch (activeTab) {
//       case 'dashboard':
//         return <Dashboard />;
//       case 'add-expense':
//         return <AddExpense />;
//       case 'expenses':
//         return <ExpenseList />;
//       case 'set-budget':
//         return <SetBudget />;
//       case 'settings':
//         return <Settings />;
//       default:
//         return <Dashboard />;
//     }
//   };

//   return (
//     <ChakraProvider>
//       <ExpenseProvider>
//         <BudgetProvider>
//           <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
//             <Box p={6}>
//               {renderContent()}
//             </Box>
//           </Layout>
//         </BudgetProvider>
//       </ExpenseProvider>
//     </ChakraProvider>
//   );
// }

// export default App;
// src/App.jsx
import React, { useState } from 'react';
import { ChakraProvider, Box } from '@chakra-ui/react';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import AddExpense from './components/expenses/AddExpense';
import ExpenseList from './components/expenses/ExpenseList';
import SetBudget from './components/budget/SetBudget';
import Settings from './components/settings/Settings';
import { ExpenseProvider } from './context/ExpenseContext';
import { BudgetProvider } from './context/BudgetContext';
import { NotificationProvider } from './context/NotificationContext';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'add-expense':
        return <AddExpense />;
      case 'expenses':
        return <ExpenseList />;
      case 'set-budget':
        return <SetBudget />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ChakraProvider>
      <NotificationProvider>
        <ExpenseProvider>
          <BudgetProvider>
            <Box minH="100vh" bg="gray.50" _dark={{ bg: 'gray.900' }}>
              <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
                {renderContent()}
              </Layout>
            </Box>
          </BudgetProvider>
        </ExpenseProvider>
      </NotificationProvider>
    </ChakraProvider>
  );
}

export default App;