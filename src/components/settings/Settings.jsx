// // src/components/settings/Settings.jsx
// import React, { useState } from 'react';
// import {
//   Box,
//   VStack,
//   HStack,
//   Text,
//   Switch,
//   Button,
//   Input,
//   FormLabel,
//   FormControl,
//   Select,
//   Divider,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
//   useColorModeValue,
//   useToast,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Heading,
//   SimpleGrid,
//   Card,
//   CardBody,
//   Badge
// } from '@chakra-ui/react';
// import { MdSettings, MdDelete, MdDownload, MdUpload, MdRefresh } from 'react-icons/md';

// const Settings = () => {
//   const toast = useToast();
//   const { isOpen: isResetOpen, onOpen: onResetOpen, onClose: onResetClose } = useDisclosure();
//   const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
  
//   // Theme and styling
//   const bgColor = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const textColor = useColorModeValue('gray.800', 'white');
//   const secondaryText = useColorModeValue('gray.600', 'gray.300');
//   const cardBg = useColorModeValue('gray.50', 'gray.700');
  
//   // Local state for settings
//   const [settings, setSettings] = useState({
//     currency: 'INR',
//     dateFormat: 'DD/MM/YYYY',
//     notifications: true,
//     autoBackup: false,
//     budgetAlerts: true,
//     monthlyReset: false,
//     exportFormat: 'JSON',
//     darkMode: false
//   });

//   const [tempSettings, setTempSettings] = useState(settings);

//   const handleSettingChange = (key, value) => {
//     setTempSettings(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   const saveSettings = () => {
//     setSettings(tempSettings);
//     // Here you would save to Firebase
//     // Example: await updateUserSettings(tempSettings);
//     toast({
//       title: "Settings saved",
//       description: "Your preferences have been updated successfully.",
//       status: "success",
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   const resetSettings = () => {
//     const defaultSettings = {
//       currency: 'INR',
//       dateFormat: 'DD/MM/YYYY',
//       notifications: true,
//       autoBackup: false,
//       budgetAlerts: true,
//       monthlyReset: false,
//       exportFormat: 'JSON',
//       darkMode: false
//     };
//     setTempSettings(defaultSettings);
//     toast({
//       title: "Settings reset",
//       description: "All settings have been reset to default values.",
//       status: "info",
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   const handleResetAllData = async () => {
//     try {
//       // Here you would call your reset functions
//       // await resetBudget();
//       // await clearAllExpenses();
//       localStorage.clear(); // Clear local storage as fallback
//       onResetClose();
//       toast({
//         title: "Data reset successful",
//         description: "All your budget and expense data has been cleared.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (error) {
//       toast({
//         title: "Reset failed",
//         description: "There was an error resetting your data. Please try again.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleExportData = () => {
//     try {
//       const data = {
//         settings,
//         exportDate: new Date().toISOString(),
//         version: "1.0"
//       };
      
//       const dataStr = JSON.stringify(data, null, 2);
//       const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
//       const exportFileDefaultName = `fintrack-backup-${new Date().toISOString().split('T')[0]}.json`;
      
//       const linkElement = document.createElement('a');
//       linkElement.setAttribute('href', dataUri);
//       linkElement.setAttribute('download', exportFileDefaultName);
//       linkElement.click();
      
//       onExportClose();
//       toast({
//         title: "Export successful",
//         description: "Your data has been exported successfully.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (error) {
//       toast({
//         title: "Export failed",
//         description: "There was an error exporting your data.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleImportData = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const importedData = JSON.parse(e.target.result);
//           if (importedData.settings) {
//             setTempSettings(importedData.settings);
//             toast({
//               title: "Import successful",
//               description: "Your settings have been imported successfully.",
//               status: "success",
//               duration: 3000,
//               isClosable: true,
//             });
//           }
//         } catch (error) {
//           toast({
//             title: "Import failed",
//             description: "Invalid file format. Please select a valid backup file.",
//             status: "error",
//             duration: 3000,
//             isClosable: true,
//           });
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   return (
//     <Box maxW="6xl" mx="auto">
//       {/* Header */}
//       <HStack mb={8} spacing={3}>
//         <MdSettings size={32} color="#4299E1" />
//         <Heading size="lg" color={textColor}>
//           Settings
//         </Heading>
//         <Badge colorScheme="blue" ml={2}>Beta</Badge>
//       </HStack>

//       <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
//         {/* General Settings */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <Heading size="md" color={textColor} mb={2}>
//                 General Settings
//               </Heading>
              
//               <FormControl>
//                 <FormLabel color={secondaryText} fontSize="sm" fontWeight="medium">
//                   Currency
//                 </FormLabel>
//                 <Select
//                   value={tempSettings.currency}
//                   onChange={(e) => handleSettingChange('currency', e.target.value)}
//                   bg={bgColor}
//                   borderColor={borderColor}
//                 >
//                   <option value="INR">Indian Rupee (₹)</option>
//                   <option value="USD">US Dollar ($)</option>
//                   <option value="EUR">Euro (€)</option>
//                   <option value="GBP">British Pound (£)</option>
//                 </Select>
//               </FormControl>

//               <FormControl>
//                 <FormLabel color={secondaryText} fontSize="sm" fontWeight="medium">
//                   Date Format
//                 </FormLabel>
//                 <Select
//                   value={tempSettings.dateFormat}
//                   onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
//                   bg={bgColor}
//                   borderColor={borderColor}
//                 >
//                   <option value="DD/MM/YYYY">DD/MM/YYYY</option>
//                   <option value="MM/DD/YYYY">MM/DD/YYYY</option>
//                   <option value="YYYY-MM-DD">YYYY-MM-DD</option>
//                 </Select>
//               </FormControl>

//               <FormControl>
//                 <FormLabel color={secondaryText} fontSize="sm" fontWeight="medium">
//                   Export Format
//                 </FormLabel>
//                 <Select
//                   value={tempSettings.exportFormat}
//                   onChange={(e) => handleSettingChange('exportFormat', e.target.value)}
//                   bg={bgColor}
//                   borderColor={borderColor}
//                 >
//                   <option value="JSON">JSON Format</option>
//                   <option value="CSV">CSV Format</option>
//                 </Select>
//               </FormControl>
//             </VStack>
//           </CardBody>
//         </Card>

//         {/* Notification Settings */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <Heading size="md" color={textColor} mb={2}>
//                 Notifications & Alerts
//               </Heading>
              
//               <HStack justify="space-between">
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Enable Notifications
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Receive notifications for budget updates
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempSettings.notifications}
//                   onChange={(e) => handleSettingChange('notifications', e.target.checked)}
//                   colorScheme="blue"
//                 />
//               </HStack>

//               <HStack justify="space-between">
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Budget Alerts
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Alert when approaching budget limits
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempSettings.budgetAlerts}
//                   onChange={(e) => handleSettingChange('budgetAlerts', e.target.checked)}
//                   colorScheme="blue"
//                 />
//               </HStack>

//               <HStack justify="space-between">
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Monthly Reset
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Automatically reset budget each month
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempSettings.monthlyReset}
//                   onChange={(e) => handleSettingChange('monthlyReset', e.target.checked)}
//                   colorScheme="blue"
//                 />
//               </HStack>

