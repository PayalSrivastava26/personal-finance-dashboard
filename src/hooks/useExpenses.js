// import { useState, useEffect, useCallback } from 'react';

// const useExpenses = () => {
//   const [expenses, setExpenses] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load expenses from localStorage on mount
//   useEffect(() => {
//     try {
//       const savedExpenses = localStorage.getItem('finance-dashboard-expenses');
//       if (savedExpenses) {
//         setExpenses(JSON.parse(savedExpenses));
//       }
//     } catch (error) {
//       console.error('Error loading expenses:', error);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // Save expenses to localStorage whenever expenses change
//   useEffect(() => {
//     if (!loading) {
//       try {
//         localStorage.setItem('finance-dashboard-expenses', JSON.stringify(expenses));
//       } catch (error) {
//         console.error('Error saving expenses:', error);
//       }
//     }
//   }, [expenses, loading]);

//   const addExpense = useCallback((expense) => {
//     const newExpense = {
//       ...expense,
//       id: expense.id || Date.now().toString(),
//       createdAt: expense.createdAt || new Date().toISOString(),
//     };
//     setExpenses(prev => [newExpense, ...prev]);
//   }, []);

//   const updateExpense = useCallback((id, updatedExpense) => {
//     setExpenses(prev =>
//       prev.map(expense =>
//         expense.id === id
//           ? { ...expense, ...updatedExpense, updatedAt: new Date().toISOString() }
//           : expense
//       )
//     );
//   }, []);

//   const deleteExpense = useCallback((id) => {
//     setExpenses(prev => prev.filter(expense => expense.id !== id));
//   }, []);

//   const getExpensesByCategory = useCallback(() => {
//     return expenses.reduce((acc, expense) => {
//       const category = expense.category || 'Others';
//       if (!acc[category]) {
//         acc[category] = {
//           total: 0,
//           count: 0,
//           expenses: []
//         };
//       }
//       acc[category].total += expense.amount;
//       acc[category].count += 1;
//       acc[category].expenses.push(expense);
//       return acc;
//     }, {});
//   }, [expenses]);

//   const getExpensesByDateRange = useCallback((startDate, endDate) => {
//     return expenses.filter(expense => {
//       const expenseDate = new Date(expense.date);
//       return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
//     });
//   }, [expenses]);

//   const getCurrentMonthExpenses = useCallback(() => {
//     const now = new Date();
//     const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
//     const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
//     return getExpensesByDateRange(startOfMonth, endOfMonth);
//   }, [getExpensesByDateRange]);

//   const getTotalExpenses = useCallback((expenseList = expenses) => {
//     return expenseList.reduce((total, expense) => total + expense.amount, 0);
//   }, [expenses]);

//   const getRecentExpenses = useCallback((limit = 5) => {
//     return [...expenses]
//       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
//       .slice(0, limit);
//   }, [expenses]);

//   const getExpenseStats = useCallback(() => {
//     const currentMonth = getCurrentMonthExpenses();
//     const currentMonthTotal = getTotalExpenses(currentMonth);
    
//     const now = new Date();
//     const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//     const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
//     const prevMonthExpenses = getExpensesByDateRange(startOfPrevMonth, endOfPrevMonth);
//     const prevMonthTotal = getTotalExpenses(prevMonthExpenses);
    
//     const percentageChange = prevMonthTotal > 0 
//       ? ((currentMonthTotal - prevMonthTotal) / prevMonthTotal * 100).toFixed(1)
//       : 0;
    
//     return {
//       totalExpenses: getTotalExpenses(),
//       currentMonthTotal,
//       prevMonthTotal,
//       percentageChange: parseFloat(percentageChange),
//       totalTransactions: expenses.length,
//       currentMonthTransactions: currentMonth.length,
//       averageExpense: expenses.length > 0 ? getTotalExpenses() / expenses.length : 0,
//       categoriesCount: Object.keys(getExpensesByCategory()).length
//     };
//   }, [expenses, getCurrentMonthExpenses, getTotalExpenses, getExpensesByDateRange, getExpensesByCategory]);

//   const searchExpenses = useCallback((searchTerm, category = null) => {
//     return expenses.filter(expense => {
//       const matchesSearch = expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                            expense.description?.toLowerCase().includes(searchTerm.toLowerCase());
//       const matchesCategory = !category || expense.category === category;
//       return matchesSearch && matchesCategory;
//     });
//   }, [expenses]);

//   const clearAllExpenses = useCallback(() => {
//     setExpenses([]);
//   }, []);

//   return {
//     expenses,
//     loading,
//     addExpense,
//     updateExpense,
//     deleteExpense,
//     clearAllExpenses,
//     getExpensesByCategory,
//     getExpensesByDateRange,
//     getCurrentMonthExpenses,
//     getTotalExpenses,
//     getRecentExpenses,
//     getExpenseStats,
//     searchExpenses
//   };
// };
import { useExpenseContext } from '../context/ExpenseContext';
import { useState, useEffect, useCallback } from 'react';

