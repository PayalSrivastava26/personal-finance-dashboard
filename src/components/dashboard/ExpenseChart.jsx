// import React from 'react';
// import {
//   Box,
//   Heading,
//   useColorModeValue,
//   Select,
//   HStack,
//   Text,
// } from '@chakra-ui/react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   Legend,
// } from 'recharts';
// import useExpenses from "../../hooks/useExpenses";
// import { formatCurrency } from '../../utils/formatters';

// const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

// const ExpenseChart = () => {
//   const { expenses } = useExpenses();
//   const [chartType, setChartType] = React.useState('line');
  
//   const bgColor = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');

//   // Prepare data for line chart (monthly spending)
//   const monthlyData = React.useMemo(() => {
//     const data = {};
//     expenses.forEach(expense => {
//       const month = new Date(expense.date).toLocaleDateString('en-US', { 
//         month: 'short', 
//         year: '2-digit' 
//       });
//       data[month] = (data[month] || 0) + expense.amount;
//     });
    
//     return Object.entries(data).map(([month, amount]) => ({
//       month,
//       amount,
//     })).slice(-6); // Last 6 months
//   }, [expenses]);

//   // Prepare data for pie chart (category breakdown)
//   const categoryData = React.useMemo(() => {
//     const data = {};
//     expenses.forEach(expense => {
//       data[expense.category] = (data[expense.category] || 0) + expense.amount;
//     });
    
//     return Object.entries(data).map(([category, amount]) => ({
//       category,
//       amount,
//     }));
//   }, [expenses]);

//   // Prepare data for bar chart (weekly spending)
//   const weeklyData = React.useMemo(() => {
//     const data = {};
//     expenses.forEach(expense => {
//       const week = `Week ${Math.ceil(new Date(expense.date).getDate() / 7)}`;
//       data[week] = (data[week] || 0) + expense.amount;
//     });
    
//     return Object.entries(data).map(([week, amount]) => ({
//       week,
//       amount,
//     }));
//   }, [expenses]);

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <Box
//           bg={bgColor}
//           p={3}
//           border="1px"
//           borderColor={borderColor}
//           borderRadius="md"
//           boxShadow="lg"
//         >
//           <Text fontWeight="semibold">{label}</Text>
//           <Text color="blue.500">
//             Amount: {formatCurrency(payload[0].value)}
//           </Text>
//         </Box>
//       );
//     }
//     return null;
//   };

//   const renderChart = () => {
//     switch (chartType) {
//       case 'pie':
//         return (
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={categoryData}
//                 cx="50%"
//                 cy="50%"
//                 labelLine={false}
//                 label={({ category, percent }) => 
//                   `${category} ${(percent * 100).toFixed(0)}%`
//                 }
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="amount"
//               >
//                 {categoryData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip 
//                 formatter={(value) => [formatCurrency(value), 'Amount']}
//               />
//             </PieChart>
//           </ResponsiveContainer>
//         );
      
