// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from './App'
import theme from './theme/theme'
import { ExpenseProvider } from './context/ExpenseContext'; // 


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider theme={theme}>
  <ExpenseProvider> 
    <App />
  </ExpenseProvider>
</ChakraProvider>

  </React.StrictMode>
)