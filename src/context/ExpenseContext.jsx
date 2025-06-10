
import { createContext, useContext, useReducer, useEffect } from 'react'
import { useLocalStorage } from '../hooks/useLocalStorage'



const ExpenseContext = createContext()

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EXPENSES':
      return { ...state, expenses: action.payload }
    case 'ADD_EXPENSE':
      return { ...state, expenses: [...state.expenses, action.payload] }
    case 'DELETE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.filter(expense => expense.id !== action.payload)
      }
    case 'UPDATE_EXPENSE':
      return {
        ...state,
        expenses: state.expenses.map(expense =>
          expense.id === action.payload.id ? action.payload : expense
        )
      }
    default:
      return state
  }
}

// Initial sample data
const initialExpenses = [
  { 
    id: '1', 
    title: 'Grocery Shopping', 
    amount: 125.50, 
    category: 'food', 
    date: new Date().toISOString(), 
    description: 'Weekly groceries from supermarket' 
  },
  { 
    id: '2', 
    title: 'Gas Station', 
    amount: 45.00, 
    category: 'transport', 
    date: new Date(Date.now() - 86400000).toISOString(), 
    description: 'Fuel for car' 
  },
  { 
    id: '3', 
    title: 'Netflix Subscription', 
    amount: 15.99, 
    category: 'entertainment', 
    date: new Date(Date.now() - 172800000).toISOString(), 
    description: 'Monthly streaming subscription' 
  },
  { 
    id: '4', 
    title: 'Coffee Shop', 
    amount: 8.50, 
    category: 'food', 
    date: new Date(Date.now() - 259200000).toISOString(), 
    description: 'Morning coffee and pastry' 
  },
  { 
    id: '5', 
    title: 'Electricity Bill', 
    amount: 89.30, 
    category: 'bills', 
    date: new Date(Date.now() - 345600000).toISOString(), 
    description: 'Monthly utility bill' 
  },
  { 
    id: '6', 
    title: 'Online Shopping', 
    amount: 67.99, 
    category: 'shopping', 
    date: new Date(Date.now() - 432000000).toISOString(), 
    description: 'Clothing and accessories' 
  }
]

export const ExpenseProvider = ({ children }) => {
  const [storedExpenses, setStoredExpenses] = useLocalStorage('expenses', initialExpenses)
  const [state, dispatch] = useReducer(expenseReducer, {
    expenses: storedExpenses
  })

  // Update localStorage whenever expenses change
  useEffect(() => {
    setStoredExpenses(state.expenses)
  }, [state.expenses, setStoredExpenses])

  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      date: new Date().toISOString()
    }
    dispatch({ type: 'ADD_EXPENSE', payload: newExpense })
  }

  const deleteExpense = (id) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: id })
  }

  const updateExpense = (expense) => {
    dispatch({ type: 'UPDATE_EXPENSE', payload: expense })
  }

  return (
    <ExpenseContext.Provider value={{
      expenses: state.expenses,
      addExpense,
      deleteExpense,
      updateExpense
    }}>
      {children}
    </ExpenseContext.Provider>
  )
}

export const useExpenseContext = () => {
  const context = useContext(ExpenseContext)
  if (!context) {
    throw new Error('useExpenseContext must be used within ExpenseProvider')
  }
  return context
}