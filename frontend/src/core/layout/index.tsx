// ** React
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

// ** MUI
import { Box } from '@mui/material'

// ** Theme
import { useTheme } from '@mui/material/styles'

// ** Components
import { Navigation, HeaderTitle } from './components'

// ** Context
import { NotificationProvider } from '../context/snackBar/provider'

export const Layout: FC<{ title: string }> = ({ title }) => {
  const theme = useTheme()

  return (
    <NotificationProvider>
      <Box sx={{ display: 'flex', height: '100%', bgcolor: theme.palette.background.default }}>
        <Navigation />
        <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
          <HeaderTitle title={title} />
          <Box
            component='main'
            sx={{
              height: 'calc(100vh - 72px)',
              overflow: 'hidden',
              mt: 9
            }}
          >
            <Outlet />
          </Box>
        </Box>
      </Box>
    </NotificationProvider>
  )
}
