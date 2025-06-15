// import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
// import { useLocalStorage } from '../hooks/useLocalStorage';

// const ExpenseContext = createContext();

// const expenseReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_EXPENSES':
//       return { ...state, expenses: action.payload };
//     case 'ADD_EXPENSE':
//       return { ...state, expenses: [action.payload, ...state.expenses] };
//     case 'DELETE_EXPENSE':
//       return {
//         ...state,
//         expenses: state.expenses.filter(expense => expense.id !== action.payload),
//       };
//     case 'UPDATE_EXPENSE':
//       return {
//         ...state,
//         expenses: state.expenses.map(expense =>
//           expense.id === action.payload.id ? { ...expense, ...action.payload } : expense
//         ),
//       };
//     default:
//       return state;
//   }
// };

// const initialExpenses = [
//   {
//     id: '1',
//     description: 'Grocery Shopping',
//     amount: 85.5,
//     category: 'Food',
//     date: new Date('2025-06-12'),
//     createdAt: new Date('2025-06-12'),
//   },
//   {
//     id: '2',
//     description: 'Gas Station',
//     amount: 45.0,
//     category: 'Transportation',
//     date: new Date('2025-06-11'),
//     createdAt: new Date('2025-06-11'),
//   },
//   {
//     id: '3',
//     description: 'Coffee Shop',
//     amount: 12.75,
//     category: 'Food',
//     date: new Date('2025-06-10'),
//     createdAt: new Date('2025-06-10'),
//   },
//   {
//     id: '4',
//     description: 'Doctor Visit',
//     amount: 150.0,
//     category: 'Healthcare',
//     date: new Date('2025-06-09'),
//     createdAt: new Date('2025-06-09'),
//   },
//   {
//     id: '5',
//     description: 'Rent Payment',
//     amount: 1200.0,
//     category: 'Housing',
//     date: new Date('2025-06-01'),
//     createdAt: new Date('2025-06-01'),
//   },
//   {
//     id: '6',
//     description: 'Internet Bill',
//     amount: 79.99,
//     category: 'Housing',
//     date: new Date('2025-06-01'),
//     createdAt: new Date('2025-06-01'),
//   },
//   {
//     id: '7',
//     description: 'Book Purchase',
//     amount: 24.99,
//     category: 'Education',
//     date: new Date('2025-05-28'),
//     createdAt: new Date('2025-05-28'),
//   },
// ];

// export const ExpenseProvider = ({ children }) => {
//   const [storedExpenses, setStoredExpenses] = useLocalStorage('expenses', initialExpenses);
//   const [state, dispatch] = useReducer(expenseReducer, { expenses: storedExpenses });
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     setStoredExpenses(state.expenses);
//   }, [state.expenses, setStoredExpenses]);

//   const addExpense = async (expenseData) => {
//     setLoading(true);
//     try {
//       const newExpense = {
//         id: Date.now().toString(),
//         ...expenseData,
//         createdAt: new Date(),
//         date: new Date(expenseData.date),
//       };
//       dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
//       setLoading(false);
//       return newExpense;
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//       throw err;
//     }
//   };

//   const deleteExpense = async (id) => {
//     setLoading(true);
//     try {
//       dispatch({ type: 'DELETE_EXPENSE', payload: id });
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//       throw err;
//     }
//   };

//   const updateExpense = async (id, updates) => {
//     setLoading(true);
//     try {
//       const updatedExpense = { id, ...updates };
//       dispatch({ type: 'UPDATE_EXPENSE', payload: updatedExpense });
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//       throw err;
//     }
//   };

//   const getMonthlyStats = () => {
//     const currentMonth = new Date().getMonth();
//     const currentYear = new Date().getFullYear();
//     const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//     const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

//     const thisMonthExpenses = state.expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
//     });

//     const lastMonthExpenses = state.expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate.getMonth() === lastMonth && expenseDate.getFullYear() === lastMonthYear;
//     });

