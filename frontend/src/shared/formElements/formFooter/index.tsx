import { Box, Button } from '@mui/material'
import { FormFooterProps } from './types'
import { useModal } from '@/pages/home/hooks/useModal'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'

export const FormFooter: React.FC<FormFooterProps> = ({
  cancelButtonText,
  actionButtonText,
  showSecondButton,
  buttonAction,
  middleContent,
  source,
}) => {
  const { setDialogOpen, handleClickOpenDialog } = useModal()
  const { eIdSelectedEmployee, data } = useDataStateContext()

  const handleCancelClick = () => {
    setDialogOpen(false)

    if (source === 'employeeDetails' && eIdSelectedEmployee) {
      const employee = data.employees.find(
        (emp) => emp.eId === eIdSelectedEmployee
      )

      if (employee) {
        handleClickOpenDialog('Details', employee)
      }
    }
  }
  return (
    <Box
      sx={{
        position: 'sticky',
        bottom: 0,
        zIndex: 1,
        backgroundColor: 'white',
        p: '1rem',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Button variant="outlined" onClick={handleCancelClick}>
        {cancelButtonText}
      </Button>
      {middleContent}
      <Button
        variant="contained"
        onClick={buttonAction}
        disabled={!showSecondButton}
      >
        {actionButtonText}
      </Button>
    </Box>
  )
}
