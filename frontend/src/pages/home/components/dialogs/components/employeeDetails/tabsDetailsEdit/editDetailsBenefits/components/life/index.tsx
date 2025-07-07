// ** MUI
import { Autocomplete, Box, TextField } from '@mui/material'

// ** External Libraries
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Hooks
import { useDataStateContext, useDefaultEmployeeBenefit, useModal } from '@/pages/home/hooks'

// ** Dropdowns
import life from '@/constants/dropdownLists/benifitNames/life'
import currencyCode from '@/constants/dropdownLists/currencyCode'

// ** Schema
import { schema } from '../../schema'

// ** Types
import { IEmployeeBenefit, ISystemBenefit } from '@/types/json'

export const EditDetailsLifeBenefits = () => {
  const { dataForDialog } = useModal() as {
    dataForDialog: IEmployeeBenefit | null
  }

  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, handleSaveBenefit, data, eIdSelectedEmployee } = useDataStateContext()

  const defaultValues = {
    ...useDefaultEmployeeBenefit(),
    name: useDefaultEmployeeBenefit().name || 'Life' // по умолчанию значение 'Life'
  }

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm<IEmployeeBenefit>({
    defaultValues,
    mode: 'onSubmit',
    resolver: yupResolver(schema)
  })

  const onSubmit = (formData: IEmployeeBenefit) => {
    const updatedDataForDialog = {
      ...dataForDialog,
      ...formData
    } as IEmployeeBenefit

    const updatedBenefit = {
      id: formData.id,
      name: formData.name
    } as ISystemBenefit

    handleSaveData(updatedDataForDialog, 'employeeBenefit')
    handleSaveBenefit(updatedBenefit)

    const updatedEmployees = data.employees.map(employee => {
      if (employee.eId === eIdSelectedEmployee) {
        const updatedBenefits = employee.benefits.map(benefit =>
          benefit.id === formData.id ? { ...benefit, ...formData } : benefit
        )
        return { ...employee, benefits: updatedBenefits }
      }
      return employee
    })

    const updatedEmployee = updatedEmployees.find(employee => employee.eId === eIdSelectedEmployee)
    handleClickOpenDialog('Details', updatedEmployee)
  }

  return (
    <Box>
      <FormWrapper title='Life Insurance' onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              {(key === 'name' || key === 'currencyCode' || key === 'companyCurrencyCode') ? (
                <Controller
                  name={key as keyof IEmployeeBenefit}
                  control={control}
                  render={({ field }) => {
                    const isNameField = key === 'name'
                    const value = field.value != null ? String(field.value) : ''

                    return (
                      <Autocomplete
                        freeSolo
                        options={isNameField ? life : currencyCode}
                        inputValue={isNameField && value === '' ? 'Life' : value}
                        onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
                        onChange={(_, newValue) => field.onChange(newValue)}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={
                              key === 'name'
                                ? 'Benefit name'
                                : key === 'currencyCode'
                                ? 'Currency code'
                                : 'Company currency code'
                            }
                            error={!!errors[key as keyof IEmployeeBenefit]}
                            helperText={errors[key as keyof IEmployeeBenefit]?.message}
                            fullWidth
                          />
                        )}
                      />
                    )
                  }}
                />
              ) : (
                <FormInput
                  name={key as keyof IEmployeeBenefit}
                  label={key}
                  control={control}
                  type={typeof defaultValues[key as keyof IEmployeeBenefit] === 'boolean' ? 'checkbox' : 'text'}
                  errorMessage={errors[key as keyof IEmployeeBenefit]?.message}
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