//     const thisMonthTotal = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
//     const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
//     const totalExpenses = state.expenses.reduce((sum, expense) => sum + expense.amount, 0);

//     return {
//       thisMonth: thisMonthTotal,
//       lastMonth: lastMonthTotal,
//       total: totalExpenses,
//       thisMonthTransactions: thisMonthExpenses.length,
//       totalTransactions: state.expenses.length,
//       avgDaily: thisMonthTotal / new Date().getDate(),
//     };
//   };

//   const getExpensesByCategory = () => {
//     const categories = {};
//     state.expenses.forEach(expense => {
//       if (!categories[expense.category]) {
//         categories[expense.category] = {
//           total: 0,
//           count: 0,
//           expenses: []
//         };
//       }
//       categories[expense.category].total += expense.amount;
//       categories[expense.category].count += 1;
//       categories[expense.category].expenses.push(expense);
//     });
//     return categories;
//   };

//   const value = {
//     expenses: state.expenses,
//     loading,
//     error,
//     addExpense,
//     deleteExpense,
//     updateExpense,
//     getMonthlyStats,
//     getExpensesByCategory,
//     stats: getMonthlyStats(),
//   };

//   return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
// };

// export const useExpenseContext = () => {
//   const context = useContext(ExpenseContext);
//   if (!context) {
//     throw new Error('useExpenseContext must be used within ExpenseProvider');
//   }
//   return context;
// };

// export default ExpenseContext;


// import React, { createContext, useContext, useEffect, useReducer, useState } from 'react';
// import { db } from '../config/firebase';
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   updateDoc,
//   doc,
//   onSnapshot
// } from 'firebase/firestore';

// const ExpenseContext = createContext();

// const expenseReducer = (state, action) => {
//   switch (action.type) {
//     case 'SET_EXPENSES':
//       return { ...state, expenses: action.payload };
//     default:
//       return state;
//   }
// };

// export const ExpenseProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(expenseReducer, { expenses: [] });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // 🔄 Fetch expenses from Firestore in real-time
//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(db, 'expenses'),
//       (snapshot) => {
//         const expensesData = snapshot.docs.map(doc => ({
//           id: doc.id,
//           ...doc.data()
//         }));
//         dispatch({ type: 'SET_EXPENSES', payload: expensesData });
//         setLoading(false);
//       },
//       (err) => {
//         console.error("Firestore fetch error:", err);
//         setError(err.message);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe(); // Clean up
//   }, []);

//   const addExpense = async (expenseData) => {
//     setLoading(true);
//     try {
//       const newExpense = {
//         ...expenseData,
//         createdAt: new Date().toISOString(),
//         date: new Date(expenseData.date).toISOString(),
//       };
//       const docRef = await addDoc(collection(db, 'expenses'), newExpense);
//       setLoading(false);
//       return { id: docRef.id, ...newExpense };
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//       throw err;
//     }
//   };

//   const deleteExpense = async (id) => {
//     setLoading(true);
//     try {
//       await deleteDoc(doc(db, 'expenses', id));
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//       throw err;
//     }
//   };

//   const updateExpense = async (id, updates) => {
//     setLoading(true);
//     try {
//       const updatedExpense = {
//         ...updates,
//         updatedAt: new Date().toISOString()
//       };
//       await updateDoc(doc(db, 'expenses', id), updatedExpense);
//       setLoading(false);
//     } catch (err) {
//       setError(err.message);
//       setLoading(false);
//       throw err;
//     }
//   };

//   const getMonthlyStats = () => {
//     const now = new Date();
//     const currentMonth = now.getMonth();
//     const currentYear = now.getFullYear();
//     const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
//     const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

//     const thisMonthExpenses = state.expenses.filter(expense => {
//       const date = new Date(expense.date);
//       return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
//     });

//     const lastMonthExpenses = state.expenses.filter(expense => {
//       const date = new Date(expense.date);
//       return date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear;
//     });