//               <HStack justify="space-between">
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Auto Backup
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Automatically backup data to cloud
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempSettings.autoBackup}
//                   onChange={(e) => handleSettingChange('autoBackup', e.target.checked)}
//                   colorScheme="blue"
//                 />
//               </HStack>
//             </VStack>
//           </CardBody>
//         </Card>

//         {/* Data Management */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <Heading size="md" color={textColor} mb={2}>
//                 Data Management
//               </Heading>
              
//               <VStack spacing={4} align="stretch">
//                 <Button
//                   leftIcon={<MdDownload />}
//                   colorScheme="green"
//                   variant="outline"
//                   onClick={onExportOpen}
//                   size="sm"
//                 >
//                   Export Data
//                 </Button>
                
//                 <Button
//                   as="label"
//                   leftIcon={<MdUpload />}
//                   colorScheme="blue"
//                   variant="outline"
//                   cursor="pointer"
//                   size="sm"
//                 >
//                   Import Data
//                   <Input
//                     type="file"
//                     accept=".json"
//                     onChange={handleImportData}
//                     display="none"
//                   />
//                 </Button>

//                 <Divider />

//                 <Button
//                   leftIcon={<MdDelete />}
//                   colorScheme="red"
//                   variant="outline"
//                   onClick={onResetOpen}
//                   size="sm"
//                 >
//                   Reset All Data
//                 </Button>
//               </VStack>
//             </VStack>
//           </CardBody>
//         </Card>

//         {/* App Information */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <Heading size="md" color={textColor} mb={2}>
//                 App Information
//               </Heading>
              
//               <VStack spacing={3} align="start">
//                 <HStack justify="space-between" w="full">
//                   <Text fontSize="sm" color={secondaryText}>Version:</Text>
//                   <Badge colorScheme="blue">1.0.0</Badge>
//                 </HStack>
                
//                 <HStack justify="space-between" w="full">
//                   <Text fontSize="sm" color={secondaryText}>Last Backup:</Text>
//                   <Text fontSize="sm" color={textColor}>Never</Text>
//                 </HStack>
                
//                 <HStack justify="space-between" w="full">
//                   <Text fontSize="sm" color={secondaryText}>Storage Used:</Text>
//                   <Text fontSize="sm" color={textColor}>~2.5 MB</Text>
//                 </HStack>
//               </VStack>

//               <Divider />

//               <Text fontSize="xs" color={secondaryText} textAlign="center">
//                 FinTrack helps you manage your finances efficiently. 
//                 For support, contact us at support@fintrack.com
//               </Text>
//             </VStack>
//           </CardBody>
//         </Card>
//       </SimpleGrid>

//       {/* Action Buttons */}
//       <HStack spacing={4} justify="center" mt={8}>
//         <Button variant="outline" onClick={resetSettings} leftIcon={<MdRefresh />}>
//           Reset to Defaults
//         </Button>
//         <Button colorScheme="blue" onClick={saveSettings} size="lg">
//           Save Settings
//         </Button>
//       </HStack>

//       {/* Reset Confirmation Modal */}
//       <Modal isOpen={isResetOpen} onClose={onResetClose} isCentered>
//         <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
//         <ModalContent>
//           <ModalHeader>Reset All Data</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Alert status="warning" mb={4} borderRadius="md">
//               <AlertIcon />
//               <Box>
//                 <AlertTitle fontSize="sm">Warning!</AlertTitle>
//                 <AlertDescription fontSize="sm">
//                   This action will permanently delete all your budget data, expenses, and settings. 
//                   This cannot be undone.
//                 </AlertDescription>
//               </Box>
//             </Alert>
//             <Text fontSize="sm" color={secondaryText}>
//               Are you sure you want to proceed with this action?
//             </Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button variant="ghost" mr={3} onClick={onResetClose} size="sm">
//               Cancel
//             </Button>
//             <Button colorScheme="red" onClick={handleResetAllData} size="sm">
//               Reset All Data
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       {/* Export Confirmation Modal */}
//       <Modal isOpen={isExportOpen} onClose={onExportClose} isCentered>
//         <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
//         <ModalContent>
//           <ModalHeader>Export Data</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text mb={4} fontSize="sm" color={secondaryText}>
//               This will download a backup file containing all your budget data, expenses, and settings.
//             </Text>
//             <Alert status="info" borderRadius="md">
//               <AlertIcon />
//               <Box>
//                 <AlertTitle fontSize="sm">Export Format</AlertTitle>
//                 <AlertDescription fontSize="sm">
//                   Data will be exported in {tempSettings.exportFormat} format.
//                 </AlertDescription>
//               </Box>
//             </Alert>
//           </ModalBody>
//           <ModalFooter>
//             <Button variant="ghost" mr={3} onClick={onExportClose} size="sm">
//               Cancel
//             </Button>
//             <Button colorScheme="green" onClick={handleExportData} size="sm">
//               Export
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default Settings;


// src/components/settings/Settings.jsx
// import React, { useState, useContext, useEffect } from 'react';
// import {
//   Box,
//   VStack,
//   HStack,
//   Text,
//   Switch,
//   Button,
//   Input,
//   FormLabel,
//   FormControl,
//   Select,
//   Divider,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
//   useColorModeValue,
//   useToast,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
//   Heading,
//   SimpleGrid,
//   Card,
//   CardBody,
//   Badge,
//   Slider,
//   SliderTrack,
//   SliderFilledTrack,
//   SliderThumb,
//   NumberInput,
//   NumberInputField,
//   NumberInputStepper,
//   NumberIncrementStepper,
//   NumberDecrementStepper
// } from '@chakra-ui/react';
// import { MdSettings, MdDelete, MdDownload, MdUpload, MdRefresh, MdNotifications } from 'react-icons/md';


// import { useNotifications } from "../../context/NotificationContext";


// const Settings = () => {
//   const toast = useToast();
//   const { settings: notificationSettings, updateSettings: updateNotificationSettings } = useContext(NotificationContext);
//   const { isOpen: isResetOpen, onOpen: onResetOpen, onClose: onResetClose } = useDisclosure();
//   const { isOpen: isExportOpen, onOpen: onExportOpen, onClose: onExportClose } = useDisclosure();
  
