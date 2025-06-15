import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../config/firebase';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  onSnapshot
} from 'firebase/firestore';

const BudgetContext = createContext();

export const useBudgetContext = () => useContext(BudgetContext);

export const BudgetProvider = ({ children }) => {
  const [budgets, setBudgets] = useState({});
  const [monthlyBudgetLimit, setMonthlyBudgetLimit] = useState(25000);
  const [loading, setLoading] = useState(true);

  // Default category budgets
  const defaultBudgets = {
    Food: 5000,
    Transportation: 2000,
    Healthcare: 3000,
    Housing: 12000,
    Education: 2000,
    Entertainment: 1500,
    Shopping: 2500,
    Other: 1000
  };

  // Load budgets from Firestore
  useEffect(() => {
    const budgetDocRef = doc(db, 'settings', 'budgets');
    
    const unsubscribe = onSnapshot(budgetDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setBudgets(data.categoryBudgets || defaultBudgets);
        setMonthlyBudgetLimit(data.monthlyLimit || 25000);
      } else {
        // Initialize with default budgets if document doesn't exist
        setBudgets(defaultBudgets);
        setMonthlyBudgetLimit(25000);
        saveBudgetsToFirestore(defaultBudgets, 25000);
      }
      setLoading(false);
    }, (error) => {
      console.error('Error loading budgets:', error);
      setBudgets(defaultBudgets);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const saveBudgetsToFirestore = async (categoryBudgets, monthlyLimit) => {
    try {
      const budgetDocRef = doc(db, 'settings', 'budgets');
      await setDoc(budgetDocRef, {
        categoryBudgets,
        monthlyLimit,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error saving budgets:', error);
    }
  };

  const updateCategoryBudget = async (category, amount) => {
    const updatedBudgets = {
      ...budgets,
      [category]: parseFloat(amount) || 0
    };
    
    setBudgets(updatedBudgets);
    await saveBudgetsToFirestore(updatedBudgets, monthlyBudgetLimit);
  };

  const updateMonthlyBudgetLimit = async (amount) => {
    const newLimit = parseFloat(amount) || 0;
    setMonthlyBudgetLimit(newLimit);
    await saveBudgetsToFirestore(budgets, newLimit);
  };

  const addNewCategory = async (categoryName, amount) => {
    if (!categoryName || budgets[categoryName]) return false;
    
    const updatedBudgets = {
      ...budgets,
      [categoryName]: parseFloat(amount) || 0
    };
    
    setBudgets(updatedBudgets);
    await saveBudgetsToFirestore(updatedBudgets, monthlyBudgetLimit);
    return true;
  };

  const deleteCategoryBudget = async (category) => {
    const updatedBudgets = { ...budgets };
    delete updatedBudgets[category];
    
    setBudgets(updatedBudgets);
    await saveBudgetsToFirestore(updatedBudgets, monthlyBudgetLimit);
  };

  const resetToDefaults = async () => {
    setBudgets(defaultBudgets);
    setMonthlyBudgetLimit(25000);
    await saveBudgetsToFirestore(defaultBudgets, 25000);
  };

  const getTotalBudget = () => {
    return Object.values(budgets).reduce((sum, amount) => sum + (parseFloat(amount) || 0), 0);
  };

  const getBudgetForCategory = (category) => {
    return budgets[category] || 0;
  };

  const getAllCategories = () => {
    return Object.keys(budgets);
  };

  const value = {
    budgets,
    monthlyBudgetLimit,
    loading,
    updateCategoryBudget,
    updateMonthlyBudgetLimit,
    addNewCategory,
    deleteCategoryBudget,
    resetToDefaults,
    getTotalBudget,
    getBudgetForCategory,
    getAllCategories,
    defaultBudgets
  };

  return (
    <BudgetContext.Provider value={value}>
      {children}
    </BudgetContext.Provider>
  );
};