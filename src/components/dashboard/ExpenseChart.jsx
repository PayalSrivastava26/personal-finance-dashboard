import React, { useEffect, useState } from 'react';
import {
  Box,
  Heading,
  useColorModeValue,
  Text,
  SimpleGrid,
  VStack,
  HStack,
  Spinner,
  Center,
  Alert,
  AlertIcon,
  Badge,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Area,
  AreaChart,
  Legend,
} from 'recharts';

// Firebase imports
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

// Currency formatting
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

// Colors for charts
const COLORS = ['#4299E1', '#48BB78', '#ED8936', '#F56565', '#9F7AEA', '#38B2AC', '#D69E2E', '#E53E3E'];
const GRADIENT_COLORS = ['#667eea', '#764ba2'];

const ExpenseChart = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const textColor = useColorModeValue('gray.600', 'gray.300');
  const chartTextColor = useColorModeValue('#374151', '#D1D5DB');
  const gridColor = useColorModeValue('#E5E7EB', '#4B5563');

  // Replace with actual user ID
  const userId = "demoUser123";

  // Fetch expenses from Firestore
  useEffect(() => {
    try {
      const q = query(
        collection(db, 'expenses'), 
        where('userId', '==', userId)
      );
      
      const unsubscribe = onSnapshot(q, 
        (querySnapshot) => {
          try {
            const expensesData = [];
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              expensesData.push({
                id: doc.id,
                ...data
              });
            });
            console.log("Fetched expenses:", expensesData); // Debug log
            setExpenses(expensesData);
            setLoading(false);
          } catch (error) {
            console.error("Error processing expenses:", error);
            setError(error.message);
            setLoading(false);
          }
        },
        (err) => {
          console.error("Error fetching expenses:", err);
          setError(err.message);
          setLoading(false);
        }
      );

      return () => unsubscribe();
    } catch (error) {
      console.error("Error setting up Firebase query:", error);
      setError(error.message);
      setLoading(false);
    }
  }, [userId]);

  // Process monthly data for trend analysis
  const monthlyData = React.useMemo(() => {
    console.log("Processing monthly data, expenses:", expenses.length); // Debug log
    
    if (!expenses || expenses.length === 0) {
      return [];
    }

    const monthlyExpenses = {};
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    expenses.forEach((expense) => {
      try {
        // Handle different date formats
        let date;
        if (expense.date && expense.date.toDate) {
          // Firestore timestamp
          date = expense.date.toDate();
        } else if (expense.date) {
          // Regular date string/object
          date = new Date(expense.date);
        } else {
          console.log("Invalid date for expense:", expense);
          return;
        }
        
        if (isNaN(date.getTime())) {
          console.log("Invalid date format:", expense.date);
          return;
        }
        
        const monthKey = `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}`;
        const monthName = `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
        
        if (!monthlyExpenses[monthKey]) {
          monthlyExpenses[monthKey] = {
            month: monthName,
            shortMonth: monthNames[date.getMonth()],
            amount: 0,
            count: 0
          };
        }
        
        const amount = parseFloat(expense.amount) || 0;
        monthlyExpenses[monthKey].amount += amount;
        monthlyExpenses[monthKey].count += 1;
      } catch (error) {
        console.error('Error processing expense date:', error, expense);
      }
    });

    const result = Object.values(monthlyExpenses)
      .sort((a, b) => {
        const aDate = new Date(a.month);
        const bDate = new Date(b.month);
        return aDate.getTime() - bDate.getTime();
      })
      .slice(-6);
    
    console.log("Monthly data result:", result); // Debug log
    return result;
  }, [expenses]);

  // Process category data for pie chart
  const categoryData = React.useMemo(() => {
    console.log("Processing category data, expenses:", expenses.length); // Debug log
    
    if (!expenses || expenses.length === 0) {
      return [];
    }

    const categoryExpenses = {};
    
    expenses.forEach((expense) => {
      try {
        const category = expense.category || 'Other';
        const amount = parseFloat(expense.amount) || 0;
        
        if (!categoryExpenses[category]) {
          categoryExpenses[category] = {
            name: category,
            value: 0,
            count: 0
          };
        }
        
        categoryExpenses[category].value += amount;
        categoryExpenses[category].count += 1;
      } catch (error) {
        console.error('Error processing category:', error, expense);
      }
    });

    const result = Object.values(categoryExpenses)
      .sort((a, b) => b.value - a.value);
    
    console.log("Category data result:", result); // Debug log
    return result;
  }, [expenses]);

  // Process daily spending data for the current month
  const dailySpendingData = React.useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return [];
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const dailyExpenses = {};
    
    // Initialize all days with 0
    for (let day = 1; day <= daysInMonth; day++) {
      dailyExpenses[day] = {
        day: day,
        amount: 0,
        count: 0
      };
    }
    
    expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getMonth() === currentMonth && 
               expenseDate.getFullYear() === currentYear;
      })
      .forEach(expense => {
        const day = new Date(expense.date).getDate();
        if (dailyExpenses[day]) {
          dailyExpenses[day].amount += expense.amount;
          dailyExpenses[day].count += 1;
        }
      });

    return Object.values(dailyExpenses).slice(0, Math.min(15, daysInMonth)); // Show first 15 days
  }, [expenses]);

  // Calculate statistics
  const statistics = React.useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return {
        thisMonth: 0,
        lastMonth: 0,
        avgDaily: 0,
        topCategory: 'N/A',
        totalTransactions: 0
      };
    }

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const thisMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && 
             expenseDate.getFullYear() === currentYear;
    });

    const lastMonthExpenses = expenses.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === lastMonth && 
             expenseDate.getFullYear() === lastMonthYear;
    });

    const thisMonthTotal = thisMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const lastMonthTotal = lastMonthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const avgDaily = thisMonthTotal / now.getDate();
    
    const topCategory = categoryData.length > 0 ? categoryData[0].name : 'N/A';

    return {
      thisMonth: thisMonthTotal,
      lastMonth: lastMonthTotal,
      avgDaily,
      topCategory,
      totalTransactions: thisMonthExpenses.length
    };
  }, [expenses, categoryData]);

  // Custom tooltips
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg={bgColor} p={3} border="1px" borderColor={borderColor} borderRadius="md" boxShadow="xl">
          <Text fontWeight="bold" color={textColor}>{label}</Text>
          <Text color="blue.500" fontWeight="semibold">
            Amount: {formatCurrency(payload[0].value)}
          </Text>
        </Box>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg={bgColor} p={3} border="1px" borderColor={borderColor} borderRadius="md" boxShadow="xl">
          <Text fontWeight="bold" color={textColor}>{payload[0].name}</Text>
          <Text color="blue.500" fontWeight="semibold">
            {formatCurrency(payload[0].value)}
          </Text>
          <Text fontSize="sm" color={textColor}>
            {((payload[0].value / categoryData.reduce((sum, cat) => sum + cat.value, 0)) * 100).toFixed(1)}%
          </Text>
        </Box>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <Center h="400px">
        <VStack spacing={4}>
          <Spinner size="xl" color="blue.500" thickness="4px" />
          <Text color={textColor}>Loading expense charts...</Text>
        </VStack>
      </Center>
    );
  }

  if (error) {
    return (
      <Alert status="error" borderRadius="lg">
        <AlertIcon />
        Error loading expense data: {error}
      </Alert>
    );
  }

  return (
    <VStack spacing={8} align="stretch">
      {/* Header */}
      <Box>
        <Heading size="xl" mb={3} color={useColorModeValue('gray.800', 'white')}>
          Expense Analytics Dashboard
        </Heading>
        <Text color={textColor} fontSize="lg">
          Comprehensive insights into your spending patterns
        </Text>
      </Box>

      {/* Statistics Cards */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
        <Box bg={bgColor} p={6} borderRadius="xl" border="1px" borderColor={borderColor} boxShadow="md">
          <Stat>
            <StatLabel color={textColor}>This Month</StatLabel>
            <StatNumber color="red.500" fontSize="2xl">
              {formatCurrency(statistics.thisMonth)}
            </StatNumber>
            <StatHelpText>
              {statistics.lastMonth > 0 && (
                <StatArrow 
                  type={statistics.thisMonth > statistics.lastMonth ? 'increase' : 'decrease'} 
                />
              )}
              {statistics.lastMonth > 0 && 
                `${Math.abs(((statistics.thisMonth - statistics.lastMonth) / statistics.lastMonth) * 100).toFixed(1)}%`
              }
            </StatHelpText>
          </Stat>
        </Box>

        <Box bg={bgColor} p={6} borderRadius="xl" border="1px" borderColor={borderColor} boxShadow="md">
          <Stat>
            <StatLabel color={textColor}>Daily Average</StatLabel>
            <StatNumber color="blue.500" fontSize="2xl">
              {formatCurrency(statistics.avgDaily)}
            </StatNumber>
            <StatHelpText color={textColor}>This month</StatHelpText>
          </Stat>
        </Box>

        <Box bg={bgColor} p={6} borderRadius="xl" border="1px" borderColor={borderColor} boxShadow="md">
          <Stat>
            <StatLabel color={textColor}>Top Category</StatLabel>
            <StatNumber fontSize="xl" color="green.500">
              {statistics.topCategory}
            </StatNumber>
            <StatHelpText color={textColor}>Highest spending</StatHelpText>
          </Stat>
        </Box>

        <Box bg={bgColor} p={6} borderRadius="xl" border="1px" borderColor={borderColor} boxShadow="md">
          <Stat>
            <StatLabel color={textColor}>Transactions</StatLabel>
            <StatNumber color="purple.500" fontSize="2xl">
              {statistics.totalTransactions}
            </StatNumber>
            <StatHelpText color={textColor}>This month</StatHelpText>
          </Stat>
        </Box>
      </SimpleGrid>

      {/* Charts Grid */}
      <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
        {/* Monthly Trend Area Chart */}
        <Box bg={bgColor} p={6} borderRadius="2xl" border="1px" borderColor={borderColor} boxShadow="lg">
          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading size="lg" mb={2} color={useColorModeValue('gray.800', 'white')}>
                Monthly Spending Trend
              </Heading>
              <Text fontSize="md" color={textColor}>
                6-month spending pattern 
              </Text>
            </Box>
            
            {monthlyData.length === 0 ? (
              <Center h="350px">
                <Text color={textColor} fontSize="lg">No data available</Text>
              </Center>
            ) : (
              <Box h="350px">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <defs>
                      <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4299E1" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#4299E1" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.6} />
                    <XAxis 
                      dataKey="shortMonth" 
                      tick={{ fontSize: 14, fill: chartTextColor }}
                      stroke={chartTextColor}
                    />
                    <YAxis 
                      tick={{ fontSize: 14, fill: chartTextColor }}
                      stroke={chartTextColor}
                      tickFormatter={(value) => `₹${value/1000}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="amount" 
                      stroke="#4299E1" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorAmount)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            )}
          </VStack>
        </Box>

        {/* Category Pie Chart */}
        <Box bg={bgColor} p={6} borderRadius="2xl" border="1px" borderColor={borderColor} boxShadow="lg">
          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading size="lg" mb={2} color={useColorModeValue('gray.800', 'white')}>
                Spending by Category
              </Heading>
              <Text fontSize="md" color={textColor}>
                Distribution of expenses across categories
              </Text>
            </Box>
            
            {categoryData.length === 0 ? (
              <Center h="350px">
                <Text color={textColor} fontSize="lg">No data available</Text>
              </Center>
            ) : (
              <Box h="350px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="45%"
                      outerRadius={80}
                      innerRadius={40}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => 
                        percent > 0.05 ? `${name} ${(percent * 100).toFixed(0)}%` : ''
                      }
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                    <Legend 
                      verticalAlign="bottom" 
                      height={36}
                      formatter={(value) => <span style={{ color: textColor }}>{value}</span>}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            )}
          </VStack>
        </Box>
      </SimpleGrid>

      {/* Full Width Charts */}
      <SimpleGrid columns={{ base: 1, xl: 2 }} spacing={8}>
        {/* Daily Spending Bar Chart */}
        <Box bg={bgColor} p={6} borderRadius="2xl" border="1px" borderColor={borderColor} boxShadow="lg">
          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading size="lg" mb={2} color={useColorModeValue('gray.800', 'white')}>
                Daily Spending Pattern
              </Heading>
              <Text fontSize="md" color={textColor}>
                Current month daily expenses (First 15 days)
              </Text>
            </Box>
            
            {dailySpendingData.length === 0 ? (
              <Center h="350px">
                <Text color={textColor} fontSize="lg">No data available</Text>
              </Center>
            ) : (
              <Box h="350px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailySpendingData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.6} />
                    <XAxis 
                      dataKey="day" 
                      tick={{ fontSize: 14, fill: chartTextColor }}
                      stroke={chartTextColor}
                    />
                    <YAxis 
                      tick={{ fontSize: 14, fill: chartTextColor }}
                      stroke={chartTextColor}
                      tickFormatter={(value) => `₹${value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), 'Amount']}
                      labelFormatter={(label) => `Day ${label}`}
                      contentStyle={{ 
                        backgroundColor: bgColor, 
                        border: `1px solid ${borderColor}`,
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#48BB78" 
                      radius={[4, 4, 0, 0]}
                      name="Daily Spending"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </VStack>
        </Box>

        {/* Category Comparison Bar Chart - FIXED */}
        <Box bg={bgColor} p={6} borderRadius="2xl" border="1px" borderColor={borderColor} boxShadow="lg">
          <VStack align="stretch" spacing={6}>
            <Box>
              <Heading size="lg" mb={2} color={useColorModeValue('gray.800', 'white')}>
                Category Spending Comparison
              </Heading>
              <Text fontSize="md" color={textColor}>
                Amount spent in each category
              </Text>
            </Box>
            
            {categoryData.length === 0 ? (
              <Center h="350px">
                <Text color={textColor} fontSize="lg">No data available</Text>
              </Center>
            ) : (
              <Box h="350px">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart 
                    data={categoryData.slice(0, 6)} 
                    margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.6} />
                    <XAxis 
                      dataKey="name"
                      tick={{ fontSize: 12, fill: chartTextColor }}
                      stroke={chartTextColor}
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis 
                      tick={{ fontSize: 14, fill: chartTextColor }}
                      stroke={chartTextColor}
                      tickFormatter={(value) => `₹${value >= 1000 ? `${(value/1000).toFixed(0)}k` : value}`}
                    />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value), 'Amount']}
                      contentStyle={{ 
                        backgroundColor: bgColor, 
                        border: `1px solid ${borderColor}`,
                        borderRadius: '8px'
                      }}
                    />
                    <Bar 
                      dataKey="value" 
                      fill="#9F7AEA" 
                      radius={[4, 4, 0, 0]}
                      name="Category Spending"
                    >
                      {categoryData.slice(0, 6).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            )}
          </VStack>
        </Box>
      </SimpleGrid>
    </VStack>
  );
};

export default ExpenseChart;