// src/hooks/useSettings.js
import { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../config/firebase';

const defaultSettings = {
  // Profile
  displayName: '',
  email: '',
  photoURL: '',
  
  // Notifications
  emailNotifications: true,
  budgetAlerts: true,
  weeklyReports: false,
  monthlyReports: true,
  
  // Preferences
  currency: 'INR',
  dateFormat: 'DD/MM/YYYY',
  language: 'en',
  budgetWarningThreshold: 80,
  
  // Privacy
  dataSharing: false,
  analytics: true,
  
  // Features
  categorySuggestions: true,
  autoBackup: false,
};

export const useSettings = () => {
  const [user] = useAuthState(auth);
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  // Load settings from Firestore
  useEffect(() => {
    const loadSettings = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setSettings(prev => ({
            ...prev,
            ...userData.settings,
            displayName: userData.displayName || user.displayName || '',
            email: userData.email || user.email || '',
            photoURL: userData.photoURL || user.photoURL || '',
          }));
        } else {
          // Set default values from user auth
          setSettings(prev => ({
            ...prev,
            displayName: user.displayName || '',
            email: user.email || '',
            photoURL: user.photoURL || '',
          }));
        }
      } catch (error) {
        console.error('Error loading settings:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSettings();
  }, [user]);

  // Update a single setting
  const updateSetting = async (key, value) => {
    if (!user) return;

    try {
      const newSettings = { ...settings, [key]: value };
      setSettings(newSettings);

      await updateDoc(doc(db, 'users', user.uid), {
        settings: newSettings,
        updatedAt: new Date(),
      });

      return true;
    } catch (error) {
      console.error('Error updating setting:', error);
      return false;
    }
  };

  // Update multiple settings at once
  const updateSettings = async (newSettings) => {
    if (!user) return;

    try {
      const updatedSettings = { ...settings, ...newSettings };
      setSettings(updatedSettings);

      await updateDoc(doc(db, 'users', user.uid), {
        settings: updatedSettings,
        updatedAt: new Date(),
      });

      return true;
    } catch (error) {
      console.error('Error updating settings:', error);
      return false;
    }
  };

  // Get currency symbol
  const getCurrencySymbol = () => {
    const currencySymbols = {
      INR: '₹',
      USD: '$',
      EUR: '€',
      GBP: '£',
    };
    return currencySymbols[settings.currency] || '₹';
  };

  // Format amount with currency
  const formatAmount = (amount) => {
    const symbol = getCurrencySymbol();
    return `${symbol}${Number(amount).toLocaleString()}`;
  };

  // Format date according to user preference
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();

    switch (settings.dateFormat) {
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`;
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      default: // DD/MM/YYYY
        return `${day}/${month}/${year}`;
    }
  };

  return {
    settings,
    loading,
    updateSetting,
    updateSettings,
    getCurrencySymbol,
    formatAmount,
    formatDate,
  };
};