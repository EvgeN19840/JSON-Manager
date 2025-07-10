import {
  Autocomplete,
  Box,
  TextField
} from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useModal } from '@/pages/home/hooks/useModal'
import { useDataStateContext } from '@/pages/home/hooks/useDataStateContext'
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'
import { IOtherDeduction } from '@/types/json'
import { useDefaultOtherDeduction } from '@/pages/home/hooks/useDefaultData'
import { schema } from '../schema'

// ** Dropdowns
import currencyCode from '@/constants/dropdownLists/currencyCode'
import payrollOperationFrequency from '@/constants/dropdownLists/payrollOperationFrequency'

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
    handleSaveData({ ...dataForDialog, ...formData }, 'otherDeductions')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )
    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  return (
    <Box>
      <FormWrapper title='Other Non-Pensionable Deduction' onSubmit={handleSubmit(onSubmit)}>
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
                          error={!!errors[key as keyof IOtherDeduction]}
                          helperText={errors[key as keyof IOtherDeduction]?.message}
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
              ) : (
                <FormInput
                  name={key as keyof IOtherDeduction}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key as keyof IOtherDeduction] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key as keyof IOtherDeduction]?.message}
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
