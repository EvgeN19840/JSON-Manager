import { Box, Button } from '@mui/material'
import { FormFooterProps } from './types'
import { useModal } from '@/pages/home/hooks/useModal'

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
