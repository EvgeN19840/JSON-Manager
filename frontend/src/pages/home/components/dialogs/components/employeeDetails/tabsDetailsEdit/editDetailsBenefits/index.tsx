// ** MUI
import { Autocomplete, Box, TextField } from '@mui/material'

// ** Lib
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

// ** Components
import { FormWrapper, FormInput, FormFooter } from '@/shared/formElements'

// ** Hooks
import { useDataStateContext, useDefaultEmployeeBenefit, useModal } from '@/pages/home/hooks'

import { schema } from './schema'

// ** Types
import type { IEmployeeBenefit, ISystemBenefit } from '@/types/json'

// ** Dropdowns
import pension from '@/constants/dropdownLists/benifitNames/pension'
import health from '@/constants/dropdownLists/benifitNames/health'
import life from '@/constants/dropdownLists/benifitNames/life'
import currencyCode from '@/constants/dropdownLists/currencyCode'

interface Props {
  title: string
}

export const EditDetailsBenefits = ({ title }: Props) => {
  const { dataForDialog } = useModal() as { dataForDialog: IEmployeeBenefit | null }
  const { handleClickOpenDialog } = useModal()
  const { handleSaveData, handleSaveBenefit, data, eIdSelectedEmployee } = useDataStateContext()

const defaultBenefit = useDefaultEmployeeBenefit()
const secondWord = title.split(' ')[1] || ''
const capitalized = secondWord.charAt(0).toUpperCase() + secondWord.slice(1)

const defaultValues = {
  ...defaultBenefit,
  name: defaultBenefit.name || capitalized
}

  let dropdownOptions: string[] = []

  if (title === 'Edit pension benefits details') {
    dropdownOptions = pension.sort()
  } else if (title === 'Edit health benefits details') {
    dropdownOptions = health.sort()
  } else if (title === 'Edit life benefits details') {
    dropdownOptions = life.sort()
  }

  const formattedTitle = title
    .split(' ')
    .slice(1)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

  const fieldLabels: Partial<Record<keyof IEmployeeBenefit, string>> = {
    name: 'Benefit Name',
    value: 'employee',
    currencyCode: 'Currency Code',
    companyValue: 'employer',
    companyCurrencyCode: 'Company Currency Code',
    isPerentValue: 'Is Percent Value',
    effectiveDate: 'Effective Date'
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
    const updatedDataForDialog = { ...dataForDialog, ...formData }
    const updatedBenefit: ISystemBenefit = { id: formData.id, name: formData.name }

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
      <FormWrapper title={formattedTitle} onSubmit={handleSubmit(onSubmit)}>
        {Object.keys(defaultValues)
          .filter(key => key !== 'customBambooTableRowId')
          .map(key => (
            <Box key={key} mb={2}>
              {key === 'name' || key === 'currencyCode' || key === 'companyCurrencyCode' ? (
                <Controller
                  name={key as keyof IEmployeeBenefit}
                  control={control}
                  render={({ field }) => {
                    const value = field.value != null ? String(field.value) : ''
                    return (
                      <Autocomplete
                        freeSolo
                        options={key === 'name' ? dropdownOptions : currencyCode}
                        inputValue={value}
                        onInputChange={(_, newInputValue) => field.onChange(newInputValue)}
                        onChange={(_, newValue) => field.onChange(newValue)}
                        renderInput={params => (
                          <TextField
                            {...params}
                            label={fieldLabels[key as keyof IEmployeeBenefit] || key}
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
                  label={fieldLabels[key as keyof IEmployeeBenefit] || key}
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