const useExpenses = () => {
  const context = useExpenseContext();

  if (!context) {
    console.warn('useExpenses: ExpenseContext not found, falling back to local state');

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      try {
        const savedExpenses = localStorage.getItem('finance-dashboard-expenses');
        if (savedExpenses) {
          setExpenses(JSON.parse(savedExpenses));
        }
      } catch (error) {
        console.error('Error loading expenses:', error);
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      if (!loading) {
        try {
          localStorage.setItem('finance-dashboard-expenses', JSON.stringify(expenses));
        } catch (error) {
          console.error('Error saving expenses:', error);
        }
      }
    }, [expenses, loading]);

    const addExpense = useCallback((expense) => {
      const newExpense = {
        ...expense,
        id: expense.id || Date.now().toString(),
        createdAt: expense.createdAt || new Date().toISOString(),
      };
      setExpenses(prev => [newExpense, ...prev]);
    }, []);

    const updateExpense = useCallback((id, updatedExpense) => {
      setExpenses(prev =>
        prev.map(expense =>
          expense.id === id
            ? { ...expense, ...updatedExpense, updatedAt: new Date().toISOString() }
            : expense
        )
      );
    }, []);

    const deleteExpense = useCallback((id) => {
      setExpenses(prev => prev.filter(expense => expense.id !== id));
    }, []);

    const getExpensesByCategory = useCallback(() => {
      return expenses.reduce((acc, expense) => {
        const category = expense.category || 'Others';
        if (!acc[category]) {
          acc[category] = {
            total: 0,
            count: 0,
            expenses: []
          };
        }
        acc[category].total += expense.amount;
        acc[category].count += 1;
        acc[category].expenses.push(expense);
        return acc;
      }, {});
    }, [expenses]);

    const getExpensesByDateRange = useCallback((startDate, endDate) => {
      return expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
      });
    }, [expenses]);

    const getCurrentMonthExpenses = useCallback(() => {
      const now = new Date();
      const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
      const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      return getExpensesByDateRange(startOfMonth, endOfMonth);
    }, [getExpensesByDateRange]);

    const getTotalExpenses = useCallback((expenseList = expenses) => {
      return expenseList.reduce((total, expense) => total + expense.amount, 0);
    }, [expenses]);

    const getRecentExpenses = useCallback((limit = 5) => {
      return [...expenses]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
    }, [expenses]);

    const getExpenseStats = useCallback(() => {
      const currentMonth = getCurrentMonthExpenses();
      const currentMonthTotal = getTotalExpenses(currentMonth);

      const now = new Date();
      const startOfPrevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      const endOfPrevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      const prevMonthExpenses = getExpensesByDateRange(startOfPrevMonth, endOfPrevMonth);
      const prevMonthTotal = getTotalExpenses(prevMonthExpenses);

      const percentageChange = prevMonthTotal > 0
        ? ((currentMonthTotal - prevMonthTotal) / prevMonthTotal * 100).toFixed(1)
        : 0;

      return {
        totalExpenses: getTotalExpenses(),
        currentMonthTotal,
        prevMonthTotal,
        percentageChange: parseFloat(percentageChange),
        totalTransactions: expenses.length,
        currentMonthTransactions: currentMonth.length,
        averageExpense: expenses.length > 0 ? getTotalExpenses() / expenses.length : 0,
        categoriesCount: Object.keys(getExpensesByCategory()).length
      };
    }, [expenses, getCurrentMonthExpenses, getTotalExpenses, getExpensesByDateRange, getExpensesByCategory]);

    const searchExpenses = useCallback((searchTerm, category = null) => {
      return expenses.filter(expense => {
        const matchesSearch = (expense.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                              (expense.description || '').toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = !category || expense.category === category;
        return matchesSearch && matchesCategory;
      });
    }, [expenses]);

    const clearAllExpenses = useCallback(() => {
      setExpenses([]);
    }, []);

    return {
      expenses,
      loading,
      addExpense,
      updateExpense,
      deleteExpense,
      clearAllExpenses,
      getExpensesByCategory,
      getExpensesByDateRange,
      getCurrentMonthExpenses,
      getTotalExpenses,
      getRecentExpenses,
      getExpenseStats,
      searchExpenses
    };
  }

  // If context is available, return its values
  return {
    ...context,
    clearAllExpenses: () => {}, // Optional override if needed in context version
    getExpenseStats: () => {
      const monthly = context.getMonthlyStats?.() || {};
      return {
        totalExpenses: monthly.total || 0,
        currentMonthTotal: monthly.thisMonth || 0,
        prevMonthTotal: monthly.lastMonth || 0,
        percentageChange: 0, // Not in context, calculate separately if needed
        totalTransactions: monthly.totalTransactions || 0,
        currentMonthTransactions: monthly.thisMonthTransactions || 0,
        averageExpense: monthly.avgDaily || 0,
        categoriesCount: Object.keys(context.getExpensesByCategory?.() || {}).length
      };
    }
  };
};

export default useExpenses;

