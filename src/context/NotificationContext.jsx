// // src/context/NotificationContext.jsx
// import React, { createContext, useContext, useReducer, useEffect } from 'react';
// import { useToast } from '@chakra-ui/react';

// const NotificationContext = createContext();

// const notificationReducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_NOTIFICATION':
//       return {
//         ...state,
//         notifications: [action.payload, ...state.notifications],
//         unreadCount: state.unreadCount + 1
//       };
//     case 'MARK_AS_READ':
//       return {
//         ...state,
//         notifications: state.notifications.map(notif =>
//           notif.id === action.payload ? { ...notif, read: true } : notif
//         ),
//         unreadCount: Math.max(0, state.unreadCount - 1)
//       };
//     case 'MARK_ALL_AS_READ':
//       return {
//         ...state,
//         notifications: state.notifications.map(notif => ({ ...notif, read: true })),
//         unreadCount: 0
//       };
//     case 'REMOVE_NOTIFICATION':
//       const notification = state.notifications.find(n => n.id === action.payload);
//       return {
//         ...state,
//         notifications: state.notifications.filter(notif => notif.id !== action.payload),
//         unreadCount: notification && !notification.read ? state.unreadCount - 1 : state.unreadCount
//       };
//     case 'CLEAR_ALL_NOTIFICATIONS':
//       return {
//         ...state,
//         notifications: [],
//         unreadCount: 0
//       };
//     case 'SET_NOTIFICATIONS':
//       return {
//         ...state,
//         notifications: action.payload,
//         unreadCount: action.payload.filter(n => !n.read).length
//       };
//     case 'UPDATE_SETTINGS':
//       return {
//         ...state,
//         settings: { ...state.settings, ...action.payload }
//       };
//     default:
//       return state;
//   }
// };

// const initialState = {
//   notifications: [],
//   unreadCount: 0,
//   settings: {
//     enableNotifications: true,
//     budgetAlerts: true,
//     monthlyReset: false,
//     autoBackup: false,
//     expenseReminders: true,
//     weeklyReports: true
//   }
// };

// export const NotificationProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(notificationReducer, initialState);
//   const toast = useToast();

//   // Load notifications from localStorage on mount
//   useEffect(() => {
//     const savedNotifications = localStorage.getItem('fintrack_notifications');
//     const savedSettings = localStorage.getItem('fintrack_notification_settings');
    
//     if (savedNotifications) {
//       try {
//         const notifications = JSON.parse(savedNotifications);
//         dispatch({ type: 'SET_NOTIFICATIONS', payload: notifications });
//       } catch (error) {
//         console.error('Error loading notifications:', error);
//       }
//     }

//     if (savedSettings) {
//       try {
//         const settings = JSON.parse(savedSettings);
//         dispatch({ type: 'UPDATE_SETTINGS', payload: settings });
//       } catch (error) {
//         console.error('Error loading notification settings:', error);
//       }
//     }
//   }, []);

//   // Save notifications to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('fintrack_notifications', JSON.stringify(state.notifications));
//   }, [state.notifications]);

//   // Save settings to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem('fintrack_notification_settings', JSON.stringify(state.settings));
//   }, [state.settings]);

//   const addNotification = (notification) => {
//     const newNotification = {
//       id: Date.now() + Math.random(),
//       timestamp: new Date().toISOString(),
//       read: false,
//       ...notification
//     };

//     dispatch({ type: 'ADD_NOTIFICATION', payload: newNotification });

//     // Show toast if notifications are enabled
//     if (state.settings.enableNotifications) {
//       toast({
//         title: notification.title,
//         description: notification.message,
//         status: notification.type || 'info',
//         duration: 5000,
//         isClosable: true,
//         position: 'top-right'
//       });
//     }
//   };

//   const markAsRead = (id) => {
//     dispatch({ type: 'MARK_AS_READ', payload: id });
//   };

//   const markAllAsRead = () => {
//     dispatch({ type: 'MARK_ALL_AS_READ' });
//   };

//   const removeNotification = (id) => {
//     dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
//   };

//   const clearAllNotifications = () => {
//     dispatch({ type: 'CLEAR_ALL_NOTIFICATIONS' });
//   };

