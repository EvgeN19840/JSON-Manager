// ** MUI
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'

// ** Forms Imports
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Hooks
import { useModal, useDataStateContext, useDefaultFees } from '@/pages/home/hooks'

// ** Schema
import { schemaFees } from '../schema'

// ** Types
import { IFees } from '@/types/json'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Dropdowns
import payrollOperationFrequency from '@/constants/dropdownLists/payrollOperationFrequency'
import currencyCode from '@/constants/dropdownLists/currencyCode'

export const EditFeesTab: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IFees | null
  }

  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

  const defaultValues = useDefaultFees()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IFees>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schemaFees)
  })

  const onSubmit = (formData: IFees) => {
    handleSaveData({ ...dataForDialog, ...formData } as IFees, 'fees')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )

    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }
  return (
    <Box>
      <FormWrapper title='Fees' onSubmit={handleSubmit(onSubmit)}>
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
                  name={key as keyof IFees}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key as keyof IFees] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key as keyof IFees]?.message}
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