//   // Theme and styling
//   const bgColor = useColorModeValue('white', 'gray.800');
//   const borderColor = useColorModeValue('gray.200', 'gray.600');
//   const textColor = useColorModeValue('gray.800', 'white');
//   const secondaryText = useColorModeValue('gray.600', 'gray.300');
//   const cardBg = useColorModeValue('gray.50', 'gray.700');
  
//   // Local state for settings
//   const [settings, setSettings] = useState({
//     currency: 'INR',
//     dateFormat: 'DD/MM/YYYY',
//     notifications: true,
//     autoBackup: false,
//     budgetAlerts: true,
//     monthlyReset: false,
//     exportFormat: 'JSON',
//     darkMode: false
//   });

//   const [tempSettings, setTempSettings] = useState(settings);
//   const [tempNotificationSettings, setTempNotificationSettings] = useState(notificationSettings);

//   // Load notification settings when component mounts
//   useEffect(() => {
//     setTempNotificationSettings(notificationSettings);
//   }, [notificationSettings]);

//   const handleSettingChange = (key, value) => {
//     setTempSettings(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   const handleNotificationSettingChange = (key, value) => {
//     setTempNotificationSettings(prev => ({
//       ...prev,
//       [key]: value
//     }));
//   };

//   const saveSettings = async () => {
//     try {
//       setSettings(tempSettings);
      
//       // Update notification settings in context
//       await updateNotificationSettings(tempNotificationSettings);
      
//       // Here you would save to Firebase
//       // Example: await updateUserSettings({ ...tempSettings, notifications: tempNotificationSettings });
      
//       toast({
//         title: "Settings saved",
//         description: "Your preferences have been updated successfully.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (error) {
//       toast({
//         title: "Save failed",
//         description: "There was an error saving your settings. Please try again.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const resetSettings = () => {
//     const defaultSettings = {
//       currency: 'INR',
//       dateFormat: 'DD/MM/YYYY',
//       notifications: true,
//       autoBackup: false,
//       budgetAlerts: true,
//       monthlyReset: false,
//       exportFormat: 'JSON',
//       darkMode: false
//     };
    
//     const defaultNotificationSettings = {
//       enabled: true,
//       budgetAlert: {
//         enabled: true,
//         threshold: 80,
//         frequency: 'once'
//       },
//       dailyReminder: {
//         enabled: false,
//         time: '18:00'
//       },
//       weeklyReport: {
//         enabled: false,
//         day: 'sunday',
//         time: '09:00'
//       },
//       monthlyReport: {
//         enabled: false,
//         day: 1,
//         time: '09:00'
//       },
//       sound: true,
//       desktop: true,
//       email: false
//     };
    
//     setTempSettings(defaultSettings);
//     setTempNotificationSettings(defaultNotificationSettings);
    
//     toast({
//       title: "Settings reset",
//       description: "All settings have been reset to default values.",
//       status: "info",
//       duration: 3000,
//       isClosable: true,
//     });
//   };

//   const handleResetAllData = async () => {
//     try {
//       // Here you would call your reset functions
//       // await resetBudget();
//       // await clearAllExpenses();
//       // Reset notification settings to default
//       const defaultNotificationSettings = {
//         enabled: true,
//         budgetAlert: { enabled: true, threshold: 80, frequency: 'once' },
//         dailyReminder: { enabled: false, time: '18:00' },
//         weeklyReport: { enabled: false, day: 'sunday', time: '09:00' },
//         monthlyReport: { enabled: false, day: 1, time: '09:00' },
//         sound: true,
//         desktop: true,
//         email: false
//       };
      
//       await updateNotificationSettings(defaultNotificationSettings);
//       localStorage.clear(); // Clear local storage as fallback
//       onResetClose();
      
//       toast({
//         title: "Data reset successful",
//         description: "All your budget and expense data has been cleared.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (error) {
//       toast({
//         title: "Reset failed",
//         description: "There was an error resetting your data. Please try again.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleExportData = () => {
//     try {
//       const data = {
//         settings,
//         notificationSettings: tempNotificationSettings,
//         exportDate: new Date().toISOString(),
//         version: "1.0"
//       };
      
//       const dataStr = JSON.stringify(data, null, 2);
//       const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
//       const exportFileDefaultName = `fintrack-backup-${new Date().toISOString().split('T')[0]}.json`;
      
//       const linkElement = document.createElement('a');
//       linkElement.setAttribute('href', dataUri);
//       linkElement.setAttribute('download', exportFileDefaultName);
//       linkElement.click();
      
//       onExportClose();
//       toast({
//         title: "Export successful",
//         description: "Your data has been exported successfully.",
//         status: "success",
//         duration: 3000,
//         isClosable: true,
//       });
//     } catch (error) {
//       toast({
//         title: "Export failed",
//         description: "There was an error exporting your data.",
//         status: "error",
//         duration: 3000,
//         isClosable: true,
//       });
//     }
//   };

//   const handleImportData = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = async (e) => {
//         try {
//           const importedData = JSON.parse(e.target.result);
//           if (importedData.settings) {
//             setTempSettings(importedData.settings);
//           }
//           if (importedData.notificationSettings) {
//             setTempNotificationSettings(importedData.notificationSettings);
//           }
          
//           toast({
//             title: "Import successful",
//             description: "Your settings have been imported successfully.",
//             status: "success",
//             duration: 3000,
//             isClosable: true,
//           });
//         } catch (error) {
//           toast({
//             title: "Import failed",
//             description: "Invalid file format. Please select a valid backup file.",
//             status: "error",
//             duration: 3000,
//             isClosable: true,
//           });
//         }
//       };
//       reader.readAsText(file);
//     }
//   };

//   return (
//     <Box maxW="6xl" mx="auto">
//       {/* Header */}
//       <HStack mb={8} spacing={3}>
//         <MdSettings size={32} color="#4299E1" />
//         <Heading size="lg" color={textColor}>
//           Settings
//         </Heading>
//         <Badge colorScheme="blue" ml={2}>Beta</Badge>
//       </HStack>

//       <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={6}>
//         {/* General Settings */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <Heading size="md" color={textColor} mb={2}>
//                 General Settings
//               </Heading>
              
//               <FormControl>
//                 <FormLabel color={secondaryText} fontSize="sm" fontWeight="medium">
//                   Currency
//                 </FormLabel>
//                 <Select
//                   value={tempSettings.currency}
//                   onChange={(e) => handleSettingChange('currency', e.target.value)}
//                   bg={bgColor}
//                   borderColor={borderColor}
//                 >
//                   <option value="INR">Indian Rupee (₹)</option>
//                   <option value="USD">US Dollar ($)</option>
//                   <option value="EUR">Euro (€)</option>
//                   <option value="GBP">British Pound (£)</option>
//                 </Select>
//               </FormControl>

