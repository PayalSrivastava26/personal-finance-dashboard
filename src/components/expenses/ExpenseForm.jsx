import React from 'react';
import {
  VStack,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Select,
  Textarea,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Text,
  Box,
  SimpleGrid,
} from '@chakra-ui/react';
import {
  FiDollarSign,
  FiCalendar,
  FiTag,
  FiFileText,
  FiSave,
  FiRefreshCw,
} from 'react-icons/fi';
import { EXPENSE_CATEGORIES } from '../../utils/constants';

const ExpenseForm = ({ 
  initialData = {}, 
  onSubmit, 
  isSubmitting = false,
  submitText = 'Add Expense',
  showResetButton = true 
}) => {
  const [formData, setFormData] = React.useState({
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    notes: '',
    ...initialData
  });
  
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const inputBg = useColorModeValue('white', 'gray.700');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'description':
        return !value.trim() ? 'Description is required' : '';
      case 'amount':
        if (!value || isNaN(value) || parseFloat(value) <= 0) {
          return 'Please enter a valid amount greater than 0';
        }
        return '';
      case 'category':
        return !value ? 'Please select a category' : '';
      case 'date':
        if (!value) return 'Date is required';
        if (new Date(value) > new Date()) {
          return 'Date cannot be in the future';
        }
        return '';
      default:
        return '';
    }
  };

  // Validate entire form
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'notes') { // notes is optional
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const expenseData = {
        ...formData,
        amount: parseFloat(formData.amount),
        id: initialData.id || Date.now().toString(),
      };
      
      onSubmit(expenseData);
    } else {
      // Mark all fields as touched to show errors
      const allTouched = {};
      Object.keys(formData).forEach(key => {
        allTouched[key] = true;
      });
      setTouched(allTouched);
    }
  };

  const handleReset = () => {
    setFormData({
      description: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      notes: '',
    });
    setErrors({});
    setTouched({});
  };

  const shouldShowError = (field) => touched[field] && errors[field];

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        {/* Description */}
        <FormControl isInvalid={shouldShowError('description')} isRequired>
          <FormLabel fontSize="sm" fontWeight="semibold">
            Description
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiFileText color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="What did you spend on?"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              onBlur={() => handleBlur('description')}
              bg={inputBg}
              border="1px"
              borderColor={inputBorder}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
            />
          </InputGroup>
          <FormErrorMessage fontSize="xs">
            {errors.description}
          </FormErrorMessage>
        </FormControl>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
          {/* Amount */}
          <FormControl isInvalid={shouldShowError('amount')} isRequired>
            <FormLabel fontSize="sm" fontWeight="semibold">
              Amount
            </FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FiDollarSign color="gray.400" />
              </InputLeftElement>
              <NumberInput
                value={formData.amount}
                onChange={(valueString) => handleChange('amount', valueString)}
                onBlur={() => handleBlur('amount')}
                min={0}
                precision={2}
                step={0.01}
              >
                <NumberInputField
                  pl={10}
                  placeholder="0.00"
                  bg={inputBg}
                  border="1px"
                  borderColor={inputBorder}
                  _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
                />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </InputGroup>
            <FormErrorMessage fontSize="xs">
              {errors.amount}
            </FormErrorMessage>
          </FormControl>

          {/* Category */}
          <FormControl isInvalid={shouldShowError('category')} isRequired>
            <FormLabel fontSize="sm" fontWeight="semibold">
              Category
            </FormLabel>
            <Select
              placeholder="Select category"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
              onBlur={() => handleBlur('category')}
              bg={inputBg}
              border="1px"
              borderColor={inputBorder}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
            >
              {EXPENSE_CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </Select>
            <FormErrorMessage fontSize="xs">
              {errors.category}
            </FormErrorMessage>
          </FormControl>
        </SimpleGrid>

        {/* Date */}
        <FormControl isInvalid={shouldShowError('date')} isRequired>
          <FormLabel fontSize="sm" fontWeight="semibold">
            Date
          </FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <FiCalendar color="gray.400" />
            </InputLeftElement>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              onBlur={() => handleBlur('date')}
              bg={inputBg}
              border="1px"
              borderColor={inputBorder}
              _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
            />
          </InputGroup>
          <FormErrorMessage fontSize="xs">
            {errors.date}
          </FormErrorMessage>
        </FormControl>

        {/* Notes (Optional) */}
        <FormControl>
          <FormLabel fontSize="sm" fontWeight="semibold">
            Notes <Text as="span" color="gray.500" fontWeight="normal">(optional)</Text>
          </FormLabel>
          <Textarea
            placeholder="Add any additional notes about this expense..."
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            bg={inputBg}
            border="1px"
            borderColor={inputBorder}
            _focus={{ borderColor: 'blue.500', boxShadow: '0 0 0 1px blue.500' }}
            resize="vertical"
            minH="80px"
          />
        </FormControl>

        {/* Form Actions */}
        <HStack spacing={3} pt={4}>
          <Button
            type="submit"
            colorScheme="blue"
            leftIcon={<FiSave />}
            isLoading={isSubmitting}
            loadingText="Saving..."
            flex={1}
            size="lg"
            borderRadius="lg"
            _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
            transition="all 0.2s"
          >
            {submitText}
          </Button>
          
          {showResetButton && (
            <Button
              type="button"
              variant="outline"
              leftIcon={<FiRefreshCw />}
              onClick={handleReset}
              isDisabled={isSubmitting}
              size="lg"
              borderRadius="lg"
              _hover={{ transform: 'translateY(-2px)', boxShadow: 'md' }}
              transition="all 0.2s"
            >
              Reset
            </Button>
          )}
        </HStack>

        {/* Form Summary */}
        {formData.amount && formData.category && (
          <Box
            p={4}
            bg={useColorModeValue('blue.50', 'blue.900')}
            borderRadius="lg"
            border="1px"
            borderColor={useColorModeValue('blue.200', 'blue.700')}
          >
            <Text fontSize="sm" color={useColorModeValue('blue.700', 'blue.200')}>
              <strong>Summary:</strong> Adding ${formData.amount} expense for {formData.category}
              {formData.description && ` - ${formData.description}`}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default ExpenseForm;