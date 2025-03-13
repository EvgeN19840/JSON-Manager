// ** React
import { FC } from 'react'
import { Outlet } from 'react-router-dom'

// ** MUI
import { Box, Container } from '@mui/material'

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
      <Box sx={{ display: 'flex', bgcolor: theme.palette.background.default }}>
        <Navigation />
        <Box sx={{ flexGrow: 1 }}>
          <HeaderTitle title={title} />
          <Box
            component='main'
            sx={{
              display: 'flex',
              flexDirection: 'column',
              p: 3
            }}
          >
            <Container disableGutters maxWidth={false}>
              <Outlet />
            </Container>
          </Box>
        </Box>
      </Box>
    </NotificationProvider>
  )
}
