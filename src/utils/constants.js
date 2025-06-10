// src/utils/constants.js
import {
  MdRestaurant,
  MdDirectionsCar,
  MdShoppingCart,
  MdTheaters,
  MdHome,
  MdLocalHospital,
  MdSchool,
  MdFlightTakeoff,
  MdAccountBalanceWallet
} from 'react-icons/md'

export const EXPENSE_CATEGORIES = [
  { value: 'food', label: '🍔 Food & Dining', color: 'orange', icon: MdRestaurant },
  { value: 'transport', label: '🚗 Transportation', color: 'blue', icon: MdDirectionsCar },
  { value: 'shopping', label: '🛍️ Shopping', color: 'purple', icon: MdShoppingCart },
  { value: 'entertainment', label: '🎬 Entertainment', color: 'pink', icon: MdTheaters },
  { value: 'bills', label: '📱 Bills & Utilities', color: 'red', icon: MdHome },
  { value: 'health', label: '🏥 Healthcare', color: 'green', icon: MdLocalHospital },
  { value: 'education', label: '📚 Education', color: 'teal', icon: MdSchool },
  { value: 'travel', label: '✈️ Travel', color: 'cyan', icon: MdFlightTakeoff },
  { value: 'other', label: '📦 Other', color: 'gray', icon: MdAccountBalanceWallet }
]

export const CHART_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9'
]

export const MONTHLY_BUDGET = 2000