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
  useDefaultOtherDeduction,
  useModal
} from '@/pages/home/hooks'

// ** Schema
import { schema } from './schema'

// ** Types
import { IOtherDeduction } from '@/types/json'


export const EditDeductions: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IOtherDeduction | null
  }
  const defaultValues = useDefaultOtherDeduction()

  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IOtherDeduction>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = (formData: IOtherDeduction) => {
    handleSaveData({ ...dataForDialog, ...formData } as IOtherDeduction, 'otherDeductions')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )

    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  return (
    <Box>
      <FormWrapper title='Custom deductions' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              <FormInput
                name={key as keyof IOtherDeduction}
                label={key}
                control={control}
                errorMessage={errors[key as keyof IOtherDeduction]?.message}
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
