// ** MUI
import { Box } from '@mui/material'

// ** External Libraries
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Hooks
import {
  useDataStateContext,
  useDefaultEmploymentStatus,
  useModal
} from '@/pages/home/hooks'

// ** Schema
import { employmentStatusSchema } from '../../schema'

// ** Types
import { IEmploymentStatus } from '@/types/json'


export const EmploymentStatus: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmploymentStatus | null
  }
  const defaultValues = useDefaultEmploymentStatus()

  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IEmploymentStatus>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(employmentStatusSchema)
  })

  const onSubmit = (formData: IEmploymentStatus) => {
    handleSaveData({ ...dataForDialog, ...formData } as IEmploymentStatus, 'employmentStatus')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )

    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  return (
    <Box>
      <FormWrapper title='Employment Status' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              <FormInput
                name={key as keyof IEmploymentStatus}
                label={key}
                control={control}
                errorMessage={errors[key as keyof IEmploymentStatus]?.message}
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