//     const thisMonthTotal = thisMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
//     const lastMonthTotal = lastMonthExpenses.reduce((sum, e) => sum + e.amount, 0);
//     const totalExpenses = state.expenses.reduce((sum, e) => sum + e.amount, 0);

//     return {
//       thisMonth: thisMonthTotal,
//       lastMonth: lastMonthTotal,
//       total: totalExpenses,
//       thisMonthTransactions: thisMonthExpenses.length,
//       totalTransactions: state.expenses.length,
//       avgDaily: thisMonthTotal / now.getDate(),
//     };
//   };

//   const getExpensesByCategory = () => {
//     const grouped = {};
//     state.expenses.forEach(expense => {
//       const cat = expense.category || 'Others';
//       if (!grouped[cat]) {
//         grouped[cat] = { total: 0, count: 0, expenses: [] };
//       }
//       grouped[cat].total += expense.amount;
//       grouped[cat].count += 1;
//       grouped[cat].expenses.push(expense);
//     });
//     return grouped;
//   };

//   const value = {
//     expenses: state.expenses,
//     loading,
//     error,
//     addExpense,
//     deleteExpense,
//     updateExpense,
//     getMonthlyStats,
//     getExpensesByCategory,
//     stats: getMonthlyStats()
//   };

//   return <ExpenseContext.Provider value={value}>{children}</ExpenseContext.Provider>;
// };

// export const useExpenseContext = () => {
//   const context = useContext(ExpenseContext);
//   if (!context) {
//     throw new Error('useExpenseContext must be used within ExpenseProvider');
//   }
//   return context;
// };

// export default ExpenseContext;
// context/ExpenseContext.jsx

// import { createContext, useContext, useState, useEffect } from 'react';
// import { db } from '../config/firebase';
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   query,
//   orderBy
// } from 'firebase/firestore';

// const ExpenseContext = createContext();

// export const useExpenseContext = () => useContext(ExpenseContext);

// export const ExpenseProvider = ({ children }) => {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const expensesRef = collection(db, 'expenses');

//   // Load expenses from Firestore and listen for real-time updates
//   useEffect(() => {
//     const q = query(expensesRef, orderBy('date', 'desc'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedExpenses = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setExpenses(fetchedExpenses);
//       setLoading(false);
//     });

//     return () => unsubscribe(); // Clean up listener
//   }, []);

//   const addExpense = async (expense) => {
//     try {
//       const newExpense = {
//         ...expense,
//         date: expense.date || new Date().toISOString(),
//         createdAt: new Date().toISOString()
//       };
//       await addDoc(expensesRef, newExpense);
//     } catch (error) {
//       console.error('Error adding expense:', error);
//     }
//   };

//   const deleteExpense = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'expenses', id));
//     } catch (error) {
//       console.error('Error deleting expense:', error);
//     }
//   };

//   const value = {
//     expenses,
//     loading,
//     addExpense,
//     deleteExpense,
//     // Add more functions here as needed
//   };

//   return (
//     <ExpenseContext.Provider value={value}>
//       {children}
//     </ExpenseContext.Provider>
//   );
// };
// import { createContext, useContext, useState, useEffect } from 'react';
// import { db } from '../config/firebase';
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   query,
//   orderBy
// } from 'firebase/firestore';

// const ExpenseContext = createContext();

// export const useExpenseContext = () => useContext(ExpenseContext);

// export const ExpenseProvider = ({ children }) => {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [monthlyBudget, setMonthlyBudget] = useState(2550); // You can make this dynamic later

//   const expensesRef = collection(db, 'expenses');

//   // Load expenses from Firestore and listen for real-time updates
//   useEffect(() => {
//     const q = query(expensesRef, orderBy('date', 'desc'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedExpenses = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setExpenses(fetchedExpenses);
//       setLoading(false);
//     });

//     return () => unsubscribe(); // Clean up listener
//   }, []);

