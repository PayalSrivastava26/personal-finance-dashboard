import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Heading,
  Text,
  Button,
  Input,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Badge
} from '@chakra-ui/react';
import {
  MdEdit,
  MdDelete,
  MdAdd,
  MdSave,
  MdRefresh,
  MdAccountBalanceWallet,
  MdCategory
} from 'react-icons/md';
import { useBudgetContext } from '../../context/BudgetContext';
import { useExpenseContext } from '../../context/ExpenseContext';
import { formatCurrency } from '../../utils/formatters';

const SetBudget = () => {
  const {
    budgets,
    monthlyBudgetLimit,
    loading,
    updateCategoryBudget,
    updateMonthlyBudgetLimit,
    addNewCategory,
    deleteCategoryBudget,
    resetToDefaults,
    getTotalBudget
  } = useBudgetContext();

  const { getExpensesByCategory } = useExpenseContext();
  
  const [editingCategory, setEditingCategory] = useState(null);
  const [editAmount, setEditAmount] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryAmount, setNewCategoryAmount] = useState('');
  const [monthlyLimit, setMonthlyLimit] = useState(monthlyBudgetLimit);
  
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
  const [categoryToDelete, setCategoryToDelete] = useState('');
  
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const cardBg = useColorModeValue('gray.50', 'gray.700');

  const currentMonthExpenses = getExpensesByCategory();
  const totalBudget = getTotalBudget();

  const handleEditStart = (category, currentAmount) => {
    setEditingCategory(category);
    setEditAmount(currentAmount.toString());
  };

  const handleEditSave = async () => {
    if (editingCategory && editAmount !== '') {
      await updateCategoryBudget(editingCategory, editAmount);
      setEditingCategory(null);
      setEditAmount('');
      toast({
        title: 'Budget Updated',
        description: `${editingCategory} budget updated successfully!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleEditCancel = () => {
    setEditingCategory(null);
    setEditAmount('');
  };

  const handleAddCategory = async () => {
    if (newCategoryName && newCategoryAmount) {
      const success = await addNewCategory(newCategoryName, newCategoryAmount);
      if (success) {
        setNewCategoryName('');
        setNewCategoryAmount('');
        onAddClose();
        toast({
          title: 'Category Added',
          description: `${newCategoryName} category added successfully!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Error',
          description: 'Category already exists or invalid name!',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      await deleteCategoryBudget(categoryToDelete);
      onDeleteClose();
      setCategoryToDelete('');
      toast({
        title: 'Category Deleted',
        description: `${categoryToDelete} category deleted successfully!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleMonthlyLimitUpdate = async () => {
    await updateMonthlyBudgetLimit(monthlyLimit);
    toast({
      title: 'Monthly Limit Updated',
      description: 'Monthly budget limit updated successfully!',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleResetToDefaults = async () => {
    await resetToDefaults();
    setMonthlyLimit(25000);
    toast({
      title: 'Reset Complete',
      description: 'All budgets reset to default values!',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  const confirmDelete = (category) => {
    setCategoryToDelete(category);
    onDeleteOpen();
  };

  if (loading) {
    return (
      <Box p={6}>
        <Text>Loading budget settings...</Text>
      </Box>
    );
  }

  return (
    <Box p={6} maxW="1200px" mx="auto">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box>
          <Heading size="lg" mb={2} color="brand.500">
            Budget Settings
          </Heading>
          <Text color="gray.600">
            Manage your monthly budget limits and category allocations
          </Text>
        </Box>

        {/* Monthly Budget Limit */}
        <Card>
          <CardHeader>
            <HStack>
              <MdAccountBalanceWallet />
              <Heading size="md">Monthly Budget Limit</Heading>
            </HStack>
          </CardHeader>
          <CardBody>
            <HStack spacing={4} align="end">
              <FormControl maxW="300px">
                <FormLabel>Total Monthly Limit</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.400">
                    ₹
                  </InputLeftElement>
                  <Input
                    type="number"
                    value={monthlyLimit}
                    onChange={(e) => setMonthlyLimit(e.target.value)}
                    placeholder="Enter monthly limit"
                  />
                </InputGroup>
              </FormControl>
              <Button
                colorScheme="blue"
                leftIcon={<MdSave />}
                onClick={handleMonthlyLimitUpdate}
                isDisabled={monthlyLimit === monthlyBudgetLimit}
              >
                Update Limit
              </Button>
            </HStack>
            
            <HStack mt={4} spacing={6}>
              <Stat>
                <StatLabel>Current Limit</StatLabel>
                <StatNumber>{formatCurrency(monthlyBudgetLimit)}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Category Total</StatLabel>
                <StatNumber color={totalBudget > monthlyBudgetLimit ? 'red.500' : 'green.500'}>
                  {formatCurrency(totalBudget)}
                </StatNumber>
                <StatHelpText>
                  {totalBudget > monthlyBudgetLimit ? 'Over limit' : 'Within limit'}
                </StatHelpText>
              </Stat>
            </HStack>

            {totalBudget > monthlyBudgetLimit && (
              <Alert status="warning" mt={4}>
                <AlertIcon />
                <AlertTitle>Budget Warning!</AlertTitle>
                <AlertDescription>
                  Your category budgets total exceeds the monthly limit by {formatCurrency(totalBudget - monthlyBudgetLimit)}
                </AlertDescription>
              </Alert>
            )}
          </CardBody>
        </Card>

        {/* Category Budgets */}
        <Card>
          <CardHeader>
            <HStack justify="space-between">
              <HStack>
                <MdCategory />
                <Heading size="md">Category Budgets</Heading>
              </HStack>
              <HStack>
                <Button
                  size="sm"
                  leftIcon={<MdAdd />}
                  colorScheme="green"
                  onClick={onAddOpen}
                >
                  Add Category
                </Button>
                <Button
                  size="sm"
                  leftIcon={<MdRefresh />}
                  variant="outline"
                  onClick={handleResetToDefaults}
                >
                  Reset to Defaults
                </Button>
              </HStack>
            </HStack>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={4}>
              {Object.entries(budgets).map(([category, budget]) => {
                const spent = currentMonthExpenses[category] || 0;
                const remaining = budget - spent;
                const percentage = budget > 0 ? (spent / budget) * 100 : 0;
                const isEditing = editingCategory === category;

                return (
                  <Box
                    key={category}
                    p={4}
                    bg={cardBg}
                    borderRadius="lg"
                    border="1px"
                    borderColor={borderColor}
                  >
                    <VStack align="stretch" spacing={3}>
                      <HStack justify="space-between">
                        <Text fontWeight="semibold">{category}</Text>
                        <HStack>
                          {!isEditing && (
                            <>
                              <IconButton
                                size="xs"
                                icon={<MdEdit />}
                                onClick={() => handleEditStart(category, budget)}
                                aria-label="Edit budget"
                              />
                              <IconButton
                                size="xs"
                                icon={<MdDelete />}
                                colorScheme="red"
                                variant="ghost"
                                onClick={() => confirmDelete(category)}
                                aria-label="Delete category"
                              />
                            </>
                          )}
                        </HStack>
                      </HStack>

                      {isEditing ? (
                        <VStack spacing={2}>
                          <InputGroup>
                            <InputLeftElement pointerEvents="none" color="gray.400">
                              ₹
                            </InputLeftElement>
                            <Input
                              size="sm"
                              type="number"
                              value={editAmount}
                              onChange={(e) => setEditAmount(e.target.value)}
                              placeholder="Enter amount"
                            />
                          </InputGroup>
                          <HStack spacing={2}>
                            <Button size="xs" colorScheme="green" onClick={handleEditSave}>
                              Save
                            </Button>
                            <Button size="xs" variant="ghost" onClick={handleEditCancel}>
                              Cancel
                            </Button>
                          </HStack>
                        </VStack>
                      ) : (
                        <VStack align="stretch" spacing={2}>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Budget:</Text>
                            <Text fontSize="sm" fontWeight="semibold">
                              {formatCurrency(budget)}
                            </Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Spent:</Text>
                            <Text fontSize="sm" color={spent > budget ? 'red.500' : 'blue.500'}>
                              {formatCurrency(spent)}
                            </Text>
                          </HStack>
                          <HStack justify="space-between">
                            <Text fontSize="sm" color="gray.600">Remaining:</Text>
                            <Text fontSize="sm" color={remaining >= 0 ? 'green.500' : 'red.500'}>
                              {formatCurrency(remaining)}
                            </Text>
                          </HStack>
                          <Badge
                            colorScheme={percentage > 100 ? 'red' : percentage > 80 ? 'yellow' : 'green'}
                            variant="subtle"
                            textAlign="center"
                          >
                            {percentage.toFixed(0)}% used
                          </Badge>
                        </VStack>
                      )}
                    </VStack>
                  </Box>
                );
              })}
            </SimpleGrid>
          </CardBody>
        </Card>
      </VStack>

      {/* Add Category Modal */}
      <Modal isOpen={isAddOpen} onClose={onAddClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Category Name</FormLabel>
                <Input
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                />
              </FormControl>
              <FormControl>
                <FormLabel>Budget Amount</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none" color="gray.400">
                    ₹
                  </InputLeftElement>
                  <Input
                    type="number"
                    value={newCategoryAmount}
                    onChange={(e) => setNewCategoryAmount(e.target.value)}
                    placeholder="Enter budget amount"
                  />
                </InputGroup>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddCategory}>
              Add Category
            </Button>
            <Button variant="ghost" onClick={onAddClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteOpen} onClose={onDeleteClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>
              Are you sure you want to delete the "{categoryToDelete}" category? 
              This action cannot be undone.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleDeleteCategory}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onDeleteClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SetBudget;