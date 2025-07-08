import { Autocomplete, Box, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useModal } from '@/pages/home/hooks/useModal'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'
import { ILoanOrSalaryAdvance } from '@/types/json'
import { useDefaultLoanSalaryAdvance } from '@/pages/home/hooks/useDefaultData'
import { schema } from '../schema'

// ** Dropdowns
import currencyCode from '@/constants/dropdownLists/currencyCode'
import payrollOperationFrequency from '@/constants/dropdownLists/payrollOperationFrequency'

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
    handleSaveData({ ...dataForDialog, ...formData }, 'loansAndSalaryAdvances')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )
    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  return (
    <Box>
      <FormWrapper
        title={
          (dataForDialog?.payrollOperationFrequency || defaultValues.payrollOperationFrequency) === 'OneTime'
            ? 'Salary Advance'
            : (dataForDialog?.payrollOperationFrequency || defaultValues.payrollOperationFrequency) === 'Reoccurring'
              ? 'Loan'
              : 'Loan or Salary Advance'
        }
        onSubmit={handleSubmit(onSubmit)}
      >
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              {key === 'payrollOperationFrequency' || key === 'currencyCode' ? (
                <Controller
                  name={key}
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      options={key === 'currencyCode' ? currencyCode : payrollOperationFrequency}
                      value={field.value || ''}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label={key === 'currencyCode' ? 'Currency code' : 'Payroll operation frequency'}
                          error={!!errors[key as keyof ILoanOrSalaryAdvance]}
                          helperText={errors[key as keyof ILoanOrSalaryAdvance]?.message}
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
              ) : (
                <FormInput
                  name={key as keyof ILoanOrSalaryAdvance}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key as keyof ILoanOrSalaryAdvance] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key as keyof ILoanOrSalaryAdvance]?.message}
                />
              )}
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