//   const addExpense = async (expense) => {
//     try {
//       const newExpense = {
//         ...expense,
//         date: expense.date || new Date().toISOString(),
//         createdAt: new Date().toISOString()
//       };
//       await addDoc(expensesRef, newExpense);
//     } catch (error) {
//       console.error('Error adding expense:', error);
//     }
//   };

//   const deleteExpense = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'expenses', id));
//     } catch (error) {
//       console.error('Error deleting expense:', error);
//     }
//   };

//   // Utility functions for calculations
//   const getCurrentMonthExpenses = () => {
//     const now = new Date();
//     const currentMonth = now.getMonth();
//     const currentYear = now.getFullYear();
    
//     return expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate.getMonth() === currentMonth && 
//              expenseDate.getFullYear() === currentYear;
//     });
//   };

//   const getThisMonthTotal = () => {
//     return getCurrentMonthExpenses().reduce((total, expense) => {
//       return total + (parseFloat(expense.amount) || 0);
//     }, 0);
//   };

//   const getRemainingBudget = () => {
//     return monthlyBudget - getThisMonthTotal();
//   };

//   const getDailyAverage = () => {
//     const thisMonthExpenses = getCurrentMonthExpenses();
//     const now = new Date();
//     const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
//     const currentDay = now.getDate();
    
//     if (thisMonthExpenses.length === 0) return 0;
    
//     const total = getThisMonthTotal();
//     return total / currentDay;
//   };

//   const getExpensesByCategory = () => {
//     const currentMonthExpenses = getCurrentMonthExpenses();
//     const categoryTotals = {};
    
//     currentMonthExpenses.forEach(expense => {
//       const category = expense.category || 'Other';
//       categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(expense.amount || 0);
//     });
    
//     return categoryTotals;
//   };

//   const getTopCategory = () => {
//     const categoryTotals = getExpensesByCategory();
//     const topCategory = Object.entries(categoryTotals).reduce((max, [category, amount]) => {
//       return amount > max.amount ? { category, amount } : max;
//     }, { category: 'None', amount: 0 });
    
//     return topCategory;
//   };

//   const getMonthlyData = () => {
//     const monthlyData = {};
    
//     expenses.forEach(expense => {
//       const date = new Date(expense.date);
//       const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
//       monthlyData[monthKey] = (monthlyData[monthKey] || 0) + parseFloat(expense.amount || 0);
//     });
    
//     return Object.entries(monthlyData)
//       .sort(([a], [b]) => a.localeCompare(b))
//       .slice(-6) // Last 6 months
//       .map(([month, amount]) => ({
//         month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
//         amount
//       }));
//   };

//   const getBudgetProgress = () => {
//     const spent = getThisMonthTotal();
//     const progress = (spent / monthlyBudget) * 100;
//     return Math.min(progress, 100);
//   };

//   const getCategoryBudgets = () => {
//     // This is a basic implementation - you can enhance this based on your needs
//     const categoryBudgets = {
//       Food: 500,
//       Transportation: 200,
//       Healthcare: 300,
//       Housing: 1200,
//       Education: 0,
//       Other: 350
//     };
    
//     const categorySpending = getExpensesByCategory();
    
//     return Object.entries(categoryBudgets).map(([category, budget]) => ({
//       category,
//       budget,
//       spent: categorySpending[category] || 0,
//       remaining: budget - (categorySpending[category] || 0),
//       progress: budget > 0 ? ((categorySpending[category] || 0) / budget) * 100 : 0
//     }));
//   };

//   const value = {
//     expenses,
//     loading,
//     monthlyBudget,
//     addExpense,
//     deleteExpense,
//     // Calculated values
//     getCurrentMonthExpenses,
//     getThisMonthTotal,
//     getRemainingBudget,
//     getDailyAverage,
//     getExpensesByCategory,
//     getTopCategory,
//     getMonthlyData,
//     getBudgetProgress,
//     getCategoryBudgets,
//     // Setters
//     setMonthlyBudget
//   };

//   return (
//     <ExpenseContext.Provider value={value}>
//       {children}
//     </ExpenseContext.Provider>
//   );
// };


