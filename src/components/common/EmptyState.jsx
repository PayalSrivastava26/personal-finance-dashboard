import React from 'react';
import {
  Box,
  VStack,
  Text,
  Button,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
import { 
  FiInbox, 
  FiDollarSign, 
  FiPieChart, 
  FiTrendingUp,
  FiPlus,
  FiSearch,
  FiFilter
} from 'react-icons/fi';

const EmptyState = ({
  icon = FiInbox,
  title = 'No data found',
  description = 'There are no items to display.',
  actionLabel,
  onAction,
  variant = 'default', // 'default', 'expenses', 'search', 'filter'
  size = 'md' // 'sm', 'md', 'lg'
}) => {
  const textColor = useColorModeValue('gray.600', 'gray.400');
  const iconColor = useColorModeValue('gray.300', 'gray.500');

  // Predefined variants for common use cases
  const getVariantProps = () => {
    switch (variant) {
      case 'expenses':
        return {
          icon: FiDollarSign,
          title: 'No expenses yet',
          description: 'Start tracking your expenses by adding your first transaction.',
          actionLabel: 'Add Expense',
          iconColor: 'blue.300'
        };
      case 'search':
        return {
          icon: FiSearch,
          title: 'No results found',
          description: 'Try adjusting your search terms or filters.',
          iconColor: 'gray.300'
        };
      case 'filter':
        return {
          icon: FiFilter,
          title: 'No matching items',
          description: 'No items match the current filters. Try adjusting your criteria.',
          iconColor: 'gray.300'
        };
      case 'chart':
        return {
          icon: FiPieChart,
          title: 'No data to display',
          description: 'Add some expenses to see your spending patterns.',
          iconColor: 'purple.300'
        };
      case 'trends':
        return {
          icon: FiTrendingUp,
          title: 'No trends available',
          description: 'More data is needed to show spending trends.',
          iconColor: 'green.300'
        };
      default:
        return {
          icon,
          title,
          description,
          actionLabel,
          iconColor: 'gray.300'
        };
    }
  };

  const getSizeProps = () => {
    switch (size) {
      case 'sm':
        return {
          iconSize: 12,
          titleSize: 'lg',
          descSize: 'sm',
          spacing: 3,
          py: 8
        };
      case 'lg':
        return {
          iconSize: 20,
          titleSize: '2xl',
          descSize: 'lg',
          spacing: 6,
          py: 16
        };
      default: // md
        return {
          iconSize: 16,
          titleSize: 'xl',
          descSize: 'md',
          spacing: 4,
          py: 12
        };
    }
  };

  const variantProps = getVariantProps();
  const sizeProps = getSizeProps();
  const finalActionLabel = actionLabel || variantProps.actionLabel;
  const finalIcon = icon !== FiInbox ? icon : variantProps.icon;

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="200px"
      py={sizeProps.py}
      px={4}
      textAlign="center"
    >
      <VStack spacing={sizeProps.spacing} maxW="md">
        <Icon
          as={finalIcon}
          w={sizeProps.iconSize}
          h={sizeProps.iconSize}
          color={variantProps.iconColor || iconColor}
        />
        
        <VStack spacing={2}>
          <Text
            fontSize={sizeProps.titleSize}
            fontWeight="semibold"
            color={textColor}
          >
            {variantProps.title}
          </Text>
          
          <Text
            fontSize={sizeProps.descSize}
            color={textColor}
            maxW="sm"
            lineHeight="tall"
          >
            {variantProps.description}
          </Text>
        </VStack>

        {finalActionLabel && onAction && (
          <Button
            leftIcon={<Icon as={FiPlus} />}
            colorScheme="blue"
            onClick={onAction}
            size={size === 'sm' ? 'sm' : 'md'}
            mt={2}
          >
            {finalActionLabel}
          </Button>
        )}
      </VStack>
    </Box>
  );
};
export default EmptyState;