//               <FormControl>
//                 <FormLabel color={secondaryText} fontSize="sm" fontWeight="medium">
//                   Date Format
//                 </FormLabel>
//                 <Select
//                   value={tempSettings.dateFormat}
//                   onChange={(e) => handleSettingChange('dateFormat', e.target.value)}
//                   bg={bgColor}
//                   borderColor={borderColor}
//                 >
//                   <option value="DD/MM/YYYY">DD/MM/YYYY</option>
//                   <option value="MM/DD/YYYY">MM/DD/YYYY</option>
//                   <option value="YYYY-MM-DD">YYYY-MM-DD</option>
//                 </Select>
//               </FormControl>

//               <FormControl>
//                 <FormLabel color={secondaryText} fontSize="sm" fontWeight="medium">
//                   Export Format
//                 </FormLabel>
//                 <Select
//                   value={tempSettings.exportFormat}
//                   onChange={(e) => handleSettingChange('exportFormat', e.target.value)}
//                   bg={bgColor}
//                   borderColor={borderColor}
//                 >
//                   <option value="JSON">JSON Format</option>
//                   <option value="CSV">CSV Format</option>
//                 </Select>
//               </FormControl>
//             </VStack>
//           </CardBody>
//         </Card>

//         {/* Notification Settings */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <HStack mb={2}>
//                 <MdNotifications size={20} color="#4299E1" />
//                 <Heading size="md" color={textColor}>
//                   Notification Settings
//                 </Heading>
//               </HStack>
              
//               {/* Master Notification Toggle */}
//               <HStack justify="space-between">
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Enable All Notifications
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Master switch for all notifications
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempNotificationSettings.enabled}
//                   onChange={(e) => handleNotificationSettingChange('enabled', e.target.checked)}
//                   colorScheme="blue"
//                   size="lg"
//                 />
//               </HStack>

//               <Divider />

//               {/* Budget Alert Settings */}
//               <VStack spacing={4} align="stretch" opacity={tempNotificationSettings.enabled ? 1 : 0.5}>
//                 <HStack justify="space-between">
//                   <VStack align="start" spacing={1}>
//                     <Text color={textColor} fontSize="sm" fontWeight="medium">
//                       Budget Alerts
//                     </Text>
//                     <Text fontSize="xs" color={secondaryText}>
//                       Alert when approaching budget limits
//                     </Text>
//                   </VStack>
//                   <Switch
//                     isChecked={tempNotificationSettings.budgetAlert?.enabled}
//                     onChange={(e) => handleNotificationSettingChange('budgetAlert', {
//                       ...tempNotificationSettings.budgetAlert,
//                       enabled: e.target.checked
//                     })}
//                     colorScheme="blue"
//                     isDisabled={!tempNotificationSettings.enabled}
//                   />
//                 </HStack>

//                 {tempNotificationSettings.budgetAlert?.enabled && (
//                   <Box pl={4}>
//                     <FormControl>
//                       <FormLabel fontSize="xs" color={secondaryText}>
//                         Alert Threshold: {tempNotificationSettings.budgetAlert?.threshold}%
//                       </FormLabel>
//                       <Slider
//                         value={tempNotificationSettings.budgetAlert?.threshold}
//                         onChange={(value) => handleNotificationSettingChange('budgetAlert', {
//                           ...tempNotificationSettings.budgetAlert,
//                           threshold: value
//                         })}
//                         min={50}
//                         max={100}
//                         step={5}
//                         colorScheme="blue"
//                       >
//                         <SliderTrack>
//                           <SliderFilledTrack />
//                         </SliderTrack>
//                         <SliderThumb />
//                       </Slider>
//                     </FormControl>
//                   </Box>
//                 )}
//               </VStack>

//               {/* Daily Reminder */}
//               <HStack justify="space-between" opacity={tempNotificationSettings.enabled ? 1 : 0.5}>
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Daily Reminder
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Daily expense tracking reminder
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempNotificationSettings.dailyReminder?.enabled}
//                   onChange={(e) => handleNotificationSettingChange('dailyReminder', {
//                     ...tempNotificationSettings.dailyReminder,
//                     enabled: e.target.checked
//                   })}
//                   colorScheme="blue"
//                   isDisabled={!tempNotificationSettings.enabled}
//                 />
//               </HStack>

//               {/* Weekly Report */}
//               <HStack justify="space-between" opacity={tempNotificationSettings.enabled ? 1 : 0.5}>
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Weekly Report
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Weekly spending summary
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempNotificationSettings.weeklyReport?.enabled}
//                   onChange={(e) => handleNotificationSettingChange('weeklyReport', {
//                     ...tempNotificationSettings.weeklyReport,
//                     enabled: e.target.checked
//                   })}
//                   colorScheme="blue"
//                   isDisabled={!tempNotificationSettings.enabled}
//                 />
//               </HStack>
//             </VStack>
//           </CardBody>
//         </Card>

//         {/* Notification Types */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <Heading size="md" color={textColor} mb={2}>
//                 Notification Types
//               </Heading>
              
//               <HStack justify="space-between" opacity={tempNotificationSettings.enabled ? 1 : 0.5}>
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Sound Notifications
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Play sound with notifications
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempNotificationSettings.sound}
//                   onChange={(e) => handleNotificationSettingChange('sound', e.target.checked)}
//                   colorScheme="blue"
//                   isDisabled={!tempNotificationSettings.enabled}
//                 />
//               </HStack>

//               <HStack justify="space-between" opacity={tempNotificationSettings.enabled ? 1 : 0.5}>
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Desktop Notifications
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Show browser notifications
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempNotificationSettings.desktop}
//                   onChange={(e) => handleNotificationSettingChange('desktop', e.target.checked)}
//                   colorScheme="blue"
//                   isDisabled={!tempNotificationSettings.enabled}
//                 />
//               </HStack>

//               <HStack justify="space-between" opacity={tempNotificationSettings.enabled ? 1 : 0.5}>
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Email Notifications
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Send notifications via email
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempNotificationSettings.email}
//                   onChange={(e) => handleNotificationSettingChange('email', e.target.checked)}
//                   colorScheme="blue"
//                   isDisabled={!tempNotificationSettings.enabled}
//                 />
//               </HStack>

//               {tempNotificationSettings.desktop && (
//                 <Alert status="info" size="sm" borderRadius="md">
//                   <AlertIcon />
//                   <Box>
//                     <Text fontSize="xs">
//                       Browser notifications require permission. Click "Allow" when prompted.
//                     </Text>
//                   </Box>
//                 </Alert>
//               )}
//             </VStack>
//           </CardBody>
//         </Card>