// import { createContext, useContext, useState, useEffect } from 'react';
// import { db } from '../config/firebase';
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   query,
//   orderBy
// } from 'firebase/firestore';

// const ExpenseContext = createContext();

// export const useExpenseContext = () => useContext(ExpenseContext);

// export const ExpenseProvider = ({ children }) => {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [monthlyBudget, setMonthlyBudget] = useState(2550); // You can make this dynamic later

//   const expensesRef = collection(db, 'expenses');

//   // Load expenses from Firestore and listen for real-time updates
//   useEffect(() => {
//     const q = query(expensesRef, orderBy('date', 'desc'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedExpenses = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setExpenses(fetchedExpenses);
//       setLoading(false);
//     });

//     return () => unsubscribe(); // Clean up listener
//   }, []);

//   const addExpense = async (expense) => {
//     try {
//       const newExpense = {
//         ...expense,
//         date: expense.date || new Date().toISOString(),
//         createdAt: new Date().toISOString()
//       };
//       await addDoc(expensesRef, newExpense);
//     } catch (error) {
//       console.error('Error adding expense:', error);
//     }
//   };

//   const deleteExpense = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'expenses', id));
//     } catch (error) {
//       console.error('Error deleting expense:', error);
//     }
//   };

//   // Utility functions for calculations
//   const getCurrentMonthExpenses = () => {
//     const now = new Date();
//     const currentMonth = now.getMonth();
//     const currentYear = now.getFullYear();
    
//     return expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate.getMonth() === currentMonth && 
//              expenseDate.getFullYear() === currentYear;
//     });
//   };

//   const getRecentExpenses = (limit = 5) => {
//     return [...expenses]
//       .sort((a, b) => new Date(b.date) - new Date(a.date))
//       .slice(0, limit);
//   };

//   const getThisMonthTotal = () => {
//     return getCurrentMonthExpenses().reduce((total, expense) => {
//       return total + (parseFloat(expense.amount) || 0);
//     }, 0);
//   };

//   const getRemainingBudget = () => {
//     return monthlyBudget - getThisMonthTotal();
//   };

//   const getDailyAverage = () => {
//     const thisMonthExpenses = getCurrentMonthExpenses();
//     const now = new Date();
//     const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
//     const currentDay = now.getDate();
    
//     if (thisMonthExpenses.length === 0) return 0;
    
//     const total = getThisMonthTotal();
//     return total / currentDay;
//   };

//   const getExpensesByCategory = () => {
//     const currentMonthExpenses = getCurrentMonthExpenses();
//     const categoryTotals = {};
    
//     currentMonthExpenses.forEach(expense => {
//       const category = expense.category || 'Other';
//       categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(expense.amount || 0);
//     });
    
//     return categoryTotals;
//   };

//   const getTopCategory = () => {
//     const categoryTotals = getExpensesByCategory();
//     const topCategory = Object.entries(categoryTotals).reduce((max, [category, amount]) => {
//       return amount > max.amount ? { category, amount } : max;
//     }, { category: 'None', amount: 0 });
    
//     return topCategory;
//   };

//   const getMonthlyData = () => {
//     const monthlyData = {};
    
//     expenses.forEach(expense => {
//       const date = new Date(expense.date);
//       const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
//       monthlyData[monthKey] = (monthlyData[monthKey] || 0) + parseFloat(expense.amount || 0);
//     });
    
//     return Object.entries(monthlyData)
//       .sort(([a], [b]) => a.localeCompare(b))
//       .slice(-6) // Last 6 months
//       .map(([month, amount]) => ({
//         month: new Date(month + '-01').toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
//         amount
//       }));
//   };

//   const getBudgetProgress = () => {
//     const spent = getThisMonthTotal();
//     const progress = (spent / monthlyBudget) * 100;
//     return Math.min(progress, 100);
//   };

