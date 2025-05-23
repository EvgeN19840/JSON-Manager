// ** React
import React from 'react'

// ** MUI
import { Snackbar, Button } from '@mui/material'

// ** Context
import { theme } from '@/customTheme'

// ** Types
import { ISnackbarComponentProps } from './types'

export const SnackbarComponent: React.FC<ISnackbarComponentProps> = ({ open, message, type, onClose }) => {
  const action = (
    <React.Fragment>
      <Button
        variant='contained'
        sx={{
          color: 'white',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderColor: 'white'
          }
        }}
        size='small'
        onClick={onClose}
      >
        close
      </Button>
    </React.Fragment>
  )

  return (
    <Snackbar
      open={open}
      action={action}
      autoHideDuration={7000}
      onClose={onClose}
      message={message}
      ClickAwayListenerProps={{ mouseEvent: false }}
      ContentProps={{
        sx: {
          backgroundColor: type === 'success' ? theme.palette.success.main : theme.palette.error.main,
          color: 'white'
        }
      }}
    />
  )
}
