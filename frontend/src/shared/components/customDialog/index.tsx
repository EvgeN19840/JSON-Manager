// ** MUI
import { Dialog, Box } from '@mui/material'

// ** Types
import { ICustomDialog } from './types'

export const CustomDialog: React.FC<ICustomDialog> = ({ children, open, onClose, maxWidth }) => {
  return (
    <Dialog onClose={onClose} fullWidth maxWidth={maxWidth} open={open}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}
      >
        {children}
      </Box>
    </Dialog>
  )
}
