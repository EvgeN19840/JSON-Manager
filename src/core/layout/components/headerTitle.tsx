// ** React
import { FC } from 'react'

// ** MUI
import { Typography, AppBar, Toolbar } from '@mui/material'

// ** Theme
import { useTheme } from '@mui/material/styles'

export const HeaderTitle: FC<{ title: string }> = ({ title }) => {
  const theme = useTheme()
  return (
    <AppBar position='fixed' sx={{ bgcolor: theme.palette.primary.main }}>
      <Toolbar>
        <Typography variant='h6' sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}
