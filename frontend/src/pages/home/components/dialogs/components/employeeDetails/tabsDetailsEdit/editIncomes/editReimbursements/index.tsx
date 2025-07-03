// ** MUI
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

// ** Forms Imports
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useModal, useDataStateContext, useDefaultReimbursement } from '@/pages/home/hooks'

// ** Schema
import { schema } from '../schema'

// ** Types
import { IReimbursement } from '@/types/json'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Dropdowns
import currencyCode from '@/constants/dropdownLists/currencyCode'
import payrollOperationFrequency from '@/constants/dropdownLists/payrollOperationFrequency'

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
                  name={key as keyof IReimbursement}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key as keyof IReimbursement] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key as keyof IReimbursement]?.message}
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
