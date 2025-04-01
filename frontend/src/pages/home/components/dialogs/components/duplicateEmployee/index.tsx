// ** MUI
import { Box, Typography } from '@mui/material'

// ** Shared Components
import { FormFooter, FormWrapper } from '@/shared/formElements'
import { InputField } from '@/shared/inputField'

// ** Hooks
import { useForm } from 'react-hook-form'
import {
  useModal,
  useDataStateContext,
  useHandleAddItem
} from '@/pages/home/hooks'



export const DuplicateEmployee = () => {
  const { closeDialog } = useModal() as { closeDialog: () => void }
  const { eIdSelectedEmployee, countDuplicates, data, setCountDuplicates } = useDataStateContext()
  const handleAddItem = useHandleAddItem()
  const { handleSubmit } = useForm()

  const onSubmit = () => {
    const employeeToDuplicate = data.employees.find(emp => emp.eId === eIdSelectedEmployee)

    if (!employeeToDuplicate) {
      console.error('Employee not found in the data list')
      return
    }

    handleAddItem({
      type: 'employees',
      item: employeeToDuplicate,
      eId: eIdSelectedEmployee ?? ''
    })
    closeDialog()
    setCountDuplicates('1')
  }

  return (
    <Box>
      <FormWrapper title='Duplicate' onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
            mx: 2
          }}
        >
          <Typography variant='h6'>Enter the number of duplicates:</Typography>
          <InputField
            label='Number of duplicates'
            placeholder='Enter count'
            value={countDuplicates}
            onChange={event => setCountDuplicates(event.target.value)}
            sx={{ width: '150px' }}
          />
        </Box>
      </FormWrapper>
      <Box sx={{ mx: 2 }}>
        <FormFooter
          cancelButtonText='Cancel'
          actionButtonText='Duplicate'
          showSecondButton={true}
          buttonAction={handleSubmit(onSubmit)}
          source='duplicate'
        />
      </Box>
    </Box>
  )
}
