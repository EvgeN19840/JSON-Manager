// ** MUI
import { Box } from '@mui/material'

// ** Forms Imports
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useModal, useDataStateContext, useDefaultReimbursement } from '@/pages/home/hooks'

// ** Schema
import { schema } from './schema'

// ** Types
import { IReimbursement } from '@/types/json'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

export const EditReimbursementTab: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IReimbursement | null
  }

  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

  const defaultValues = useDefaultReimbursement()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IReimbursement>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = (formData: IReimbursement) => {
    handleSaveData({ ...dataForDialog, ...formData } as IReimbursement, 'reimbursements')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )

    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }
  return (
    <Box>
      <FormWrapper title='Custom incomes' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              <FormInput
                name={key as keyof IReimbursement}
                label={key}
                control={control}
                errorMessage={errors[key as keyof IReimbursement]?.message}
              />
            </Box>
          ))}
      </FormWrapper>
      <FormFooter
        cancelButtonText='Cancel'
        actionButtonText='Save'
        showSecondButton={isDirty}
        buttonAction={handleSubmit(onSubmit)}
        source='employeeDetails'
      />
    </Box>
  )
}
