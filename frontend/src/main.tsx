// ** React
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

// Components
import App from './App'

// ** MUI
import { ThemeProvider } from '@mui/material'

// ** Context
import { theme } from './customTheme'

// Styles
import './index.css'
import 'react-toastify/dist/ReactToastify.css'
import { MyToast } from './shared/components/toast'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MyToast  />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