//         {/* Data Management */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <Heading size="md" color={textColor} mb={2}>
//                 Data Management
//               </Heading>
              
//               <VStack spacing={4} align="stretch">
//                 <Button
//                   leftIcon={<MdDownload />}
//                   colorScheme="green"
//                   variant="outline"
//                   onClick={onExportOpen}
//                   size="sm"
//                 >
//                   Export Data
//                 </Button>
                
//                 <Button
//                   as="label"
//                   leftIcon={<MdUpload />}
//                   colorScheme="blue"
//                   variant="outline"
//                   cursor="pointer"
//                   size="sm"
//                 >
//                   Import Data
//                   <Input
//                     type="file"
//                     accept=".json"
//                     onChange={handleImportData}
//                     display="none"
//                   />
//                 </Button>

//                 <Divider />

//                 <Button
//                   leftIcon={<MdDelete />}
//                   colorScheme="red"
//                   variant="outline"
//                   onClick={onResetOpen}
//                   size="sm"
//                 >
//                   Reset All Data
//                 </Button>
//               </VStack>

//               <Alert status="warning" size="sm" borderRadius="md">
//                 <AlertIcon />
//                 <Box>
//                   <Text fontSize="xs">
//                     Export includes all settings and notification preferences
//                   </Text>
//                 </Box>
//               </Alert>
//             </VStack>
//           </CardBody>
//         </Card>

//         {/* App Information */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <Heading size="md" color={textColor} mb={2}>
//                 App Information
//               </Heading>
              
//               <VStack spacing={3} align="start">
//                 <HStack justify="space-between" w="full">
//                   <Text fontSize="sm" color={secondaryText}>Version:</Text>
//                   <Badge colorScheme="blue">1.0.0</Badge>
//                 </HStack>
                
//                 <HStack justify="space-between" w="full">
//                   <Text fontSize="sm" color={secondaryText}>Last Backup:</Text>
//                   <Text fontSize="sm" color={textColor}>Never</Text>
//                 </HStack>
                
//                 <HStack justify="space-between" w="full">
//                   <Text fontSize="sm" color={secondaryText}>Storage Used:</Text>
//                   <Text fontSize="sm" color={textColor}>~2.5 MB</Text>
//                 </HStack>

//                 <HStack justify="space-between" w="full">
//                   <Text fontSize="sm" color={secondaryText}>Notifications:</Text>
//                   <Badge colorScheme={tempNotificationSettings.enabled ? "green" : "gray"}>
//                     {tempNotificationSettings.enabled ? "Enabled" : "Disabled"}
//                   </Badge>
//                 </HStack>
//               </VStack>

//               <Divider />

//               <Text fontSize="xs" color={secondaryText} textAlign="center">
//                 FinTrack helps you manage your finances efficiently. 
//                 For support, contact us at support@fintrack.com
//               </Text>
//             </VStack>
//           </CardBody>
//         </Card>
//       </SimpleGrid>

//       {/* Action Buttons */}
//       <HStack spacing={4} justify="center" mt={8}>
//         <Button variant="outline" onClick={resetSettings} leftIcon={<MdRefresh />}>
//           Reset to Defaults
//         </Button>
//         <Button colorScheme="blue" onClick={saveSettings} size="lg">
//           Save Settings
//         </Button>
//       </HStack>

//       {/* Reset Confirmation Modal */}
//       <Modal isOpen={isResetOpen} onClose={onResetClose} isCentered>
//         <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
//         <ModalContent>
//           <ModalHeader>Reset All Data</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Alert status="warning" mb={4} borderRadius="md">
//               <AlertIcon />
//               <Box>
//                 <AlertTitle fontSize="sm">Warning!</AlertTitle>
//                 <AlertDescription fontSize="sm">
//                   This action will permanently delete all your budget data, expenses, settings, and notification preferences. 
//                   This cannot be undone.
//                 </AlertDescription>
//               </Box>
//             </Alert>
//             <Text fontSize="sm" color={secondaryText}>
//               Are you sure you want to proceed with this action?
//             </Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button variant="ghost" mr={3} onClick={onResetClose} size="sm">
//               Cancel
//             </Button>
//             <Button colorScheme="red" onClick={handleResetAllData} size="sm">
//               Reset All Data
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       {/* Export Confirmation Modal */}
//       <Modal isOpen={isExportOpen} onClose={onExportClose} isCentered>
//         <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
//         <ModalContent>
//           <ModalHeader>Export Data</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text mb={4} fontSize="sm" color={secondaryText}>
//               This will download a backup file containing all your budget data, expenses, settings, and notification preferences.
//             </Text>
//             <Alert status="info" borderRadius="md">
//               <AlertIcon />
//               <Box>
//                 <AlertTitle fontSize="sm">Export Format</AlertTitle>
//                 <AlertDescription fontSize="sm">
//                   Data will be exported in {tempSettings.exportFormat} format including notification settings.
//                 </AlertDescription>
//               </Box>
//             </Alert>
//           </ModalBody>
//           <ModalFooter>
//             <Button variant="ghost" mr={3} onClick={onExportClose} size="sm">
//               Cancel
//             </Button>
//             <Button colorScheme="green" onClick={handleExportData} size="sm">
//               Export
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default Settings;

// import React, { useState } from "react";
// import {
//   Box,
//   VStack,
//   HStack,
//   SimpleGrid,
//   Card,
//   CardBody,
//   Heading,
//   Text,
//   Switch,
//   Button,
//   Input,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   ModalCloseButton,
//   Alert,
//   AlertIcon,
//   AlertTitle,
//   AlertDescription,
//   Badge,
//   Divider,
//   useDisclosure,
// } from "@chakra-ui/react";

// import { MdDownload, MdUpload, MdDelete, MdRefresh } from "react-icons/md";

// const Settings = () => {
//   // Modal open/close controls
//   const {
//     isOpen: isResetOpen,
//     onOpen: onResetOpen,
//     onClose: onResetClose,
//   } = useDisclosure();

//   const {
//     isOpen: isExportOpen,
//     onOpen: onExportOpen,
//     onClose: onExportClose,
//   } = useDisclosure();

//   // Notification settings state
//   const [tempNotificationSettings, setTempNotificationSettings] = useState({
//     enabled: true,
//     sound: true,
//     desktop: false,
//     email: false,
//   });

//   // Other settings state
//   const [tempSettings, setTempSettings] = useState({
//     exportFormat: "JSON",
//   });

//   // UI colors (can customize or use useColorModeValue)
//   const cardBg = "white";
//   const textColor = "black";
//   const secondaryText = "gray.500";

