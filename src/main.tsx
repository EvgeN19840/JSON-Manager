// ** React
import React from 'react'
import ReactDOM from 'react-dom/client'

// Components
import App from './App'

// ** MUI
import { ThemeProvider } from '@mui/material'

// ** Context
import { theme } from './customTheme'

// Styles
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
