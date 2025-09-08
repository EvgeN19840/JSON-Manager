// ** MUI
import { Autocomplete, Box, TextField } from '@mui/material'

// ** External Libraries
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Hooks
import { useDataStateContext, useDefaultSalary, useModal } from '@/pages/home/hooks'

// ** Dropdowns
import payPeriodDropdown from '@/constants/dropdownLists/payPeriod'
import salaryRateDropdown from '@/constants/dropdownLists/salaryRate'
import currencyCode from '@/constants/dropdownLists/currencyCode'

// ** Schema
import { salarySchema } from '../../schema'

// ** Types
import { ISalary } from '@/types/json'

export const Salary: React.FC = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: ISalary | null
  }
  const defaultValues = useDefaultSalary()

  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, data, eIdSelectedEmployee } = useDataStateContext()

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<ISalary>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(salarySchema)
  })

  const onSubmit = (formData: ISalary) => {
    handleSaveData({ ...dataForDialog, ...formData } as ISalary, 'salary')
    const updatedEmployees = data.employees.map(employee =>
      employee.eId === eIdSelectedEmployee ? { ...employee, ...formData } : employee
    )

    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  const renderAutocomplete = (name: keyof ISalary, label: string, options: string[]) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Autocomplete
          freeSolo
          options={options}
          value={field.value != null ? String(field.value) : ''}
          onChange={(_, newValue) => field.onChange(newValue)}
          onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
          renderInput={params => (
            <TextField {...params} label={label} error={!!errors[name]} helperText={errors[name]?.message} fullWidth />
          )}
        />
      )}
    />
  )

  return (
    <Box>
      <FormWrapper title='Salary' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              {key === 'payPeriod' ? (
                <Controller
                  name='payPeriod'
                  control={control}
                  render={({ field }) => (
                    <Autocomplete
                      freeSolo
                      options={payPeriodDropdown.sort()}
                      value={field.value ?? ''}
                      onChange={(_, newValue) => field.onChange(newValue)}
                      onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label='payPeriod'
                          error={!!errors.payPeriod}
                          helperText={errors.payPeriod?.message}
                          fullWidth
                        />
                      )}
                    />
                  )}
                />
              ) : key === 'salaryRatePeriod' ? (
                renderAutocomplete('salaryRatePeriod', 'Rate Period', salaryRateDropdown)
              ) : key === 'salaryCurrencyCode' ? (
                renderAutocomplete('salaryCurrencyCode', 'Salary currency code', currencyCode)
              ) : (
                <FormInput
                  name={key as keyof ISalary}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key as keyof ISalary] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key as keyof ISalary]?.message}
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