//       case 'bar':
//         return (
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={weeklyData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="week" />
//               <YAxis tickFormatter={(value) => `$${value}`} />
//               <Tooltip content={<CustomTooltip />} />
//               <Bar dataKey="amount" fill="#0088FE" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         );
      
//       default:
//         return (
//           <ResponsiveContainer width="100%" height={300}>
//             <LineChart data={monthlyData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="month" />
//               <YAxis tickFormatter={(value) => `$${value}`} />
//               <Tooltip content={<CustomTooltip />} />
//               <Line 
//                 type="monotone" 
//                 dataKey="amount" 
//                 stroke="#0088FE" 
//                 strokeWidth={3}
//                 dot={{ fill: '#0088FE', strokeWidth: 2, r: 6 }}
//                 activeDot={{ r: 8 }}
//               />
//             </LineChart>
//           </ResponsiveContainer>
//         );
//     }
//   };

//   return (
//     <Box
//       bg={bgColor}
//       p={6}
//       borderRadius="xl"
//       border="1px"
//       borderColor={borderColor}
//       boxShadow="sm"
//     >
//       <HStack justify="space-between" mb={6}>
//         <Heading size="md" color="gray.700">
//           Expense Analytics
//         </Heading>
//         <Select
//           value={chartType}
//           onChange={(e) => setChartType(e.target.value)}
//           width="150px"
//           size="sm"
//         >
//           <option value="line">Monthly Trend</option>
//           <option value="pie">Categories</option>
//           <option value="bar">Weekly</option>
//         </Select>
//       </HStack>
      
//       {expenses.length === 0 ? (
//         <Box textAlign="center" py={12}>
//           <Text color="gray.500">No expense data to display</Text>
//         </Box>
//       ) : (
//         renderChart()
//       )}
//     </Box>
//   );
// };

// export default ExpenseChart;
// import React from 'react';
// import {
//   Box,
//   Heading,
//   useColorModeValue,
//   Text,
// } from '@chakra-ui/react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import useExpenses from "../../hooks/useExpenses";
// import { formatCurrency } from '../../utils/formatters';

// const ExpenseChart = () => {
//   const { expenses } = useExpenses();
  
//   const bgColor = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');

//   // DEBUG: Log the data
//   console.log('Debug - Expenses:', expenses);
//   console.log('Debug - Expenses length:', expenses.length);

//   // Sample data for testing
//   const sampleData = [
//     { month: 'Jan', amount: 200 },
//     { month: 'Feb', amount: 150 },
//     { month: 'Mar', amount: 300 },
//     { month: 'Apr', amount: 250 },
//     { month: 'May', amount: 180 },
//     { month: 'Jun', amount: 220 }
//   ];

//   // Try to process real data, fallback to sample
//   const monthlyData = React.useMemo(() => {
//     if (!expenses || expenses.length === 0) {
//       console.log('Debug - Using sample data');
//       return sampleData;
//     }

//     console.log('Debug - Processing real data');
//     const monthlyExpenses = {};
    
//     expenses.forEach((expense, index) => {
//       console.log(`Debug - Processing expense ${index}:`, expense);
      
//       try {
//         const date = new Date(expense.date);
//         console.log('Debug - Parsed date:', date);
        
//         if (isNaN(date.getTime())) {
//           console.error('Debug - Invalid date:', expense.date);
//           return;
//         }
        
//         const monthLabel = date.toLocaleDateString('en-US', { 
//           month: 'short', 
//           year: '2-digit' 
//         });
        
//         monthlyExpenses[monthLabel] = (monthlyExpenses[monthLabel] || 0) + expense.amount;
//       } catch (error) {
//         console.error('Debug - Date processing error:', error, expense);
//       }
//     });
    
//     const result = Object.entries(monthlyExpenses).map(([month, amount]) => ({
//       month,
//       amount,
//     }));
    
//     console.log('Debug - Final monthly data:', result);
//     return result;
//   }, [expenses]);

//   return (
//     <Box
//       bg={bgColor}
//       p={6}
//       borderRadius="xl"
//       border="1px"
//       borderColor={borderColor}
//       boxShadow="sm"
//     >
//       <Heading size="md" color="gray.700" mb={6}>
//         Expense Analytics (Debug Mode)
//       </Heading>
      
//       {/* Debug Info */}
//       <Box mb={4} p={3} bg="yellow.50" borderRadius="md" fontSize="sm">
//         <Text><strong>Debug Info:</strong></Text>
//         <Text>Expenses count: {expenses?.length || 0}</Text>
//         <Text>Chart data points: {monthlyData.length}</Text>
//         <Text>Using: {(!expenses || expenses.length === 0) ? 'Sample Data' : 'Real Data'}</Text>
//       </Box>
      
//       {monthlyData.length === 0 ? (
//         <Box textAlign="center" py={12}>
//           <Text color="gray.500">No data to display</Text>
//         </Box>
//       ) : (
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={monthlyData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis tickFormatter={(value) => `$${value}`} />
//             <Tooltip 
//               formatter={(value) => [formatCurrency ? formatCurrency(value) : `$${value}`, 'Amount']}
//             />
//             <Line 
//               type="monotone" 
//               dataKey="amount" 
//               stroke="#0088FE" 
//               strokeWidth={3}
//               dot={{ fill: '#0088FE', strokeWidth: 2, r: 6 }}
//             />
//           </LineChart>
//         </ResponsiveContainer>
//       )}
//     </Box>
//   );
// };

// export default ExpenseChart;
import React from 'react';
import {
  Box,
  Heading,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import useExpenses from "../../hooks/useExpenses";
import { formatCurrency } from '../../utils/formatters';

const ExpenseChart = () => {
  const { expenses } = useExpenses();
  
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  // Sample data for testing
  const sampleData = [
    { month: 'Jan', amount: 200 },
    { month: 'Feb', amount: 150 },
    { month: 'Mar', amount: 300 },
    { month: 'Apr', amount: 250 },
    { month: 'May', amount: 180 },
    { month: 'Jun', amount: 220 }
  ];

  // Process real data or use sample
  const monthlyData = React.useMemo(() => {
    if (!expenses || expenses.length === 0) {
      return sampleData;
    }

    const monthlyExpenses = {};
    
    expenses.forEach((expense) => {
      try {
        const date = new Date(expense.date);
        
        if (isNaN(date.getTime())) {
          return;
        }
        
        const monthLabel = date.toLocaleDateString('en-US', { 
          month: 'short'
        });
        
        monthlyExpenses[monthLabel] = (monthlyExpenses[monthLabel] || 0) + expense.amount;
      } catch (error) {
        console.error('Date processing error:', error);
      }
    });
    
    return Object.entries(monthlyExpenses).map(([month, amount]) => ({
      month,
      amount,
    }));
  }, [expenses]);

  return (
    <Box
      bg={bgColor}
      p={6}
      borderRadius="xl"
      border="1px"
      borderColor={borderColor}
      boxShadow="sm"
    >
      <Heading size="md" color="gray.700" mb={6}>
        Expense Analytics
      </Heading>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(value) => `$${value}`} />
          <Tooltip 
            formatter={(value) => [`$${value}`, 'Amount']}
          />
          <Line 
            type="monotone" 
            dataKey="amount" 
            stroke="#0088FE" 
            strokeWidth={3}
            dot={{ fill: '#0088FE', strokeWidth: 2, r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ExpenseChart;