//   const getCategoryBudgets = () => {
//     // This is a basic implementation - you can enhance this based on your needs
//     const categoryBudgets = {
//       Food: 500,
//       Transportation: 200,
//       Healthcare: 300,
//       Housing: 1200,
//       Education: 0,
//       Other: 350
//     };
    
//     const categorySpending = getExpensesByCategory();
    
//     return Object.entries(categoryBudgets).map(([category, budget]) => ({
//       category,
//       budget,
//       spent: categorySpending[category] || 0,
//       remaining: budget - (categorySpending[category] || 0),
//       progress: budget > 0 ? ((categorySpending[category] || 0) / budget) * 100 : 0
//     }));
//   };

//   const value = {
//     expenses,
//     loading,
//     monthlyBudget,
//     addExpense,
//     deleteExpense,
//     // Calculated values
//     getCurrentMonthExpenses,
//     getRecentExpenses,
//     getThisMonthTotal,
//     getRemainingBudget,
//     getDailyAverage,
//     getExpensesByCategory,
//     getTopCategory,
//     getMonthlyData,
//     getBudgetProgress,
//     getCategoryBudgets,
//     // Setters
//     setMonthlyBudget
//   };

//   return (
//     <ExpenseContext.Provider value={value}>
//       {children}
//     </ExpenseContext.Provider>
//   );
// };




// import { createContext, useContext, useState, useEffect } from 'react';
// import { db } from '../config/firebase';
// import {
//   collection,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   doc,
//   onSnapshot,
//   query,
//   orderBy
// } from 'firebase/firestore';

// const ExpenseContext = createContext();

// export const useExpenseContext = () => useContext(ExpenseContext);

// export const ExpenseProvider = ({ children }) => {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [monthlyBudget, setMonthlyBudget] = useState(25000); // Budget in INR

//   const expensesRef = collection(db, 'expenses');

//   // Load expenses from Firestore and listen for real-time updates
//   useEffect(() => {
//     const q = query(expensesRef, orderBy('date', 'desc'));
//     const unsubscribe = onSnapshot(q, (snapshot) => {
//       const fetchedExpenses = snapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data(),
//         // Ensure amount is a number
//         amount: parseFloat(doc.data().amount) || 0
//       }));
//       setExpenses(fetchedExpenses);
//       setLoading(false);
//     }, (error) => {
//       console.error('Error fetching expenses:', error);
//       setLoading(false);
//     });

//     return () => unsubscribe(); // Clean up listener
//   }, []);

//   const addExpense = async (expense) => {
//     try {
//       const newExpense = {
//         ...expense,
//         amount: parseFloat(expense.amount) || 0,
//         date: expense.date || new Date().toISOString(),
//         createdAt: new Date().toISOString()
//       };
//       await addDoc(expensesRef, newExpense);
//     } catch (error) {
//       console.error('Error adding expense:', error);
//     }
//   };

//   const deleteExpense = async (id) => {
//     try {
//       await deleteDoc(doc(db, 'expenses', id));
//     } catch (error) {
//       console.error('Error deleting expense:', error);
//     }
//   };

//   // Utility functions for calculations
//   const getCurrentMonthExpenses = () => {
//     const now = new Date();
//     const currentMonth = now.getMonth();
//     const currentYear = now.getFullYear();
    
//     return expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate.getMonth() === currentMonth && 
//              expenseDate.getFullYear() === currentYear;
//     });
//   };

//   const getRecentExpenses = (limit = 5) => {
//     return [...expenses]
//       .sort((a, b) => new Date(b.date) - new Date(a.date))
//       .slice(0, limit);
//   };

//   const getThisMonthTotal = () => {
//     return getCurrentMonthExpenses().reduce((total, expense) => {
//       return total + (parseFloat(expense.amount) || 0);
//     }, 0);
//   };

//   const getRemainingBudget = () => {
//     return monthlyBudget - getThisMonthTotal();
//   };

