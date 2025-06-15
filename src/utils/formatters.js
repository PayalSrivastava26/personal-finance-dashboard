// // src/utils/formatters.js
// export const formatCurrency = (amount) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD'
//   }).format(amount)
// }

// export const formatDate = (date) => {
//   return new Date(date).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric'
//   })
// }

// export const formatMonth = (date) => {
//   return new Date(date).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long'
//   })
// }

// export const formatDateShort = (date) => {
//   return new Date(date).toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric'
//   })
// }

// export const getWeeklyData = (expenses) => {
//   const last7Days = Array.from({ length: 7 }, (_, i) => {
//     const date = new Date()
//     date.setDate(date.getDate() - i)
//     return date.toISOString().split('T')[0]
//   }).reverse()
  
//   return last7Days.map(date => {
//     const dayExpenses = expenses.filter(expense => 
//       expense.date.split('T')[0] === date
//     )
//     const total = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0)
//     return {
//       date: formatDateShort(date),
//       amount: total
//     }
//   })
// }

// export const getCategoryData = (expenses, categories) => {
//   return categories.map((category, index) => {
//     const categoryExpenses = expenses.filter(expense => expense.category === category.value)
//     const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
//     return {
//       name: category.label,
//       value: total,
//       color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE'][index % 9]
//     }
//   }).filter(item => item.value > 0)
// }
// src/utils/formatters.js

// Currency formatting
// export const formatCurrency = (amount, options = {}) => {
//   const {
//     currency = 'USD',
//     locale = 'en-US',
//     minimumFractionDigits = 2,
//     maximumFractionDigits = 2,
//   } = options;

//   return new Intl.NumberFormat(locale, {
//     style: 'currency',
//     currency,
//     minimumFractionDigits,
//     maximumFractionDigits,
//   }).format(amount || 0);
// };

// // Date formatting with multiple styles
// export const formatDate = (date, options = {}) => {
//   const {
//     locale = 'en-US',
//     format = 'medium', // 'short', 'medium', 'long', 'full', 'relative'
//   } = options;

//   const dateObj = date instanceof Date ? date : new Date(date);

//   if (isNaN(dateObj.getTime())) return 'Invalid Date';

//   switch (format) {
//     case 'short':
//       return dateObj.toLocaleDateString(locale, {
//         month: 'short',
//         day: 'numeric',
//       });
//     case 'medium':
//       return dateObj.toLocaleDateString(locale, {
//         month: 'short',
//         day: 'numeric',
//         year: 'numeric',
//       });
//     case 'long':
//     case 'full':
//       return dateObj.toLocaleDateString(locale, {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric',
//       });
//     case 'relative':
//       return formatRelativeDate(dateObj);
//     default:
//       return dateObj.toLocaleDateString(locale);
//   }
// };

// // Format month and year (e.g., June 2025)
// export const formatMonth = (date) => {
//   return new Date(date).toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//   });
// };

// // Short date format (e.g., Jun 13)
// export const formatDateShort = (date) => {
//   return new Date(date).toLocaleDateString('en-US', {
//     month: 'short',
//     day: 'numeric',
//   });
// };

// // Relative date formatting
// export const formatRelativeDate = (date) => {
//   const dateObj = date instanceof Date ? date : new Date(date);
//   const now = new Date();
//   const diffTime = now.getTime() - dateObj.getTime();
//   const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

//   if (diffDays === 0) return 'Today';
//   if (diffDays === 1) return 'Yesterday';
//   if (diffDays < 7) return `${diffDays} days ago`;
//   if (diffDays < 30) {
//     const weeks = Math.floor(diffDays / 7);
//     return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
//   }
//   if (diffDays < 365) {
//     const months = Math.floor(diffDays / 30);
//     return months === 1 ? '1 month ago' : `${months} months ago`;
//   }
//   const years = Math.floor(diffDays / 365);
//   return years === 1 ? '1 year ago' : `${years} years ago`;
// };

// // Number formatting
// export const formatNumber = (number, options = {}) => {
//   const {
//     locale = 'en-US',
//     minimumFractionDigits = 0,
//     maximumFractionDigits = 2,
//   } = options;

//   return new Intl.NumberFormat(locale, {
//     minimumFractionDigits,
//     maximumFractionDigits,
//   }).format(number || 0);
// };

// // Percentage formatting
// export const formatPercentage = (value, total, options = {}) => {
//   const {
//     locale = 'en-US',
//     minimumFractionDigits = 1,
//     maximumFractionDigits = 1,
//   } = options;