//   // Handler to update notification settings toggles
//   const handleNotificationSettingChange = (key, value) => {
//     setTempNotificationSettings((prev) => ({ ...prev, [key]: value }));
//   };

//   // File import handler (stub)
//   const handleImportData = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Implement your import logic here
//       console.log("Import file selected:", file.name);
//     }
//   };

//   // Export data handler (stub)
//   const handleExportData = () => {
//     // Implement export logic here
//     console.log("Exporting data in format:", tempSettings.exportFormat);
//     onExportClose();
//   };

//   // Reset all data handler (stub)
//   const handleResetAllData = () => {
//     // Implement reset logic here
//     console.log("Resetting all data");
//     onResetClose();

//     // Reset notification settings & others to defaults if needed
//     setTempNotificationSettings({
//       enabled: true,
//       sound: true,
//       desktop: false,
//       email: false,
//     });

//     setTempSettings({ exportFormat: "JSON" });
//   };

//   // Reset settings button handler
//   const resetSettings = () => {
//     setTempNotificationSettings({
//       enabled: true,
//       sound: true,
//       desktop: false,
//       email: false,
//     });
//     setTempSettings({ exportFormat: "JSON" });
//   };

//   // Save settings button handler (stub)
//   const saveSettings = () => {
//     // Implement save to backend or localStorage
//     console.log("Settings saved:", { tempNotificationSettings, tempSettings });
//   };

//   return (
//     <Box p={6}>
//       <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
//         {/* Notification Types */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <Heading size="md" color={textColor} mb={2}>
//                 Notification Types
//               </Heading>

//               <HStack
//                 justify="space-between"
//                 opacity={tempNotificationSettings.enabled ? 1 : 0.5}
//               >
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Sound Notifications
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Play sound with notifications
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempNotificationSettings.sound}
//                   onChange={(e) =>
//                     handleNotificationSettingChange("sound", e.target.checked)
//                   }
//                   colorScheme="blue"
//                   isDisabled={!tempNotificationSettings.enabled}
//                 />
//               </HStack>

//               <HStack
//                 justify="space-between"
//                 opacity={tempNotificationSettings.enabled ? 1 : 0.5}
//               >
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Desktop Notifications
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Show browser notifications
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempNotificationSettings.desktop}
//                   onChange={(e) =>
//                     handleNotificationSettingChange("desktop", e.target.checked)
//                   }
//                   colorScheme="blue"
//                   isDisabled={!tempNotificationSettings.enabled}
//                 />
//               </HStack>

//               <HStack
//                 justify="space-between"
//                 opacity={tempNotificationSettings.enabled ? 1 : 0.5}
//               >
//                 <VStack align="start" spacing={1}>
//                   <Text color={textColor} fontSize="sm" fontWeight="medium">
//                     Email Notifications
//                   </Text>
//                   <Text fontSize="xs" color={secondaryText}>
//                     Send notifications via email
//                   </Text>
//                 </VStack>
//                 <Switch
//                   isChecked={tempNotificationSettings.email}
//                   onChange={(e) =>
//                     handleNotificationSettingChange("email", e.target.checked)
//                   }
//                   colorScheme="blue"
//                   isDisabled={!tempNotificationSettings.enabled}
//                 />
//               </HStack>

//               {tempNotificationSettings.desktop && (
//                 <Alert status="info" size="sm" borderRadius="md">
//                   <AlertIcon />
//                   <Box>
//                     <Text fontSize="xs">
//                       Browser notifications require permission. Click "Allow"
//                       when prompted.
//                     </Text>
//                   </Box>
//                 </Alert>
//               )}
//             </VStack>
//           </CardBody>
//         </Card>

//         {/* Data Management */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <Heading size="md" color={textColor} mb={2}>
//                 Data Management
//               </Heading>

//               <VStack spacing={4} align="stretch">
//                 <Button
//                   leftIcon={<MdDownload />}
//                   colorScheme="green"
//                   variant="outline"
//                   onClick={onExportOpen}
//                   size="sm"
//                 >
//                   Export Data
//                 </Button>

//                 <Button
//                   as="label"
//                   leftIcon={<MdUpload />}
//                   colorScheme="blue"
//                   variant="outline"
//                   cursor="pointer"
//                   size="sm"
//                 >
//                   Import Data
//                   <Input
//                     type="file"
//                     accept=".json"
//                     onChange={handleImportData}
//                     display="none"
//                   />
//                 </Button>

//                 <Divider />

//                 <Button
//                   leftIcon={<MdDelete />}
//                   colorScheme="red"
//                   variant="outline"
//                   onClick={onResetOpen}
//                   size="sm"
//                 >
//                   Reset All Data
//                 </Button>
//               </VStack>

//               <Alert status="warning" size="sm" borderRadius="md">
//                 <AlertIcon />
//                 <Box>
//                   <Text fontSize="xs">
//                     Export includes all settings and notification preferences
//                   </Text>
//                 </Box>
//               </Alert>
//             </VStack>
//           </CardBody>
//         </Card>

//         {/* App Information */}
//         <Card bg={cardBg} shadow="md">
//           <CardBody>
//             <VStack spacing={6} align="stretch">
//               <Heading size="md" color={textColor} mb={2}>
//                 App Information
//               </Heading>

//               <VStack spacing={3} align="start">
//                 <HStack justify="space-between" w="full">
//                   <Text fontSize="sm" color={secondaryText}>
//                     Version:
//                   </Text>
//                   <Badge colorScheme="blue">1.0.0</Badge>
//                 </HStack>

//                 <HStack justify="space-between" w="full">
//                   <Text fontSize="sm" color={secondaryText}>
//                     Last Backup:
//                   </Text>
//                   <Text fontSize="sm" color={textColor}>
//                     Never
//                   </Text>
//                 </HStack>

//                 <HStack justify="space-between" w="full">
//                   <Text fontSize="sm" color={secondaryText}>
//                     Storage Used:
//                   </Text>
//                   <Text fontSize="sm" color={textColor}>
//                     ~2.5 MB
//                   </Text>
//                 </HStack>

//                 <HStack justify="space-between" w="full">
//                   <Text fontSize="sm" color={secondaryText}>
//                     Notifications:
//                   </Text>
//                   <Badge
//                     colorScheme={
//                       tempNotificationSettings.enabled ? "green" : "gray"
//                     }
//                   >
//                     {tempNotificationSettings.enabled ? "Enabled" : "Disabled"}
//                   </Badge>
//                 </HStack>
//               </VStack>

//               <Divider />