//   const updateSettings = (newSettings) => {
//     dispatch({ type: 'UPDATE_SETTINGS', payload: newSettings });
//   };

//   // Helper functions for specific notification types
//   const notifyBudgetExceeded = (category, amount, limit) => {
//     if (!state.settings.budgetAlerts) return;
    
//     addNotification({
//       type: 'error',
//       category: 'budget',
//       title: 'Budget Exceeded!',
//       message: `Your ${category} spending (₹${amount.toLocaleString()}) has exceeded the budget limit of ₹${limit.toLocaleString()}`,
//       icon: '⚠️'
//     });
//   };

//   const notifyBudgetWarning = (category, amount, limit, percentage) => {
//     if (!state.settings.budgetAlerts) return;
    
//     addNotification({
//       type: 'warning',
//       category: 'budget',
//       title: 'Budget Warning',
//       message: `You've used ${percentage}% of your ${category} budget (₹${amount.toLocaleString()} of ₹${limit.toLocaleString()})`,
//       icon: '⚡'
//     });
//   };

//   const notifyExpenseAdded = (expense) => {
//     if (!state.settings.expenseReminders) return;
    
//     addNotification({
//       type: 'success',
//       category: 'expense',
//       title: 'Expense Added',
//       message: `Added ₹${expense.amount.toLocaleString()} for ${expense.title}`,
//       icon: '💰'
//     });
//   };

//   const notifyMonthlyReset = () => {
//     if (!state.settings.monthlyReset) return;
    
//     addNotification({
//       type: 'info',
//       category: 'system',
//       title: 'Monthly Reset',
//       message: 'Your monthly budget has been reset for the new month',
//       icon: '🔄'
//     });
//   };

//   const notifyWeeklyReport = (totalSpent, budgetLeft) => {
//     if (!state.settings.weeklyReports) return;
    
//     addNotification({
//       type: 'info',
//       category: 'report',
//       title: 'Weekly Summary',
//       message: `This week: ₹${totalSpent.toLocaleString()} spent, ₹${budgetLeft.toLocaleString()} remaining`,
//       icon: '📊'
//     });
//   };

//   const value = {
//     ...state,
//     addNotification,
//     markAsRead,
//     markAllAsRead,
//     removeNotification,
//     clearAllNotifications,
//     updateSettings,
//     // Helper functions
//     notifyBudgetExceeded,
//     notifyBudgetWarning,
//     notifyExpenseAdded,
//     notifyMonthlyReset,
//     notifyWeeklyReport
//   };

