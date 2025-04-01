// ** MUI
import { Box, Button } from '@mui/material'

// ** Hooks
import { useModal } from '@/pages/home/hooks'

// ** Types
import { FormFooterProps } from './types'


export const FormFooter: React.FC<FormFooterProps> = ({
  cancelButtonText,
  actionButtonText,
  showSecondButton,
  buttonAction,
  middleContent
}) => {
  const { setDialogOpen } = useModal()

  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: 1,
        backgroundColor: 'white',
        p: '1rem',
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Button variant='outlined' onClick={() => setDialogOpen(false)}>
        {cancelButtonText}
      </Button>
      {middleContent}
      <Button variant='contained' onClick={buttonAction} disabled={!showSecondButton}>
        {actionButtonText}
      </Button>
    </Box>
  )
}
