import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Delete Item',
  message = 'Are you sure you want to delete this item?',
  itemName = '',
  confirmText = 'Delete',
  cancelText = 'Cancel',
  colorScheme = 'red',
  isLoading = false
}) => {
  const cancelRef = React.useRef();
  const bg = useColorModeValue('white', 'gray.800');

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isCentered
    >
      <AlertDialogOverlay>
        <AlertDialogContent bg={bg} mx={4}>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>
            <Text mb={2}>
              {message}
            </Text>
            {itemName && (
              <Text fontWeight="semibold" color="gray.600">
                "{itemName}"
              </Text>
            )}
            <Text mt={3} fontSize="sm" color="gray.500">
              This action cannot be undone.
            </Text>
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button 
              ref={cancelRef} 
              onClick={onClose}
              mr={3}
              variant="ghost"
              isDisabled={isLoading}
            >
              {cancelText}
            </Button>
            <Button 
              colorScheme={colorScheme} 
              onClick={handleConfirm}
              isLoading={isLoading}
              loadingText="Deleting..."
            >
              {confirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteConfirmation;  // Add this line!