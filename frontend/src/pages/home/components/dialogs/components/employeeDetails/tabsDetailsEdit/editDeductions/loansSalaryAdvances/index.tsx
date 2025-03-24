import { Box } from '@mui/material'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useModal } from '@/pages/home/hooks/useModal'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'
import { ILoanOrSalaryAdvance } from '@/types/json'
import { useDefaultLoanSalaryAdvance } from '@/pages/home/hooks/useDefaultData'
import { schema } from '../schema'

export const EditLoanSalaryAdvance: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: ILoanOrSalaryAdvance | null
  }
  const defaultValues = useDefaultLoanSalaryAdvance()

  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ILoanOrSalaryAdvance>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = (formData: ILoanOrSalaryAdvance) => {
    handleSaveData({ ...dataForDialog, ...formData } as ILoanOrSalaryAdvance, 'loansAndSalaryAdvances')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )

    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  return (
    <Box>
      <FormWrapper title='Loans or Salary Advances' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              <FormInput
                name={key as keyof ILoanOrSalaryAdvance}
                label={key}
                control={control}
                type={typeof defaultValues[key as keyof ILoanOrSalaryAdvance] === 'boolean' ? 'checkbox' : 'text'}
                errorMessage={errors[key as keyof ILoanOrSalaryAdvance]?.message}
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