//   const percentage = total > 0 ? (value / total) * 100 : 0;

//   return new Intl.NumberFormat(locale, {
//     style: 'percent',
//     minimumFractionDigits,
//     maximumFractionDigits,
//   }).format(percentage / 100);
// };

// // Compact number formatting (e.g., 1.2K, 1.5M)
// export const formatCompactNumber = (number, options = {}) => {
//   const {
//     locale = 'en-US',
//     notation = 'compact',
//     compactDisplay = 'short',
//   } = options;

//   return new Intl.NumberFormat(locale, {
//     notation,
//     compactDisplay,
//   }).format(number || 0);
// };

// // Format duration (in seconds) to human readable format
// export const formatDuration = (seconds) => {
//   const hours = Math.floor(seconds / 3600);
//   const minutes = Math.floor((seconds % 3600) / 60);
//   const remainingSeconds = seconds % 60;

//   if (hours > 0) return `${hours}h ${minutes}m ${remainingSeconds}s`;
//   if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
//   return `${remainingSeconds}s`;
// };

// // Format file size
// export const formatFileSize = (bytes, decimals = 2) => {
//   if (bytes === 0) return '0 Bytes';

//   const k = 1024;
//   const dm = decimals < 0 ? 0 : decimals;
//   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

//   const i = Math.floor(Math.log(bytes) / Math.log(k));
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
// };

// // Weekly chart data formatter
// export const getWeeklyData = (expenses) => {
//   const last7Days = Array.from({ length: 7 }, (_, i) => {
//     const date = new Date();
//     date.setDate(date.getDate() - i);
//     return date.toISOString().split('T')[0];
//   }).reverse();

//   return last7Days.map((date) => {
//     const dayExpenses = expenses.filter(
//       (expense) => expense.date.split('T')[0] === date
//     );
//     const total = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0);
//     return {
//       date: formatDateShort(date),
//       amount: total,
//     };
//   });
// };

// // Category-wise expense breakdown
// export const getCategoryData = (expenses, categories) => {
//   return categories
//     .map((category, index) => {
//       const categoryExpenses = expenses.filter(
//         (expense) => expense.category === category.value
//       );
//       const total = categoryExpenses.reduce(
//         (sum, expense) => sum + expense.amount,
//         0
//       );
//       return {
//         name: category.label,
//         value: total,
//         color: [
//           '#FF6B6B',
//           '#4ECDC4',
//           '#45B7D1',
//           '#96CEB4',
//           '#FFEAA7',
//           '#DDA0DD',
//           '#98D8C8',
//           '#F7DC6F',
//           '#BB8FCE',
//         ][index % 9],
//       };
//     })
//     .filter((item) => item.value > 0);
// };
// Enhanced formatters for Indian Rupee and Indian locale

export const formatCurrency = (amount, options = {}) => {
  const {
    currency = 'INR',
    locale = 'en-IN',
    minimumFractionDigits = 0,
    maximumFractionDigits = 0,
  } = options;

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(amount || 0);
};

// Compact currency formatting for large amounts (e.g., ₹1.2L, ₹2.5Cr)
export const formatCompactCurrency = (amount) => {
  const absAmount = Math.abs(amount || 0);
  
  if (absAmount >= 10000000) { // 1 Crore and above
    return `₹${(amount / 10000000).toFixed(1)}Cr`;
  } else if (absAmount >= 100000) { // 1 Lakh and above
    return `₹${(amount / 100000).toFixed(1)}L`;
  } else if (absAmount >= 1000) { // 1 Thousand and above
    return `₹${(amount / 1000).toFixed(1)}K`;
  } else {
    return formatCurrency(amount);
  }
};

// Date formatting with multiple styles for Indian context
export const formatDate = (date, options = {}) => {
  const {
    locale = 'en-IN',
    format = 'medium', // 'short', 'medium', 'long', 'full', 'relative'
  } = options;

  const dateObj = date instanceof Date ? date : new Date(date);

  if (isNaN(dateObj.getTime())) return 'Invalid Date';

  switch (format) {
    case 'short':
      return dateObj.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
      });
    case 'medium':
      return dateObj.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
    case 'long':
    case 'full':
      return dateObj.toLocaleDateString(locale, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    case 'relative':
      return formatRelativeDate(dateObj);
    default:
      return dateObj.toLocaleDateString(locale);
  }
};

// Format month and year for Indian context (e.g., June 2025)
export const formatMonth = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
  });
};