//   return (
//     <NotificationContext.Provider value={value}>
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotifications = () => {
//   const context = useContext(NotificationContext);
//   if (!context) {
//     throw new Error('useNotifications must be used within a NotificationProvider');
//   }
//   return context;
// };import { db } from '../config/firebase';
// import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

// class NotificationService {
//   constructor() {
//     this.permission = 'default';
//     this.checkPermission();
//   }

//   async checkPermission() {
//     if ('Notification' in window) {
//       this.permission = Notification.permission;
//       if (this.permission === 'default') {
//         this.permission = await Notification.requestPermission();
//       }
//     }
//     return this.permission;
//   }

//   async requestPermission() {
//     if ('Notification' in window) {
//       this.permission = await Notification.requestPermission();
//       return this.permission === 'granted';
//     }
//     return false;
//   }

//   showNotification(title, options = {}) {
//     if (this.permission === 'granted') {
//       const defaultOptions = {
//         icon: '/favicon.ico',
//         badge: '/favicon.ico',
//         dir: 'auto',
//         lang: 'en',
//         renotify: false,
//         requireInteraction: false,
//         silent: false,
//         tag: 'fintrack-notification',
//         timestamp: Date.now(),
//         ...options
//       };

//       const notification = new Notification(title, defaultOptions);

//       setTimeout(() => {
//         notification.close();
//       }, 5000);

//       return notification;
//     }
//     return null;
//   }

//   playNotificationSound() {
//     try {
//       const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//       const oscillator = audioContext.createOscillator();
//       const gainNode = audioContext.createGain();

//       oscillator.connect(gainNode);
//       gainNode.connect(audioContext.destination);

//       oscillator.frequency.value = 800;
//       oscillator.type = 'sine';
//       gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
//       gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

//       oscillator.start(audioContext.currentTime);
//       oscillator.stop(audioContext.currentTime + 0.3);
//     } catch (error) {
//       console.warn('Could not play notification sound:', error);
//     }
//   }

//   async sendBudgetAlert(budgetData, expenseData, settings) {
//     if (!settings.enabled || !settings.budgetAlert?.enabled) return;

//     const spentPercentage = (expenseData.totalSpent / budgetData.totalBudget) * 100;

//     if (spentPercentage >= settings.budgetAlert.threshold) {
//       const title = '💰 Budget Alert!';
//       const body = `You've spent ${spentPercentage.toFixed(1)}% of your budget (₹${expenseData.totalSpent.toLocaleString()} of ₹${budgetData.totalBudget.toLocaleString()})`;

//       const notificationData = {
//         title,
//         body,
//         type: 'budget_alert',
//         data: {
//           spentPercentage,
//           totalSpent: expenseData.totalSpent,
//           totalBudget: budgetData.totalBudget
//         },
//         timestamp: new Date().toISOString()
//       };

//       if (settings.desktop) {
//         this.showNotification(title, {
//           body,
//           icon: '/icons/budget.png',
//           tag: 'budget-alert'
//         });
//       }

//       if (settings.sound) {
//         this.playNotificationSound();
//       }

//       await this.storeNotification(notificationData);

//       return notificationData;
//     }
//   }

//   async sendDailyReminder(settings) {
//     if (!settings.enabled || !settings.dailyReminder?.enabled) return;

//     const title = '📝 Daily Reminder';
//     const body = "Don't forget to track your expenses today!";

//     const notificationData = {
//       title,
//       body,
//       type: 'daily_reminder',
//       timestamp: new Date().toISOString()
//     };

//     if (settings.desktop) {
//       this.showNotification(title, {
//         body,
//         icon: '/icons/reminder.png',
//         tag: 'daily-reminder'
//       });
//     }

//     if (settings.sound) {
//       this.playNotificationSound();
//     }

//     await this.storeNotification(notificationData);

//     return notificationData;
//   }

//   async sendWeeklyReport(reportData, settings) {
//     if (!settings.enabled || !settings.weeklyReport?.enabled) return;

//     const title = '📊 Weekly Report';
//     const body = `This week: ₹${reportData.totalSpent.toLocaleString()} spent across ${reportData.transactionCount} transactions`;

//     const notificationData = {
//       title,
//       body,
//       type: 'weekly_report',
//       data: reportData,
//       timestamp: new Date().toISOString()
//     };

//     if (settings.desktop) {
//       this.showNotification(title, {
//         body,
//         icon: '/icons/report.png',
//         tag: 'weekly-report'
//       });
//     }

//     if (settings.sound) {
//       this.playNotificationSound();
//     }

//     await this.storeNotification(notificationData);

//     return notificationData;
//   }

//   async storeNotification(notificationData) {
//     try {
//       const userId = localStorage.getItem('fintrack_user_id');
//       if (!userId) return;

//       const docRef = doc(db, 'notifications', userId);
//       const docSnap = await getDoc(docRef);

//       let notifications = [];
//       if (docSnap.exists()) {
//         notifications = docSnap.data().notifications || [];
//       }

//       notifications.unshift(notificationData);

//       await setDoc(docRef, { notifications }, { merge: true });
//     } catch (error) {
//       console.error('Failed to store notification:', error);
//     }
//   }
// }

// export const notificationService = new NotificationService();
import React, { createContext, useContext, useEffect, useState } from 'react';
import { notificationService } from "../services/notificationService";


const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  // Load notifications from somewhere (e.g., Firestore or localStorage)
  useEffect(() => {
    // Example: load notifications from Firestore or localStorage on mount
    // For now, just start with empty or you can add fetch logic here
    setNotifications([]);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // You can add methods to add notifications here,
  // possibly calling notificationService to store them

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        removeNotification,
        markAllAsRead,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
