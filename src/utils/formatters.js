// src/utils/formatters.js
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatMonth = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long'
  })
}

export const formatDateShort = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric'
  })
}

export const getWeeklyData = (expenses) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    return date.toISOString().split('T')[0]
  }).reverse()
  
  return last7Days.map(date => {
    const dayExpenses = expenses.filter(expense => 
      expense.date.split('T')[0] === date
    )
    const total = dayExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    return {
      date: formatDateShort(date),
      amount: total
    }
  })
}

export const getCategoryData = (expenses, categories) => {
  return categories.map((category, index) => {
    const categoryExpenses = expenses.filter(expense => expense.category === category.value)
    const total = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0)
    return {
      name: category.label,
      value: total,
      color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE'][index % 9]
    }
  }).filter(item => item.value > 0)
}