// import { db } from '../config/firebase';
// import { collection, addDoc } from 'firebase/firestore';

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
//         ...options,
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
//           totalBudget: budgetData.totalBudget,
//         },
//         timestamp: new Date().toISOString(),
//       };

//       if (settings.desktop) {
//         this.showNotification(title, {
//           body,
//           icon: '💰',
//           tag: 'budget-alert',
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
//       timestamp: new Date().toISOString(),
//     };

//     if (settings.desktop) {
//       this.showNotification(title, {
//         body,
//         icon: '📝',
//         tag: 'daily-reminder',
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
//       timestamp: new Date().toISOString(),
//     };

//     if (settings.desktop) {
//       this.showNotification(title, {
//         body,
//         icon: '📊',
//         tag: 'weekly-report',
//       });
//     }

//     if (settings.sound) {
//       this.playNotificationSound();
//     }

//     await this.storeNotification(notificationData);

//     return notificationData;
//   }

//   // 🔔 Store notification in Firebase under 'notifications' collection
//   async storeNotification(notification) {
//     try {
//       const notificationsRef = collection(db, 'notifications');
//       await addDoc(notificationsRef, notification);
//     } catch (error) {
//       console.error('Failed to store notification:', error);
//     }
//   }
// }

// export default new NotificationService();
// src/services/NotificationService.js
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
 // adjust the path to your Firebase config

class NotificationService {
  constructor() {
    this.permission = 'default';
    this.checkPermission();
  }

  async checkPermission() {
    if ('Notification' in window) {
      this.permission = Notification.permission;
      if (this.permission === 'default') {
        this.permission = await Notification.requestPermission();
      }
    }
    return this.permission;
  }

  async requestPermission() {
    if ('Notification' in window) {
      this.permission = await Notification.requestPermission();
      return this.permission === 'granted';
    }
    return false;
  }

  showNotification(title, options = {}) {
    if (this.permission === 'granted') {
      const defaultOptions = {
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        dir: 'auto',
        lang: 'en',
        renotify: false,
        requireInteraction: false,
        silent: false,
        tag: 'fintrack-notification',
        timestamp: Date.now(),
        ...options,
      };

      const notification = new Notification(title, defaultOptions);

      setTimeout(() => {
        notification.close();
      }, 5000);

      return notification;
    }
    return null;
  }

  playNotificationSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (error) {
      console.warn('Could not play notification sound:', error);
    }
  }

  async sendBudgetAlert(budgetData, expenseData, settings) {
    if (!settings.enabled || !settings.budgetAlert?.enabled) return;

    const spentPercentage = (expenseData.totalSpent / budgetData.totalBudget) * 100;

    if (spentPercentage >= settings.budgetAlert.threshold) {
      const title = '💰 Budget Alert!';
      const body = `You've spent ${spentPercentage.toFixed(1)}% of your budget (₹${expenseData.totalSpent.toLocaleString()} of ₹${budgetData.totalBudget.toLocaleString()})`;

      const notificationData = {
        title,
        body,
        type: 'budget_alert',
        data: {
          spentPercentage,
          totalSpent: expenseData.totalSpent,
          totalBudget: budgetData.totalBudget,
        },
        timestamp: new Date().toISOString(),
      };

      if (settings.desktop) {
        this.showNotification(title, {
          body,
          icon: '/icons/budget.png',
          tag: 'budget-alert',
        });
      }

      if (settings.sound) {
        this.playNotificationSound();
      }

      await this.storeNotification(notificationData);

      return notificationData;
    }
  }

  async sendDailyReminder(settings) {
    if (!settings.enabled || !settings.dailyReminder?.enabled) return;

    const title = '📝 Daily Reminder';
    const body = "Don't forget to track your expenses today!";

    const notificationData = {
      title,
      body,
      type: 'daily_reminder',
      timestamp: new Date().toISOString(),
    };

    if (settings.desktop) {
      this.showNotification(title, {
        body,
        icon: '/icons/reminder.png',
        tag: 'daily-reminder',
      });
    }

    if (settings.sound) {
      this.playNotificationSound();
    }

    await this.storeNotification(notificationData);

    return notificationData;
  }

  async sendWeeklyReport(reportData, settings) {
    if (!settings.enabled || !settings.weeklyReport?.enabled) return;

    const title = '📊 Weekly Report';
    const body = `This week: ₹${reportData.totalSpent.toLocaleString()} spent across ${reportData.transactionCount} transactions`;

    const notificationData = {
      title,
      body,
      type: 'weekly_report',
      data: reportData,
      timestamp: new Date().toISOString(),
    };

    if (settings.desktop) {
      this.showNotification(title, {
        body,
        icon: '/icons/report.png',
        tag: 'weekly-report',
      });
    }

    if (settings.sound) {
      this.playNotificationSound();
    }

    await this.storeNotification(notificationData);

    return notificationData;
  }

  async storeNotification(notificationData) {
    try {
      const userId = localStorage.getItem('fintrack_user_id');
      if (!userId) return;

      const docRef = doc(db, 'notifications', userId);
      const docSnap = await getDoc(docRef);

      let notifications = [];
      if (docSnap.exists()) {
        notifications = docSnap.data().notifications || [];
      }

      notifications.unshift(notificationData);

      // Optional: limit stored notifications to last 50
      notifications = notifications.slice(0, 50);

      await setDoc(docRef, { notifications }, { merge: true });
    } catch (error) {
      console.error('Failed to store notification:', error);
    }
  }
}

export const notificationService = new NotificationService();
