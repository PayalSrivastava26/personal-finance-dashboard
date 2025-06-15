// src/utils/constants.js
// import {
//   MdRestaurant,
//   MdDirectionsCar,
//   MdShoppingCart,
//   MdTheaters,
//   MdHome,
//   MdLocalHospital,
//   MdSchool,
//   MdFlightTakeoff,
//   MdAccountBalanceWallet
// } from 'react-icons/md'

// export const EXPENSE_CATEGORIES = [
//   { value: 'food', label: '🍔 Food & Dining', color: 'orange', icon: MdRestaurant },
//   { value: 'transport', label: '🚗 Transportation', color: 'blue', icon: MdDirectionsCar },
//   { value: 'shopping', label: '🛍️ Shopping', color: 'purple', icon: MdShoppingCart },
//   { value: 'entertainment', label: '🎬 Entertainment', color: 'pink', icon: MdTheaters },
//   { value: 'bills', label: '📱 Bills & Utilities', color: 'red', icon: MdHome },
//   { value: 'health', label: '🏥 Healthcare', color: 'green', icon: MdLocalHospital },
//   { value: 'education', label: '📚 Education', color: 'teal', icon: MdSchool },
//   { value: 'travel', label: '✈️ Travel', color: 'cyan', icon: MdFlightTakeoff },
//   { value: 'other', label: '📦 Other', color: 'gray', icon: MdAccountBalanceWallet }
// ]

// export const CHART_COLORS = [
//   '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
//   '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
// ]

// export const MONTHLY_BUDGET = 2000
// src/utils/constants.js

// Expense categories with icons and colors
export const EXPENSE_CATEGORIES = [
  { 
    value: 'Food', 
    label: 'Food & Dining',
    icon: '🍽️',
    color: '#FF6B6B',
    budget: 5000
  },
  { 
    value: 'Transportation', 
    label: 'Transportation',
    icon: '🚗',
    color: '#4ECDC4',
    budget: 2000
  },
  { 
    value: 'Healthcare', 
    label: 'Healthcare',
    icon: '🏥',
    color: '#45B7D1',
    budget: 3000
  },
  { 
    value: 'Housing', 
    label: 'Housing & Utilities',
    icon: '🏠',
    color: '#96CEB4',
    budget: 12000
  },
  { 
    value: 'Education', 
    label: 'Education',
    icon: '📚',
    color: '#FFEAA7',
    budget: 2000
  },
  { 
    value: 'Entertainment', 
    label: 'Entertainment',
    icon: '🎬',
    color: '#DDA0DD',
    budget: 1500
  },
  { 
    value: 'Shopping', 
    label: 'Shopping',
    icon: '🛍️',
    color: '#98D8C8',
    budget: 2500
  },
  { 
    value: 'Other', 
    label: 'Other',
    icon: '💳',
    color: '#F7DC6F',
    budget: 1000
  }
];

// Default monthly budget in INR
export const DEFAULT_MONTHLY_BUDGET = 25000;

// Date format options
export const DATE_FORMATS = {
  SHORT: 'short',
  MEDIUM: 'medium',
  LONG: 'long',
  RELATIVE: 'relative'
};

// Currency settings
export const CURRENCY_SETTINGS = {
  currency: 'INR',
  locale: 'en-IN',
  symbol: '₹'
};

// Budget status thresholds
export const BUDGET_THRESHOLDS = {
  SAFE: 50,
  WARNING: 80,
  DANGER: 100
};

// Chart colors
export const CHART_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', 
  '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', 
  '#BB8FCE', '#82E0AA'
];

// Time periods for analytics
export const TIME_PERIODS = {
  WEEK: 7,
  MONTH: 30,
  QUARTER: 90,
  YEAR: 365
};

// Expense limits and validations
export const EXPENSE_LIMITS = {
  MIN_AMOUNT: 1,
  MAX_AMOUNT: 1000000,
  MAX_DESCRIPTION_LENGTH: 100
};

// Export helper functions
export const getCategoryIcon = (category) => {
  const categoryObj = EXPENSE_CATEGORIES.find(cat => cat.value === category);
  return categoryObj ? categoryObj.icon : '💳';
};

export const getCategoryColor = (category) => {
  const categoryObj = EXPENSE_CATEGORIES.find(cat => cat.value === category);
  return categoryObj ? categoryObj.color : '#F7DC6F';
};

export const getCategoryBudget = (category) => {
  const categoryObj = EXPENSE_CATEGORIES.find(cat => cat.value === category);
  return categoryObj ? categoryObj.budget : 1000;
};