//   const getDailyAverage = () => {
//     const thisMonthExpenses = getCurrentMonthExpenses();
//     const now = new Date();
//     const currentDay = now.getDate();
    
//     if (thisMonthExpenses.length === 0) return 0;
    
//     const total = getThisMonthTotal();
//     return total / currentDay;
//   };

//   const getExpensesByCategory = () => {
//     const currentMonthExpenses = getCurrentMonthExpenses();
//     const categoryTotals = {};
    
//     currentMonthExpenses.forEach(expense => {
//       const category = expense.category || 'Other';
//       categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(expense.amount || 0);
//     });
    
//     return categoryTotals;
//   };

//   const getTopCategory = () => {
//     const categoryTotals = getExpensesByCategory();
//     const topCategory = Object.entries(categoryTotals).reduce((max, [category, amount]) => {
//       return amount > max.amount ? { category, amount } : max;
//     }, { category: 'None', amount: 0 });
    
//     return topCategory;
//   };

//   const getMonthlyData = () => {
//     const monthlyData = {};
    
//     expenses.forEach(expense => {
//       const date = new Date(expense.date);
//       const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
//       monthlyData[monthKey] = (monthlyData[monthKey] || 0) + parseFloat(expense.amount || 0);
//     });
    
//     return Object.entries(monthlyData)
//       .sort(([a], [b]) => a.localeCompare(b))
//       .slice(-6) // Last 6 months
//       .map(([month, amount]) => ({
//         month: new Date(month + '-01').toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
//         amount
//       }));
//   };

//   const getBudgetProgress = () => {
//     const spent = getThisMonthTotal();
//     const progress = (spent / monthlyBudget) * 100;
//     return Math.min(progress, 100);
//   };

//   const getCategoryBudgets = () => {
//     // Enhanced category budgets in INR
//     const categoryBudgets = {
//       Food: 5000,
//       Transportation: 2000,
//       Healthcare: 3000,
//       Housing: 12000,
//       Education: 2000,
//       Entertainment: 1500,
//       Shopping: 2500,
//       Other: 1000
//     };
    
//     const categorySpending = getExpensesByCategory();
    
//     return Object.entries(categoryBudgets).map(([category, budget]) => ({
//       category,
//       budget,
//       spent: categorySpending[category] || 0,
//       remaining: budget - (categorySpending[category] || 0),
//       progress: budget > 0 ? ((categorySpending[category] || 0) / budget) * 100 : 0
//     }));
//   };

//   // Weekly data for charts
//   const getWeeklyData = () => {
//     const last7Days = Array.from({ length: 7 }, (_, i) => {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       return date.toISOString().split('T')[0];
//     }).reverse();

//     return last7Days.map((date) => {
//       const dayExpenses = expenses.filter(
//         (expense) => expense.date.split('T')[0] === date
//       );
//       const total = dayExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
//       return {
//         date: new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
//         amount: total,
//       };
//     });
//   };

//   const value = {
//     expenses,
//     loading,
//     monthlyBudget,
//     addExpense,
//     deleteExpense,
//     // Calculated values
//     getCurrentMonthExpenses,
//     getRecentExpenses,
//     getThisMonthTotal,
//     getRemainingBudget,
//     getDailyAverage,
//     getExpensesByCategory,
//     getTopCategory,
//     getMonthlyData,
//     getBudgetProgress,
//     getCategoryBudgets,
//     getWeeklyData,
//     // Setters
//     setMonthlyBudget
//   };

//   return (
//     <ExpenseContext.Provider value={value}>
//       {children}
//     </ExpenseContext.Provider>
//   );
// };
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy
} from 'firebase/firestore';

const ExpenseContext = createContext();