//               <Text fontSize="xs" color={secondaryText} textAlign="center">
//                 FinTrack helps you manage your finances efficiently. For
//                 support, contact us at support@fintrack.com
//               </Text>
//             </VStack>
//           </CardBody>
//         </Card>
//       </SimpleGrid>

//       {/* Action Buttons */}
//       <HStack spacing={4} justify="center" mt={8}>
//         <Button
//           variant="outline"
//           onClick={resetSettings}
//           leftIcon={<MdRefresh />}
//         >
//           Reset to Defaults
//         </Button>
//         <Button colorScheme="blue" onClick={saveSettings} size="lg">
//           Save Settings
//         </Button>
//       </HStack>

//       {/* Reset Confirmation Modal */}
//       <Modal isOpen={isResetOpen} onClose={onResetClose} isCentered>
//         <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
//         <ModalContent>
//           <ModalHeader>Reset All Data</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Alert status="warning" mb={4} borderRadius="md">
//               <AlertIcon />
//               <Box>
//                 <AlertTitle fontSize="sm">Warning!</AlertTitle>
//                 <AlertDescription fontSize="sm">
//                   This action will permanently delete all your budget data,
//                   expenses, settings, and notification preferences. This cannot
//                   be undone.
//                 </AlertDescription>
//               </Box>
//             </Alert>
//             <Text fontSize="sm" color={secondaryText}>
//               Are you sure you want to proceed with this action?
//             </Text>
//           </ModalBody>
//           <ModalFooter>
//             <Button variant="ghost" mr={3} onClick={onResetClose} size="sm">
//               Cancel
//             </Button>
//             <Button
//               colorScheme="red"
//               onClick={handleResetAllData}
//               size="sm"
//             >
//               Reset All Data
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>

//       {/* Export Confirmation Modal */}
//       <Modal isOpen={isExportOpen} onClose={onExportClose} isCentered>
//         <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
//         <ModalContent>
//           <ModalHeader>Export Data</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             <Text mb={4} fontSize="sm" color={secondaryText}>
//               This will download a backup file containing all your budget data,
//               expenses, settings, and notification preferences.
//             </Text>
//             <Alert status="info" borderRadius="md">
//               <AlertIcon />
//               <Box>
//                 <AlertTitle fontSize="sm">Export Format</AlertTitle>
//                 <AlertDescription fontSize="sm">
//                   Data will be exported in {tempSettings.exportFormat} format
//                   including notification settings.
//                 </AlertDescription>
//               </Box>
//             </Alert>
//           </ModalBody>
//           <ModalFooter>
//             <Button variant="ghost" mr={3} onClick={onExportClose} size="sm">
//               Cancel
//             </Button>
//             <Button
//               colorScheme="green"
//               onClick={handleExportData}
//               size="sm"
//             >
//               Export
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default Settings;
import React, { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Heading,
  Text,
  Switch,
  Button,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Badge,
  Divider,
  useDisclosure,
  useColorModeValue, // Add this import
} from "@chakra-ui/react";

import { MdDownload, MdUpload, MdDelete, MdRefresh } from "react-icons/md";

