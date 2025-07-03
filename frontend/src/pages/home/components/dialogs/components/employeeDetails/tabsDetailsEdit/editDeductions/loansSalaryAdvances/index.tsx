import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
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
              {key === 'payrollOperationFrequency' ? (
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Payroll operation frequency</InputLabel>
                  <Controller
                    name='payrollOperationFrequency'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Payroll operation frequency'
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        {payrollOperationFrequency.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
              ) : key === 'currencyCode' ? (
                <FormControl fullWidth variant='outlined'>
                  <InputLabel>Currency code</InputLabel>
                  <Controller
                    name='currencyCode'
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label='Currency code'
                        value={field.value}
                        onChange={e => field.onChange(e.target.value)}
                      >
                        {currencyCode.map(option => (
                          <MenuItem key={option} value={option}>
                            {option}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
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