export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [monthlyBudget, setMonthlyBudget] = useState(25000); // Budget in INR

  const expensesRef = collection(db, 'expenses');

  // Load expenses from Firestore and listen for real-time updates
  useEffect(() => {
    const q = query(expensesRef, orderBy('date', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedExpenses = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        // Ensure amount is a number
        amount: parseFloat(doc.data().amount) || 0
      }));
      setExpenses(fetchedExpenses);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching expenses:', error);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up listener
  }, []);

  const addExpense = async (expense) => {
    try {
      const newExpense = {
        ...expense,
        amount: parseFloat(expense.amount) || 0,
        date: expense.date || new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      await addDoc(expensesRef, newExpense);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await deleteDoc(doc(db, 'expenses', id));
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // Utility functions for calculations
  const getCurrentMonthExpenses = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    
    return expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });
  };

  const getRecentExpenses = (limit = 5) => {
    return [...expenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  const getThisMonthTotal = () => {
    return getCurrentMonthExpenses().reduce((total, expense) => {
      return total + (parseFloat(expense.amount) || 0);
    }, 0);
  };

  const getRemainingBudget = () => {
    return monthlyBudget - getThisMonthTotal();
  };

  const getDailyAverage = () => {
    const thisMonthExpenses = getCurrentMonthExpenses();
    const now = new Date();
    const currentDay = now.getDate();
    
    if (thisMonthExpenses.length === 0) return 0;
    
    const total = getThisMonthTotal();
    return total / currentDay;
  };

  const getExpensesByCategory = () => {
    const currentMonthExpenses = getCurrentMonthExpenses();
    const categoryTotals = {};
    
    currentMonthExpenses.forEach(expense => {
      const category = expense.category || 'Other';
      categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(expense.amount || 0);
    });
    
    return categoryTotals;
  };

  const getTopCategory = () => {
    const categoryTotals = getExpensesByCategory();
    const topCategory = Object.entries(categoryTotals).reduce((max, [category, amount]) => {
      return amount > max.amount ? { category, amount } : max;
    }, { category: 'None', amount: 0 });
    
    return topCategory;
  };

  const getMonthlyData = () => {
    const monthlyData = {};
    
    expenses.forEach(expense => {
      const date = new Date(expense.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      monthlyData[monthKey] = (monthlyData[monthKey] || 0) + parseFloat(expense.amount || 0);
    });
    
    return Object.entries(monthlyData)
      .sort(([a], [b]) => a.localeCompare(b))
      .slice(-6) // Last 6 months
      .map(([month, amount]) => ({
        month: new Date(month + '-01').toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }),
        amount
      }));
  };

  const getBudgetProgress = () => {
    const spent = getThisMonthTotal();
    const progress = (spent / monthlyBudget) * 100;
    return Math.min(progress, 100);
  };

  const getCategoryBudgets = () => {
    // Enhanced category budgets in INR
    const categoryBudgets = {
      Food: 5000,
      Transportation: 2000,
      Healthcare: 3000,
      Housing: 12000,
      Education: 2000,
      Entertainment: 1500,
      Shopping: 2500,
      Other: 1000
    };
    
    const categorySpending = getExpensesByCategory();
    
    return Object.entries(categoryBudgets).map(([category, budget]) => ({
      category,
      budget,
      spent: categorySpending[category] || 0,
      remaining: budget - (categorySpending[category] || 0),
      progress: budget > 0 ? ((categorySpending[category] || 0) / budget) * 100 : 0
    }));
  };

  // Weekly data for charts
  const getWeeklyData = () => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map((date) => {
      const dayExpenses = expenses.filter(
        (expense) => expense.date.split('T')[0] === date
      );
      const total = dayExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount || 0), 0);
      return {
        date: new Date(date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
        amount: total,
      };
    });
  };

  const value = {
    expenses,
    loading,
    monthlyBudget,
    addExpense,
    deleteExpense,
    // Calculated values
    getCurrentMonthExpenses,
    getRecentExpenses,
    getThisMonthTotal,
    getRemainingBudget,
    getDailyAverage,
    getExpensesByCategory,
    getTopCategory,
    getMonthlyData,
    getBudgetProgress,
    getCategoryBudgets,
    getWeeklyData,
    // Setters
    setMonthlyBudget
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};