// Short date format for Indian context (e.g., Jun 13)
export const formatDateShort = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
  });
};

// Relative date formatting
export const formatRelativeDate = (date) => {
  const dateObj = date instanceof Date ? date : new Date(date);
  const now = new Date();
  const diffTime = now.getTime() - dateObj.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return weeks === 1 ? '1 week ago' : `${weeks} weeks ago`;
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  }
  const years = Math.floor(diffDays / 365);
  return years === 1 ? '1 year ago' : `${years} years ago`;
};

// Number formatting for Indian context
export const formatNumber = (number, options = {}) => {
  const {
    locale = 'en-IN',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
  } = options;

  return new Intl.NumberFormat(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(number || 0);
};

// Percentage formatting
export const formatPercentage = (value, total, options = {}) => {
  const {
    locale = 'en-IN',
    minimumFractionDigits = 1,
    maximumFractionDigits = 1,
  } = options;

  const percentage = total > 0 ? (value / total) * 100 : 0;

  return new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(percentage / 100);
};

// Compact number formatting with Indian context (e.g., 1.2K, 1.5L, 2.1Cr)
export const formatCompactNumber = (number, options = {}) => {
  const absNumber = Math.abs(number || 0);
  
  if (absNumber >= 10000000) { // 1 Crore and above
    return `${(number / 10000000).toFixed(1)}Cr`;
  } else if (absNumber >= 100000) { // 1 Lakh and above
    return `${(number / 100000).toFixed(1)}L`;
  } else if (absNumber >= 1000) { // 1 Thousand and above
    return `${(number / 1000).toFixed(1)}K`;
  } else {
    return number?.toString() || '0';
  }
};

// Format duration (in seconds) to human readable format
export const formatDuration = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) return `${hours}h ${minutes}m ${remainingSeconds}s`;
  if (minutes > 0) return `${minutes}m ${remainingSeconds}s`;
  return `${remainingSeconds}s`;
};

// Format file size
export const formatFileSize = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

// Weekly chart data formatter
export const getWeeklyData = (expenses) => {
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
      date: formatDateShort(date),
      amount: total,
    };
  });
};

// Category-wise expense breakdown with Indian currency
export const getCategoryData = (expenses, categories) => {
  const categoryColors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', 
    '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#82E0AA'
  ];

  return categories
    .map((category, index) => {
      const categoryExpenses = expenses.filter(
        (expense) => expense.category === (category.value || category)
      );
      const total = categoryExpenses.reduce(
        (sum, expense) => sum + parseFloat(expense.amount || 0),
        0
      );
      return {
        name: category.label || category,
        value: total,
        color: categoryColors[index % categoryColors.length],
        formattedValue: formatCurrency(total),
      };
    })
    .filter((item) => item.value > 0);
};

// Monthly comparison data
export const getMonthlyComparisonData = (expenses, months = 6) => {
  const monthlyData = {};
  
  expenses.forEach(expense => {
    const date = new Date(expense.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    monthlyData[monthKey] = (monthlyData[monthKey] || 0) + parseFloat(expense.amount || 0);
  });
  
  return Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b))
    .slice(-months)
    .map(([month, amount]) => ({
      month: new Date(month + '-01').toLocaleDateString('en-IN', { 
        month: 'short', 
        year: 'numeric' 
      }),
      amount,
      formattedAmount: formatCurrency(amount)
    }));
};

// Budget status helper
export const getBudgetStatus = (spent, budget) => {
  const percentage = budget > 0 ? (spent / budget) * 100 : 0;
  
  if (percentage <= 50) {
    return { status: 'safe', color: 'green', message: 'Within budget' };
  } else if (percentage <= 80) {
    return { status: 'warning', color: 'yellow', message: 'Approaching limit' };
  } else if (percentage <= 100) {
    return { status: 'danger', color: 'red', message: 'Near budget limit' };
  } else {
    return { status: 'exceeded', color: 'red', message: 'Budget exceeded' };
  }
};

// Expense trends helper
export const getExpenseTrend = (currentMonth, previousMonth) => {
  if (previousMonth === 0) return { trend: 'neutral', percentage: 0 };
  
  const change = ((currentMonth - previousMonth) / previousMonth) * 100;
  
  if (change > 10) {
    return { trend: 'up', percentage: change, message: 'Spending increased' };
  } else if (change < -10) {
    return { trend: 'down', percentage: Math.abs(change), message: 'Spending decreased' };
  } else {
    return { trend: 'stable', percentage: Math.abs(change), message: 'Spending stable' };
  }
};