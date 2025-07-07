// ** MUI
import { Autocomplete, Box,  TextField } from '@mui/material'

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
                <Controller
                  name='payrollOperationFrequency'
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      options={payrollOperationFrequency}
                      value={field.value != null ? String(field.value) : ''}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Payroll operation frequency'
                          error={!!errors.payrollOperationFrequency}
                          helperText={errors.payrollOperationFrequency?.message}
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
              ) : key === 'currencyCode' ? (
                <Controller
                  name='currencyCode'
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      options={currencyCode}
                      value={field.value != null ? String(field.value) : ''}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='Currency code'
                          error={!!errors.currencyCode}
                          helperText={errors.currencyCode?.message}
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
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