const Settings = () => {
  // Modal open/close controls
  const {
    isOpen: isResetOpen,
    onOpen: onResetOpen,
    onClose: onResetClose,
  } = useDisclosure();

  const {
    isOpen: isExportOpen,
    onOpen: onExportOpen,
    onClose: onExportClose,
  } = useDisclosure();

  // Notification settings state
  const [tempNotificationSettings, setTempNotificationSettings] = useState({
    enabled: true,
    sound: true,
    desktop: false,
    email: false,
  });

  // Other settings state
  const [tempSettings, setTempSettings] = useState({
    exportFormat: "JSON",
  });

  // Dynamic colors based on color mode
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("black", "white");
  const secondaryText = useColorModeValue("gray.500", "gray.400");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  // Handler to update notification settings toggles
  const handleNotificationSettingChange = (key, value) => {
    setTempNotificationSettings((prev) => ({ ...prev, [key]: value }));
  };

  // File import handler (stub)
  const handleImportData = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Implement your import logic here
      console.log("Import file selected:", file.name);
    }
  };

  // Export data handler (stub)
  const handleExportData = () => {
    // Implement export logic here
    console.log("Exporting data in format:", tempSettings.exportFormat);
    onExportClose();
  };

  // Reset all data handler (stub)
  const handleResetAllData = () => {
    // Implement reset logic here
    console.log("Resetting all data");
    onResetClose();

    // Reset notification settings & others to defaults if needed
    setTempNotificationSettings({
      enabled: true,
      sound: true,
      desktop: false,
      email: false,
    });

    setTempSettings({ exportFormat: "JSON" });
  };

  // Reset settings button handler
  const resetSettings = () => {
    setTempNotificationSettings({
      enabled: true,
      sound: true,
      desktop: false,
      email: false,
    });
    setTempSettings({ exportFormat: "JSON" });
  };

  // Save settings button handler (stub)
  const saveSettings = () => {
    // Implement save to backend or localStorage
    console.log("Settings saved:", { tempNotificationSettings, tempSettings });
  };

  return (
    <Box p={6}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {/* Notification Types */}
        <Card bg={cardBg} shadow="md" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading size="md" color={textColor} mb={2}>
                Notification Types
              </Heading>

              <HStack
                justify="space-between"
                opacity={tempNotificationSettings.enabled ? 1 : 0.5}
              >
                <VStack align="start" spacing={1}>
                  <Text color={textColor} fontSize="sm" fontWeight="medium">
                    Sound Notifications
                  </Text>
                  <Text fontSize="xs" color={secondaryText}>
                    Play sound with notifications
                  </Text>
                </VStack>
                <Switch
                  isChecked={tempNotificationSettings.sound}
                  onChange={(e) =>
                    handleNotificationSettingChange("sound", e.target.checked)
                  }
                  colorScheme="blue"
                  isDisabled={!tempNotificationSettings.enabled}
                />
              </HStack>

              <HStack
                justify="space-between"
                opacity={tempNotificationSettings.enabled ? 1 : 0.5}
              >
                <VStack align="start" spacing={1}>
                  <Text color={textColor} fontSize="sm" fontWeight="medium">
                    Desktop Notifications
                  </Text>
                  <Text fontSize="xs" color={secondaryText}>
                    Show browser notifications
                  </Text>
                </VStack>
                <Switch
                  isChecked={tempNotificationSettings.desktop}
                  onChange={(e) =>
                    handleNotificationSettingChange("desktop", e.target.checked)
                  }
                  colorScheme="blue"
                  isDisabled={!tempNotificationSettings.enabled}
                />
              </HStack>

              <HStack
                justify="space-between"
                opacity={tempNotificationSettings.enabled ? 1 : 0.5}
              >
                <VStack align="start" spacing={1}>
                  <Text color={textColor} fontSize="sm" fontWeight="medium">
                    Email Notifications
                  </Text>
                  <Text fontSize="xs" color={secondaryText}>
                    Send notifications via email
                  </Text>
                </VStack>
                <Switch
                  isChecked={tempNotificationSettings.email}
                  onChange={(e) =>
                    handleNotificationSettingChange("email", e.target.checked)
                  }
                  colorScheme="blue"
                  isDisabled={!tempNotificationSettings.enabled}
                />
              </HStack>

              {tempNotificationSettings.desktop && (
                <Alert status="info" size="sm" borderRadius="md">
                  <AlertIcon />
                  <Box>
                    <Text fontSize="xs" color={textColor}>
                      Browser notifications require permission. Click "Allow"
                      when prompted.
                    </Text>
                  </Box>
                </Alert>
              )}
            </VStack>
          </CardBody>
        </Card>

        {/* Data Management */}
        <Card bg={cardBg} shadow="md" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading size="md" color={textColor} mb={2}>
                Data Management
              </Heading>

              <VStack spacing={4} align="stretch">
                <Button
                  leftIcon={<MdDownload />}
                  colorScheme="green"
                  variant="outline"
                  onClick={onExportOpen}
                  size="sm"
                  color={textColor}
                  borderColor={useColorModeValue("green.500", "green.300")}
                  _hover={{
                    bg: useColorModeValue("green.50", "green.900"),
                  }}
                >
                  Export Data
                </Button>

                <Button
                  as="label"
                  leftIcon={<MdUpload />}
                  colorScheme="blue"
                  variant="outline"
                  cursor="pointer"
                  size="sm"
                  color={textColor}
                  borderColor={useColorModeValue("blue.500", "blue.300")}
                  _hover={{
                    bg: useColorModeValue("blue.50", "blue.900"),
                  }}
                >
                  Import Data
                  <Input
                    type="file"
                    accept=".json"
                    onChange={handleImportData}
                    display="none"
                  />
                </Button>

                <Divider borderColor={borderColor} />

                <Button
                  leftIcon={<MdDelete />}
                  colorScheme="red"
                  variant="outline"
                  onClick={onResetOpen}
                  size="sm"
                  color={textColor}
                  borderColor={useColorModeValue("red.500", "red.300")}
                  _hover={{
                    bg: useColorModeValue("red.50", "red.900"),
                  }}
                >
                  Reset All Data
                </Button>
              </VStack>

              <Alert status="warning" size="sm" borderRadius="md">
                <AlertIcon />
                <Box>
                  <Text fontSize="xs" color={textColor}>
                    Export includes all settings and notification preferences
                  </Text>
                </Box>
              </Alert>
            </VStack>
          </CardBody>
        </Card>

        {/* App Information */}
        <Card bg={cardBg} shadow="md" borderColor={borderColor}>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Heading size="md" color={textColor} mb={2}>
                App Information
              </Heading>

              <VStack spacing={3} align="start">
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color={secondaryText}>
                    Version:
                  </Text>
                  <Badge colorScheme="blue">1.0.0</Badge>
                </HStack>

                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color={secondaryText}>
                    Last Backup:
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    Never
                  </Text>
                </HStack>

                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color={secondaryText}>
                    Storage Used:
                  </Text>
                  <Text fontSize="sm" color={textColor}>
                    ~2.5 MB
                  </Text>
                </HStack>

                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color={secondaryText}>
                    Notifications:
                  </Text>
                  <Badge
                    colorScheme={
                      tempNotificationSettings.enabled ? "green" : "gray"
                    }
                  >
                    {tempNotificationSettings.enabled ? "Enabled" : "Disabled"}
                  </Badge>
                </HStack>
              </VStack>

              <Divider borderColor={borderColor} />

              <Text fontSize="xs" color={secondaryText} textAlign="center">
                FinTrack helps you manage your finances efficiently. For
                support, contact us at support@fintrack.com
              </Text>
            </VStack>
          </CardBody>
        </Card>
      </SimpleGrid>

      {/* Action Buttons */}
      <HStack spacing={4} justify="center" mt={8}>
        <Button
          variant="outline"
          onClick={resetSettings}
          leftIcon={<MdRefresh />}
          color={textColor}
          borderColor={borderColor}
          _hover={{
            bg: useColorModeValue("gray.50", "gray.700"),
          }}
        >
          Reset to Defaults
        </Button>
        <Button colorScheme="blue" onClick={saveSettings} size="lg">
          Save Settings
        </Button>
      </HStack>

      {/* Reset Confirmation Modal */}
      <Modal isOpen={isResetOpen} onClose={onResetClose} isCentered>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent bg={cardBg} color={textColor}>
          <ModalHeader>Reset All Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Alert status="warning" mb={4} borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle fontSize="sm">Warning!</AlertTitle>
                <AlertDescription fontSize="sm" color={textColor}>
                  This action will permanently delete all your budget data,
                  expenses, settings, and notification preferences. This cannot
                  be undone.
                </AlertDescription>
              </Box>
            </Alert>
            <Text fontSize="sm" color={secondaryText}>
              Are you sure you want to proceed with this action?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="ghost" 
              mr={3} 
              onClick={onResetClose} 
              size="sm"
              color={textColor}
              _hover={{
                bg: useColorModeValue("gray.100", "gray.700"),
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={handleResetAllData}
              size="sm"
            >
              Reset All Data
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Export Confirmation Modal */}
      <Modal isOpen={isExportOpen} onClose={onExportClose} isCentered>
        <ModalOverlay bg="blackAlpha.600" backdropFilter="blur(10px)" />
        <ModalContent bg={cardBg} color={textColor}>
          <ModalHeader>Export Data</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4} fontSize="sm" color={secondaryText}>
              This will download a backup file containing all your budget data,
              expenses, settings, and notification preferences.
            </Text>
            <Alert status="info" borderRadius="md">
              <AlertIcon />
              <Box>
                <AlertTitle fontSize="sm">Export Format</AlertTitle>
                <AlertDescription fontSize="sm" color={textColor}>
                  Data will be exported in {tempSettings.exportFormat} format
                  including notification settings.
                </AlertDescription>
              </Box>
            </Alert>
          </ModalBody>
          <ModalFooter>
            <Button 
              variant="ghost" 
              mr={3} 
              onClick={onExportClose} 
              size="sm"
              color={textColor}
              _hover={{
                bg: useColorModeValue("gray.100", "gray.700"),
              }}
            >
              Cancel
            </Button>
            <Button
              colorScheme="green"
              onClick={handleExportData}
              size="sm"
            >
              Export
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Settings;