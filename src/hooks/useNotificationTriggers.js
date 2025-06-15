// src/hooks/useNotificationTriggers.js
import { useEffect } from 'react';
import { useNotifications } from '../context/NotificationContext';
import { useExpenses } from '../context/ExpenseContext';
import { useBudget } from '../context/BudgetContext';

export const useNotificationTriggers = () => {
  const {
    notifyBudgetExceeded,
    notifyBudgetWarning,
    notifyExpenseAdded,
    notifyMonthlyReset,
    notifyWeeklyReport,
    settings
  } = useNotifications();

  const { expenses } = useExpenses();
  const { budget, categoryBudgets } = useBudget();

  // Check budget alerts when expenses or budgets change
  useEffect(() => {
    if (!settings.budgetAlerts || !expenses.length || !categoryBudgets.length) return;

    // Calculate spending by category for current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    
    const currentMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });

    // Check each category budget
    categoryBudgets.forEach(categoryBudget => {
      const categoryExpenses = currentMonthExpenses.filter(
        expense => expense.category.toLowerCase() === categoryBudget.category.toLowerCase()
      );
      
      const totalSpent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      const budgetLimit = categoryBudget.amount;
      const percentage = Math.round((totalSpent / budgetLimit) * 100);

      // Check if budget is exceeded
      if (totalSpent > budgetLimit) {
        notifyBudgetExceeded(categoryBudget.category, totalSpent, budgetLimit);
      }
      // Check if spending is above 80% of budget
      else if (percentage >= 80) {
        notifyBudgetWarning(categoryBudget.category, totalSpent, budgetLimit, percentage);
      }
    });

    // Check overall budget if set
    if (budget.monthlyLimit) {
      const totalMonthlySpent = currentMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      const overallPercentage = Math.round((totalMonthlySpent / budget.monthlyLimit) * 100);

      if (totalMonthlySpent > budget.monthlyLimit) {
        notifyBudgetExceeded('Overall', totalMonthlySpent, budget.monthlyLimit);
      } else if (overallPercentage >= 80) {
        notifyBudgetWarning('Overall', totalMonthlySpent, budget.monthlyLimit, overallPercentage);
      }
    }
  }, [expenses, categoryBudgets, budget, settings.budgetAlerts, notifyBudgetExceeded, notifyBudgetWarning]);

  // Notify when new expense is added
  useEffect(() => {
    if (!settings.expenseReminders || expenses.length === 0) return;

    // Check if the most recent expense was added in the last minute
    const latestExpense = expenses[0]; // Assuming expenses are sorted by date (newest first)
    if (latestExpense) {
      const expenseTime = new Date(latestExpense.createdAt || latestExpense.date);
      const now = new Date();
      const timeDiff = now - expenseTime;

      // If expense was added in the last 5 seconds, show notification
      if (timeDiff < 5000) {
        notifyExpenseAdded(latestExpense);
      }
    }
  }, [expenses, settings.expenseReminders, notifyExpenseAdded]);

  // Check for monthly reset
  useEffect(() => {
    if (!settings.monthlyReset) return;

    const checkMonthlyReset = () => {
      const lastResetDate = localStorage.getItem('fintrack_last_reset');
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth();
      const currentYear = currentDate.getFullYear();

      if (lastResetDate) {
        const lastReset = new Date(lastResetDate);
        const lastResetMonth = lastReset.getMonth();
        const lastResetYear = lastReset.getFullYear();

        // If we're in a new month, trigger reset notification
        if (currentMonth !== lastResetMonth || currentYear !== lastResetYear) {
          notifyMonthlyReset();
          localStorage.setItem('fintrack_last_reset', currentDate.toISOString());
        }
      } else {
        // First time setup
        localStorage.setItem('fintrack_last_reset', currentDate.toISOString());
      }
    };

    checkMonthlyReset();
  }, [settings.monthlyReset, notifyMonthlyReset]);

  // Weekly report notifications
  useEffect(() => {
    if (!settings.weeklyReports) return;

    const checkWeeklyReport = () => {
      const lastReportDate = localStorage.getItem('fintrack_last_weekly_report');
      const currentDate = new Date();
      const currentWeek = getWeekNumber(currentDate);

      if (lastReportDate) {
        const lastReport = new Date(lastReportDate);
        const lastReportWeek = getWeekNumber(lastReport);

        // If we're in a new week (and it's Monday), send weekly report
        if (currentWeek !== lastReportWeek && currentDate.getDay() === 1) {
          // Calculate weekly spending
          const weekStart = new Date(currentDate);
          weekStart.setDate(currentDate.getDate() - 7);
          
          const weeklyExpenses = expenses.filter(expense => {
            const expenseDate = new Date(expense.date);
            return expenseDate >= weekStart && expenseDate <= currentDate;
          });

          const totalWeeklySpent = weeklyExpenses.reduce((sum, expense) => sum + expense.amount, 0);
          const budgetLeft = budget.monthlyLimit ? budget.monthlyLimit - totalWeeklySpent : 0;

          notifyWeeklyReport(totalWeeklySpent, Math.max(0, budgetLeft));
          localStorage.setItem('fintrack_last_weekly_report', currentDate.toISOString());
        }
      } else {
        // First time setup
        localStorage.setItem('fintrack_last_weekly_report', currentDate.toISOString());
      }
    };

    checkWeeklyReport();
  }, [settings.weeklyReports, expenses, budget, notifyWeeklyReport]);

  // Helper function to get week number
  const getWeekNumber = (date) => {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const pastDaysOfYear = (date - startOfYear) / 86400000;
    return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  };

  return null; // This hook doesn't render anything
};